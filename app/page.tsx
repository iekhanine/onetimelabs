export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="max-w-3xl px-8 text-center">
        <p className="uppercase tracking-[0.3em] text-lime-400 text-sm mb-4">
          onetimelabs.net
        </p>

        <h1 className="text-7xl font-black mb-6">
          OneTimeLabs
        </h1>

        <p className="text-xl text-zinc-400 leading-relaxed">
          A living repository of experiments, unfinished ideas, prototypes,
          useful tools, and projects currently held together with caffeine,
          curiosity, and just enough duct tape.
        </p>
      </div>
    </main>
  );
}