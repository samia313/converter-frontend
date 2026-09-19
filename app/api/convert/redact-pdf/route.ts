import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb } from 'pdf-lib'
export const runtime='nodejs'
export const maxDuration=120
const MAX=100*1024*1024
export async function POST(request:NextRequest){
 try{
  const form=await request.formData(), file=form.get('file')
  if(!(file instanceof File)) return NextResponse.json({error:'Please upload a PDF file.'},{status:400})
  if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({error:'Only PDF files are supported.'},{status:415})
  if(file.size>MAX)return NextResponse.json({error:'The PDF exceeds the 100 MB upload limit.'},{status:413})
  const x=Number(form.get('x')??0), y=Number(form.get('y')??0), width=Number(form.get('width')??100), height=Number(form.get('height')??40)
  if(![x,y,width,height].every(Number.isFinite)||width<=0||height<=0||x<0||y<0)return NextResponse.json({error:'Invalid redaction rectangle.'},{status:400})
  const bytes=new Uint8Array(await file.arrayBuffer())
  if(new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-')return NextResponse.json({error:'The uploaded file is not a valid PDF.'},{status:422})
  const pdf=await PDFDocument.load(bytes)
  for(const page of pdf.getPages()){
   const {width:pw,height:ph}=page.getSize()
   if(x+width>pw||y+height>ph)return NextResponse.json({error:'Redaction rectangle exceeds the PDF page size.'},{status:400})
   page.drawRectangle({x,y,width,height,color:rgb(0,0,0),opacity:1,borderWidth:0})
  }
  const output=await pdf.save(),name=file.name.replace(/\.pdf$/i,'')+'_redacted.pdf'
  return new NextResponse(output as BodyInit,{headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${name}"`,'Content-Length':String(output.length),'Cache-Control':'no-store'}})
 }catch(error){console.error('Redact PDF error:',error);return NextResponse.json({error:'Could not process this PDF.'},{status:500})}
}