import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        The PDFilio page you requested could not be found. The URL may be incorrect, outdated, or the tool may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-md bg-primary px-5 py-2.5 text-primary-foreground">Go to homepage</Link>
        <Link href="/tools" className="rounded-md border px-5 py-2.5">Browse PDF tools</Link>
      </div>
    </main>
  );
}
