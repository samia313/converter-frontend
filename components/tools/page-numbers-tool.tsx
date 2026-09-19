'use client'
import { useRef, useState } from 'react'

export default function PageNumbersTool() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file,setFile]=useState<File|null>(null)
  const [start,setStart]=useState('1')
  const [fontSize,setFontSize]=useState('10')
  const [position,setPosition]=useState('bottom-center')
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState('')
  const [url,setUrl]=useState<string|null>(null)

  function resetUrl(){if(url) URL.revokeObjectURL(url);setUrl(null)}
  async function process(){
    if(!file)return
    setBusy(true);setError('');resetUrl()
    try{
      const fd=new FormData();fd.append('file',file);fd.append('start',start);fd.append('fontSize',fontSize);fd.append('position',position)
      const res=await fetch('/api/convert/page-numbers',{method:'POST',body:fd})
      if(!res.ok){const d=await res.json().catch(()=>null);throw new Error(d?.error||'Could not add page numbers.')}
      setUrl(URL.createObjectURL(await res.blob()))
    }catch(e){setError(e instanceof Error?e.message:'Could not add page numbers.')}finally{setBusy(false)}
  }
  function reset(){resetUrl();setFile(null);setError('');setStart('1');setFontSize('10');setPosition('bottom-center');if(inputRef.current)inputRef.current.value=''}
  return <section className="mx-auto w-full max-w-3xl px-4 py-8">
    <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-7">
      <h1 className="text-2xl font-bold sm:text-3xl">Add Page Numbers to PDF</h1>
      <p className="mt-2 text-muted-foreground">Add sequential numbers to every page with a selectable position and font size.</p>
      <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={e=>{resetUrl();setFile(e.target.files?.[0]??null);setError('')}} className="mt-6 block w-full rounded-lg border p-3 text-sm"/>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium">Start number<input type="number" min="1" value={start} onChange={e=>setStart(e.target.value)} disabled={!file||busy} className="mt-2 w-full rounded-lg border px-3 py-3"/></label>
        <label className="text-sm font-medium">Font size<input type="number" min="6" max="36" value={fontSize} onChange={e=>setFontSize(e.target.value)} disabled={!file||busy} className="mt-2 w-full rounded-lg border px-3 py-3"/></label>
        <label className="text-sm font-medium">Position<select value={position} onChange={e=>setPosition(e.target.value)} disabled={!file||busy} className="mt-2 w-full rounded-lg border px-3 py-3"><option value="bottom-left">Bottom left</option><option value="bottom-center">Bottom center</option><option value="bottom-right">Bottom right</option><option value="top-left">Top left</option><option value="top-center">Top center</option><option value="top-right">Top right</option></select></label>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Numbers are added to each page in sequence. Existing PDF content is not removed.</p>
      <div className="mt-5 flex flex-wrap gap-3"><button onClick={process} disabled={!file||busy} className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-50">{busy?'Adding numbers…':'Add Page Numbers'}</button>{(file||url)&&<button onClick={reset} className="rounded-lg border px-5 py-3 font-medium">Reset</button>}</div>
      {error&&<p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
      {url&&<div className="mt-5 rounded-lg border p-4"><p className="font-medium text-green-700">Numbered PDF is ready.</p><a href={url} download={file?.name.replace(/\.pdf$/i,'')+'_numbered.pdf'} className="mt-3 inline-flex rounded-lg border px-5 py-3 font-medium">Download PDF</a></div>}
    </div>
  </section>
}