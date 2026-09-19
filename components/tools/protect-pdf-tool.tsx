'use client';

import { useEffect, useState } from 'react';
import { Download, LockKeyhole } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

export default function ProtectpdfTool(){
  const [file,setFile]=useState<File|null>(null);
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [ownerPassword,setOwnerPassword]=useState('');
  const [allowPrinting,setAllowPrinting]=useState(true);
  const [allowCopying,setAllowCopying]=useState(false);
  const [allowModifying,setAllowModifying]=useState(false);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const [url,setUrl]=useState<string|null>(null);

  useEffect(()=>()=>{if(url) URL.revokeObjectURL(url)},[url]);

  const protect=async()=>{
    if(!file)return;
    setError(null);
    if(password.length<4){setError('Use a password with at least 4 characters.');return}
    if(password!==confirm){setError('Passwords do not match.');return}
    setBusy(true);
    try{
      const form=new FormData();
      form.append('file',file);
      form.append('password',password);
      form.append('ownerPassword',ownerPassword||password);
      form.append('allowPrinting',String(allowPrinting));
      form.append('allowCopying',String(allowCopying));
      form.append('allowModifying',String(allowModifying));
      const res=await fetch('/api/convert/protect-pdf',{method:'POST',body:form});
      if(!res.ok){
        const data=await res.json().catch(()=>null);
        throw new Error(data?.error||'Unable to protect PDF.');
      }
      const blob=await res.blob();
      setUrl(URL.createObjectURL(blob));
    }catch(e){setError(e instanceof Error?e.message:'Unable to protect PDF.')}
    finally{setBusy(false)}
  };

  const reset=()=>{if(url)URL.revokeObjectURL(url);setUrl(null);setFile(null);setPassword('');setConfirm('');setOwnerPassword('');setError(null)};

  return <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
    <div className="container mx-auto max-w-2xl px-4">
      <div className="text-center mb-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><LockKeyhole className="h-7 w-7"/></div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Protect PDF Online</h1>
        <p className="text-lg text-gray-600">Password-protect a PDF and control basic printing, copying, and editing permissions.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {!url && <FileUploader accept=".pdf,application/pdf" onFileSelected={(files)=>setFile(files[0]||null)} maxSize={100}/>}
        {file&&!url && <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Open password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-3" placeholder="At least 4 characters"/></label>
          <label className="block text-sm font-medium text-gray-700">Confirm password<input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-3" /></label>
          <label className="block text-sm font-medium text-gray-700">Owner password <span className="font-normal text-gray-500">(optional)</span><input type="password" value={ownerPassword} onChange={e=>setOwnerPassword(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-3" placeholder="Defaults to the open password"/></label>
          <div className="rounded-xl border p-4 space-y-3">
            <p className="font-semibold text-gray-900">Permissions</p>
            {[[allowPrinting,setAllowPrinting,'Allow printing'],[allowCopying,setAllowCopying,'Allow copying text/images'],[allowModifying,setAllowModifying,'Allow modifying content']].map(([checked,setter,label]:any)=><label key={label} className="flex items-center gap-3 text-sm text-gray-700"><input type="checkbox" checked={checked} onChange={e=>setter(e.target.checked)} />{label}</label>)}
          </div>
          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-3">This implementation uses RC4-128 PDF password encryption for broad reader compatibility. PDF permission flags are advisory; for highly sensitive data, use additional security controls.</p>
        </div>}
        {error&&<div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
        {!url?<button onClick={protect} disabled={!file||busy} className="w-full mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400">{busy?'Protecting PDF...':'Protect PDF'}</button>
        :<div className="text-center mt-4"><p className="text-green-600 font-semibold mb-4">PDF protected successfully.</p><a href={url} download={file?.name.replace(/\.pdf$/i,'')+'_protected.pdf'} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white"><Download className="h-5 w-5"/>Download Protected PDF</a><button onClick={reset} className="ml-3 rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-900">Protect Another</button></div>}
      </div>
    </div>
  </section>
}
