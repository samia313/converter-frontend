'use client'
import { useRef, useState } from 'react'
import FileUploader from '@/components/file-uploader'

export default function CropPdfTool() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [margins, setMargins] = useState({ left: '0', right: '0', top: '0', bottom: '0' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [url, setUrl] = useState<string | null>(null)

  function resetUrl() { if (url) URL.revokeObjectURL(url); setUrl(null) }
  async function process() {
    if (!file) return
    setBusy(true); setError(''); resetUrl()
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('left', margins.left); fd.append('right', margins.right)
      fd.append('top', margins.top); fd.append('bottom', margins.bottom)
      const response = await fetch('/api/convert/crop-pdf', { method: 'POST', body: fd })
      if (!response.ok) { const data = await response.json().catch(() => null); throw new Error(data?.error || 'Cropping failed.') }
      setUrl(URL.createObjectURL(await response.blob()))
    } catch (e) { setError(e instanceof Error ? e.message : 'Cropping failed.') }
    finally { setBusy(false) }
  }
  function reset() { resetUrl(); setFile(null); setError(''); setMargins({ left: '0', right: '0', top: '0', bottom: '0' }); if (inputRef.current) inputRef.current.value = '' }

  return <section className="mx-auto w-full max-w-3xl px-4 py-8">
    <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-7">
      <h1 className="text-2xl font-bold sm:text-3xl">Crop PDF</h1>
      <p className="mt-2 text-muted-foreground">Trim visible page margins using point measurements. The same crop margins are applied to every page.</p>
      <input ref={inputRef} type="file" accept=".pdf,application/pdf" onChange={e => { resetUrl(); setFile(e.target.files?.[0] ?? null); setError('') }} className="mt-6 block w-full rounded-lg border p-3 text-sm" />
      <div className="mt-5 grid grid-cols-2 gap-4">
        {(['left','right','top','bottom'] as const).map(side => <label key={side} className="text-sm font-medium capitalize">{side} margin (pt)<input type="number" min="0" max="1000" step="1" value={margins[side]} onChange={e => setMargins(v => ({ ...v, [side]: e.target.value }))} disabled={!file || busy} className="mt-2 w-full rounded-lg border px-3 py-3" /></label>)}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">PDF points are used for crop margins. 72 points = 1 inch. Keep the combined margins smaller than each page's dimensions.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={process} disabled={!file || busy} className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-50">{busy ? 'Cropping…' : 'Crop PDF'}</button>
        {(file || url) && <button type="button" onClick={reset} className="rounded-lg border px-5 py-3 font-medium">Reset</button>}
      </div>
      {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
      {url && <div className="mt-5 rounded-lg border p-4"><p className="font-medium text-green-700">Cropped PDF is ready.</p><a href={url} download={file?.name.replace(/\.pdf$/i,'') + '_cropped.pdf'} className="mt-3 inline-flex rounded-lg border px-5 py-3 font-medium">Download PDF</a></div>}
    </div>
  </section>
}