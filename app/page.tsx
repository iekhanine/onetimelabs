const projectGroups = [
  {
    title: "CURRENTLY BUILDING",
    projects: [
      {
        name: "UnfilteredLog",
        description: "Anonymous writing platform focused on honest conversations.",
        url: "/projects/unfilteredlog",
        status: "Building",
      },
      {
        name: "Party Cat Drip",
        description: "Website redesign and modernization project.",
        url: "/projects/partycatdrip",
        status: "Building",
      },

    ],
  },
  {
    title: "PLANNING",
    projects: [
      {
        name: "Printer Toolkit",
        description: "Enterprise printer management utilities.",
        url: "/projects/printer-toolkit",
        status: "Planning",
      },
            {
        name: "Discord Infrastructure",
        description: "Communities, bots, automation, moderation.",
        url: "/projects/discord-infrastructure",
        status: "Planning",
      },
    ],
  },
];

function getStatusColor(status: string) {
  if (status === "Building") return "bg-lime-400";
  if (status === "Planning") return "bg-yellow-400";
  return "bg-zinc-500";
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-8 py-20">
        <p className="uppercase tracking-[.4em] text-zinc-500 text-xs">
          onetimelabs.net
        </p>

        <h1 className="mt-4 text-7xl font-black tracking-tight">
          ONETIMELABS
        </h1>

        <p className="mt-8 max-w-xl text-2xl leading-relaxed text-zinc-400">
          Experiments.
          <br />
          Tools.
          <br />
          Things I&apos;m building.
        </p>

        {projectGroups.map((group) => (
          <section key={group.title} className="mt-24">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-sm tracking-[.3em] text-zinc-500">
                {group.title}
              </h2>

              <span className="text-zinc-600">
                {group.projects.length.toString().padStart(2, "0")}
              </span>
            </div>

            <div className="mt-10 space-y-10">
              {group.projects.map((project) => (
                <a key={project.name} href={project.url} className="group block">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-3 w-3 rounded-full ${getStatusColor(
                            project.status
                          )}`}
                        />

                        <h3 className="text-3xl font-semibold transition duration-200 group-hover:text-lime-400">
                          {project.name}
                        </h3>
                      </div>

                      <p className="mt-3 ml-7 max-w-2xl text-zinc-500">
                        {project.description}
                      </p>
                    </div>

                    <span className="text-zinc-700 transition duration-200 group-hover:text-white">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-24 border-t border-zinc-800 pt-8 flex justify-between text-sm text-zinc-600">
          <span>More projects coming...</span>
          <span>OneTimeLabs © 2026</span>
        </div>
      </div>
    </main>
  );
}