// ==========================================================
// ARCADE GAMES 001 — PROGRAM LIBRARY
// ==========================================================

export type ArcadeGame = {
  slug: string;
  name: string;
  category: string;
  description: string;
  accent: "amber" | "green" | "cyan" | "violet" | "red";
};

export const arcadeGames: ArcadeGame[] = [
  {
    slug: "snake",
    name: "SNAKE",
    category: "CLASSIC",
    description: "Guide the signal chain, collect nodes, and avoid collisions.",
    accent: "green",
  },
  {
    slug: "mines",
    name: "MINES",
    category: "LOGIC",
    description: "Clear the grid without triggering a buried fault.",
    accent: "red",
  },
  {
    slug: "memory-grid",
    name: "MEMORY GRID",
    category: "MEMORY",
    description: "Repeat an increasingly long illuminated control sequence.",
    accent: "cyan",
  },
  {
    slug: "lights-out",
    name: "LIGHTS OUT",
    category: "LOGIC",
    description: "Toggle adjacent panel lamps until the entire board is dark.",
    accent: "violet",
  },
  {
    slug: "circuit-trace",
    name: "CIRCUIT TRACE",
    category: "PUZZLE",
    description: "Rotate circuit segments to complete the path from source to output.",
    accent: "amber",
  },
  {
    slug: "reaction-test",
    name: "REACTION TEST",
    category: "REFLEX",
    description: "Wait for the status lamp, then hit the control as fast as possible.",
    accent: "green",
  },
];

export function getArcadeGame(slug: string) {
  return arcadeGames.find((game) => game.slug === slug);
}
