import { NextRequest, NextResponse } from 'next/server';
import { encryptPDF } from '@/lib/pdf-encrypt';

export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_BYTES = 100 * 1024 * 1024;

function errorResponse(message:string,status=400){return NextResponse.json({error:message},{status});}

export async function POST(request:NextRequest){
  try{
    const form=await request.formData();
    const file=form.get('file');
    const password=String(form.get('password')||'');
    const ownerPassword=String(form.get('ownerPassword')||password);
    const allowPrinting=form.get('allowPrinting')==='true';
    const allowCopying=form.get('allowCopying')==='true';
    const allowModifying=form.get('allowModifying')==='true';

    if(!(file instanceof File)) return errorResponse('Please upload a PDF file.');
    if(file.size>MAX_BYTES) return errorResponse('PDF exceeds the 100 MB limit.');
    if(!/\.pdf$/i.test(file.name) && file.type!=='application/pdf') return errorResponse('Only PDF files are supported.');
    if(password.length<4 || password.length>128) return errorResponse('Password must be 4 to 128 characters.');
    if(ownerPassword.length<4 || ownerPassword.length>128) return errorResponse('Owner password must be 4 to 128 characters.');

    const bytes=new Uint8Array(await file.arrayBuffer());
    const header=new TextDecoder().decode(bytes.slice(0,5));
    if(header!=='%PDF-') return errorResponse('The uploaded file is not a valid PDF.');

    const encrypted=await encryptPDF(bytes,password,{ownerPassword,allowPrinting,allowCopying,allowModifying});
    const base=file.name.replace(/\.pdf$/i,'')||'document';

    return new NextResponse(encrypted as BodyInit,{
      headers:{
        'Content-Type':'application/pdf',
        'Content-Disposition':`attachment; filename="${base}_protected.pdf"`,
        'Cache-Control':'no-store',
      }
    });
  }catch(error){
    const message=error instanceof Error?error.message:'Unable to protect this PDF.';
    const status=/already password-protected|already encrypted|password/i.test(message)?400:500;
    return errorResponse(message,status);
  }
}
