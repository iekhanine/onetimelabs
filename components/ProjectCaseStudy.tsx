// components/ProjectCaseStudy.tsx

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export default function ProjectCaseStudy({ project }: Props) {
  return (
    <article className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/"
        className="text-sm text-zinc-500 transition hover:text-zinc-200"
      >
        ← Back to Projects
      </Link>

      <header className="mt-6 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-3">
          <span className="rounded border border-zinc-700 px-2 py-1 text-xs uppercase tracking-widest text-zinc-400">
            {project.status}
          </span>

          {project.featured && (
            <span className="rounded bg-blue-600 px-2 py-1 text-xs font-semibold">
              Featured
            </span>
          )}
        </div>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          {project.title}
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          {project.description}
        </p>
      </header>

      <Section title="Executive Summary">
        <p>{project.executiveSummary}</p>
      </Section>

      <Section title="Project Details">
        <p>{project.details}</p>
      </Section>

      <Section title="Built With">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <TechCategory title="Frontend" items={project.tech.frontend} />
          <TechCategory title="Backend" items={project.tech.backend} />
          <TechCategory title="Infrastructure" items={project.tech.infrastructure} />
          <TechCategory title="Hosting" items={project.tech.hosting} />
          <TechCategory title="Development Tools" items={project.tech.tools} />
        </div>
      </Section>

      <Section title="Skills Demonstrated">
        <ul className="grid gap-3 md:grid-cols-2">
          {project.skills.map((skill) => (
            <li
              key={skill}
              className="rounded border border-zinc-800 bg-zinc-900 p-3"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="System Architecture">
        <p className="mb-6">{project.architecture.description}</p>

        {project.architecture.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-800">
            <Image
              src={project.architecture.image}
              alt="Architecture Diagram"
              fill
              className="object-cover"
            />
          </div>
        )}
      </Section>

      <Section title="Engineering Challenges">
        <div className="space-y-8">
          {project.challenges.map((challenge) => (
            <div
              key={challenge.problem}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-semibold">Problem</h3>
              <p className="mt-2 text-zinc-400">{challenge.problem}</p>

              <h3 className="mt-6 text-xl font-semibold">Solution</h3>
              <p className="mt-2 text-zinc-400">{challenge.solution}</p>

              <h3 className="mt-6 text-xl font-semibold">Tradeoff</h3>
              <p className="mt-2 text-zinc-400">{challenge.tradeoff}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Screenshots">
        <div className="grid gap-6 md:grid-cols-2">
          {project.screenshots.map((image) => (
            <div
              key={image}
              className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-800"
            >
              <Image src={image} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Roadmap">
        <div className="space-y-3">
          {project.roadmap.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-xl">{item.done ? "✓" : "⬜"}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Lessons Learned">
        <ul className="space-y-3">
          {project.lessons.map((lesson) => (
            <li key={lesson}>• {lesson}</li>
          ))}
        </ul>
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-3xl font-bold">{title}</h2>
      <div className="leading-8 text-zinc-300">{children}</div>
    </section>
  );
}

function TechCategory({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h3 className="mb-4 font-semibold">{title}</h3>

      <ul className="space-y-2 text-zinc-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}