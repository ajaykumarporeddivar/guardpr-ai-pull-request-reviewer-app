import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="text-center max-w-md p-8">
        <div className="text-8xl font-black text-zinc-100 mb-4 select-none">404</div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Page not found</h1>
        <p className="text-zinc-500 mb-8 text-sm">The page you are looking for does not exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard" className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-semibold hover:bg-zinc-700 transition-colors">Open Dashboard</Link>
          <Link href="/" className="px-6 py-2.5 border border-zinc-200 rounded-xl text-sm font-semibold hover:bg-zinc-50 transition-colors">Go Home</Link>
        </div>
      </div>
    </div>
  )
}