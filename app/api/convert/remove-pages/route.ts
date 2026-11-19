import { sanitizePdfDownloadFilename } from '@/lib/pdf-utils';
import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
export const runtime='nodejs'
export const maxDuration=120
const MAX=100*1024*1024
export async function POST(request:NextRequest){
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

 try{
  const fd=await request.formData(), file=fd.get('file'), raw=String(fd.get('pages')??'').trim()
  if(!(file instanceof File)) return NextResponse.json({error:'Please upload a PDF file.'},{status:400})
  if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({error:'Only PDF files are supported.'},{status:415})
  if(file.size>MAX) return NextResponse.json({error:'The PDF exceeds the 100 MB upload limit.'},{status:413})
  if(file.size===0) return NextResponse.json({error:'The uploaded PDF is empty.'},{status:400})
  if(!raw) return NextResponse.json({error:'Enter at least one page number to remove.'},{status:400})
  const bytes=new Uint8Array(await file.arrayBuffer())
  if(new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-') return NextResponse.json({error:'The uploaded file is not a valid PDF.'},{status:422})
  const source=await PDFDocument.load(bytes), count=source.getPageCount()
  if(count<2) return NextResponse.json({error:'A PDF must contain at least 2 pages to remove a page.'},{status:422})
  const pages=raw.split(',').map(v=>Number(v.trim()))
  if(pages.some(p=>!Number.isInteger(p)||p<1||p>count)) return NextResponse.json({error:'Page numbers must be between 1 and '+count+'.'},{status:400})
  const unique=[...new Set(pages)]
  if(unique.length>=count) return NextResponse.json({error:'You must keep at least one page in the PDF.'},{status:400})
  const remove=new Set(unique.map(p=>p-1)), keep=Array.from({length:count},(_,i)=>i).filter(i=>!remove.has(i))
  const output=await PDFDocument.create(), copied=await output.copyPages(source,keep); copied.forEach(p=>output.addPage(p))
  const out=await output.save()
  const filename=sanitizePdfDownloadFilename(file.name,'_pages-removed.pdf')
  return new NextResponse(out as BodyInit,{status:200,headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${encodeURIComponent(filename)}"`,'Content-Length':String(out.length),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})
 }catch(error){console.error('Remove PDF pages error:',error);return NextResponse.json({error:'Could not remove pages from this PDF. The file may be damaged, encrypted, or unsupported.'},{status:500})}
}