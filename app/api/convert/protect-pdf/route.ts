import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';
import { encryptPDF } from '@/lib/pdf-encrypt';
import { getDownloadHeaders, sanitizePdfDownloadFilename, validateOutputBuffer, validatePdfFile } from '@/lib/pdf-utils';

export const runtime = 'nodejs';
export const maxDuration = 120;

function errorResponse(message:string,status=400){return NextResponse.json({error:message},{status});}

export async function POST(request:NextRequest){
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try{
    const form=await request.formData();
    const file=form.get('file');
    const password=String(form.get('password')||'');
    const ownerPassword=String(form.get('ownerPassword')||password);
    const allowPrinting=form.get('allowPrinting')==='true';
    const allowCopying=form.get('allowCopying')==='true';
    const allowModifying=form.get('allowModifying')==='true';

    if(!(file instanceof File)) return errorResponse('Please upload a PDF file.');
    const validation = await validatePdfFile(file);
    if (!validation.valid) return errorResponse(validation.error || 'Invalid PDF file.');
    if(password.length<4 || password.length>128) return errorResponse('Password must be 4 to 128 characters.');
    if(ownerPassword.length<4 || ownerPassword.length>128) return errorResponse('Owner password must be 4 to 128 characters.');

    const bytes=new Uint8Array(await file.arrayBuffer());
    const header=new TextDecoder().decode(bytes.slice(0,5));
    if(header!=='%PDF-') return errorResponse('The uploaded file is not a valid PDF.');

    const encrypted=await encryptPDF(bytes,password,{ownerPassword,allowPrinting,allowCopying,allowModifying});
    const outputValidation = validateOutputBuffer(encrypted, 'Protect PDF');
    if (!outputValidation.valid) return errorResponse(outputValidation.error || 'Generated PDF is invalid.', 500);
    const filename = sanitizePdfDownloadFilename(file.name, '_protected.pdf');

    return new NextResponse(encrypted as BodyInit, {
      headers: getDownloadHeaders(filename, encrypted.byteLength),
    });
  }catch(error){
    const message=error instanceof Error?error.message:'Unable to protect this PDF.';
    const status=/already password-protected|already encrypted|password/i.test(message)?400:500;
    return errorResponse(message,status);
  }
}
