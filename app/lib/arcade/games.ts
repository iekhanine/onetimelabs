export type ArcadeGame = {
  slug: string;
  name: string;
  category: string;
  description: string;
  accent: "cyan" | "amber" | "green" | "violet" | "red";
};

export const arcadeGames: ArcadeGame[] = [
  { slug: "snake", name: "SNAKE", category: "CLASSIC", description: "Grid-based snake with keyboard and on-screen controls.", accent: "green" },
  { slug: "mines", name: "MINES", category: "PUZZLE", description: "Compact minefield logic game.", accent: "red" },
  { slug: "memory-grid", name: "MEMORY GRID", category: "MEMORY", description: "Memorize the illuminated cells and reproduce the pattern.", accent: "violet" },
  { slug: "lights-out", name: "LIGHTS OUT", category: "LOGIC", description: "Toggle the grid until every light is off.", accent: "amber" },
  { slug: "circuit-trace", name: "CIRCUIT TRACE", category: "REFLEX", description: "Trace the active circuit path before the timer expires.", accent: "cyan" },
  { slug: "reaction-test", name: "REACTION TEST", category: "REFLEX", description: "Measure your reaction time against the signal.", accent: "red" },
];

export function getArcadeGame(slug: string) {
  return arcadeGames.find((game) => game.slug === slug);
}
