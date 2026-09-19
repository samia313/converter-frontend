import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
export const runtime='nodejs'
export const maxDuration=120
const MAX=100*1024*1024
export async function POST(request:NextRequest){
 try{
  const form=await request.formData(), file=form.get('file')
  if(!(file instanceof File)) return NextResponse.json({error:'Please upload a PDF file.'},{status:400})
  if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({error:'Only PDF files are supported.'},{status:415})
  if(file.size>MAX) return NextResponse.json({error:'The PDF exceeds the 100 MB upload limit.'},{status:413})
  const text=String(form.get('text')??'').trim(), opacity=Number(form.get('opacity')??0.25), fontSize=Number(form.get('fontSize')??36), angle=Number(form.get('angle')??-45)
  const position=String(form.get('position')??'center')
  if(!text||text.length>120)return NextResponse.json({error:'Watermark text is required and must be 120 characters or fewer.'},{status:400})
  if(!Number.isFinite(opacity)||opacity<0.05||opacity>1||!Number.isFinite(fontSize)||fontSize<8||fontSize>96||!Number.isFinite(angle)||angle<-180||angle>180)return NextResponse.json({error:'Invalid watermark settings.'},{status:400})
  if(!['top-left','top-center','top-right','center','bottom-left','bottom-center','bottom-right'].includes(position))return NextResponse.json({error:'Invalid watermark position.'},{status:400})
  const bytes=new Uint8Array(await file.arrayBuffer())
  if(new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-')return NextResponse.json({error:'The uploaded file is not a valid PDF.'},{status:422})
  const pdf=await PDFDocument.load(bytes), font=await pdf.embedFont(StandardFonts.HelveticaBold)
  for(const page of pdf.getPages()){
   const {width,height}=page.getSize(), tw=font.widthOfTextAtSize(text,fontSize), margin=24
   let x=margin,y=height-margin-fontSize
   if(position.includes('center'))x=(width-tw)/2
   else if(position.endsWith('right'))x=width-tw-margin
   if(position==='center')y=(height-fontSize)/2
   else if(position.startsWith('bottom'))y=margin
   page.drawText(text,{x:Math.max(0,x),y:Math.max(0,y),size:fontSize,font,color:rgb(.45,.45,.45),opacity,rotate:{type:'degrees',angle}})
  }
  const output=await pdf.save(),name=file.name.replace(/\.pdf$/i,'')+'_watermarked.pdf'
  return new NextResponse(output as BodyInit,{headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${name}"`,'Content-Length':String(output.length),'Cache-Control':'no-store'}})
 }catch(error){console.error('Watermark PDF error:',error);return NextResponse.json({error:'Could not watermark this PDF.'},{status:500})}
}