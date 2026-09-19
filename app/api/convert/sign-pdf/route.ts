import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const runtime='nodejs';
export const maxDuration=120;
const MAX_BYTES=100*1024*1024;

export async function POST(request:NextRequest){
 try{
  const form=await request.formData();
  const file=form.get('file');
  const signature=String(form.get('signature')||'').trim();
  const pageNumber=Number(form.get('page')||1);
  const x=Number(form.get('x')||72);
  const y=Number(form.get('y')||72);
  const fontSize=Number(form.get('fontSize')||24);
  if(!(file instanceof File)) return NextResponse.json({error:'Please upload a PDF file.'},{status:400});
  if(file.size>MAX_BYTES) return NextResponse.json({error:'PDF exceeds the 100 MB limit.'},{status:400});
  if(!/\.pdf$/i.test(file.name)&&file.type!=='application/pdf') return NextResponse.json({error:'Only PDF files are supported.'},{status:400});
  if(!signature||signature.length>200) return NextResponse.json({error:'Signature text must be 1 to 200 characters.'},{status:400});
  if(!Number.isInteger(pageNumber)||pageNumber<1) return NextResponse.json({error:'Page number must be a positive integer.'},{status:400});
  if(!Number.isFinite(x)||!Number.isFinite(y)||x<0||y<0) return NextResponse.json({error:'Signature position is invalid.'},{status:400});
  if(!Number.isFinite(fontSize)||fontSize<8||fontSize>72) return NextResponse.json({error:'Font size must be between 8 and 72.'},{status:400});
  const bytes=new Uint8Array(await file.arrayBuffer());
  if(new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-') return NextResponse.json({error:'The uploaded file is not a valid PDF.'},{status:400});
  const doc=await PDFDocument.load(bytes);
  const pages=doc.getPages();
  if(pageNumber>pages.length) return NextResponse.json({error:`Page number must be between 1 and ${pages.length}.`},{status:400});
  const page=pages[pageNumber-1];
  const font=await doc.embedFont(StandardFonts.HelveticaOblique);
  const width=font.widthOfTextAtSize(signature,fontSize);
  const height=font.heightAtSize(fontSize);
  if(x+width>page.getWidth()||y+height>page.getHeight()) return NextResponse.json({error:'Signature does not fit within the selected page. Reduce the font size or position it inside the page.'},{status:400});
  page.drawText(signature,{x,y,size:fontSize,font,color:rgb(0,0,0)});
  const output=await doc.save();
  const base=file.name.replace(/\.pdf$/i,'')||'document';
  return new NextResponse(output as BodyInit,{headers:{'Content-Type':'application/pdf','Content-Disposition': `attachment; filename="${base}_signed.pdf"`,'Cache-Control':'no-store'}});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Unable to sign PDF.'},{status:500});}
}
