import { useEffect } from "react";
import { ArrowLeft, Home, SearchX, ShieldAlert } from "lucide-react";

type NotFoundPageProps = {
  path: string;
};

export default function NotFoundPage({ path }: NotFoundPageProps) {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-matte-black text-light-text">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute inset-0 spotlight-radial opacity-80 pointer-events-none" />

      <section className="relative z-10 min-h-screen px-6 md:px-12 xl:px-24 py-10 flex items-center">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-[0.3em] text-soft-grey uppercase mb-6">
              <SearchX className="w-3.5 h-3.5" />
              Page Not Found
            </div>

            <div className="flex items-end gap-4 mb-5">
              <span className="text-6xl sm:text-8xl md:text-9xl font-display font-extrabold tracking-tight leading-none">
                404
              </span>
              <div className="pb-2">
                <div className="font-mono text-[10px] tracking-[0.35em] text-soft-grey uppercase">
                  Route Status
                </div>
                <div className="mt-2 h-px w-24 bg-white/20" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight mb-6 max-w-3xl">
              This route does not exist.
            </h1>

            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-soft-grey mb-4">
              The URL <span className="text-light-text font-mono">{path}</span> does not match any
              page in this app.
            </p>

            <p className="max-w-2xl text-sm md:text-base leading-relaxed text-soft-grey/80">
              If you typed a random path after the slash, this is the expected 404 Not Found page.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 bg-light-text text-matte-black hover:bg-light-text/90 transition-colors text-xs font-mono tracking-widest"
              >
                <Home className="w-3.5 h-3.5" />
                BACK HOME
              </a>
              <a
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-colors text-xs font-mono tracking-widest text-light-text"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                GO TO PROJECTS
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-white/10 bg-white/3 p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
              <div className="relative flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-soft-grey uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Missing Route
                </div>
                <div className="text-[10px] font-mono tracking-[0.3em] text-soft-grey/60 uppercase">
                  NOT FOUND
                </div>
              </div>

              <div className="space-y-4 text-sm md:text-base text-soft-grey leading-relaxed">
                <p>
                  The server or client router could not resolve this path to an existing page.
                </p>
                <p>
                  In single-page apps, this is usually shown by a catch-all route or a fallback
                  404 screen.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 text-[10px] font-mono tracking-widest text-soft-grey">
                <div className="p-3 border border-white/10 bg-black/20">
                  STATUS
                  <div className="mt-2 text-light-text">404</div>
                </div>
                <div className="p-3 border border-white/10 bg-black/20">
                  TYPE
                  <div className="mt-2 text-light-text">NOT FOUND</div>
                </div>
                <div className="p-3 border border-white/10 bg-black/20">
                  ACTION
                  <div className="mt-2 text-light-text">RETURN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}