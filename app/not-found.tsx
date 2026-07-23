import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-6 text-center">
      <p className="mb-4 font-mono text-6xl font-bold text-cyan-400">404</p>
      <h1 className="mb-2 text-2xl font-bold text-white">页面未找到</h1>
      <p className="mb-8 max-w-md text-neutral-400">
        你访问的页面不存在，可能已被移动或删除。
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-neutral-200"
          href="/"
        >
          返回首页
        </Link>
        <Link
          className="inline-flex h-12 items-center gap-2 rounded-full border border-neutral-700 px-8 text-sm font-semibold text-neutral-300 transition-all hover:border-neutral-500 hover:text-white"
          href="/docs/getting-started/"
        >
          快速上手
        </Link>
      </div>
    </main>
  );
}
