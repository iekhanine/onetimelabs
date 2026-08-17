import {
  notFound,
} from "next/navigation";

import {
  getArcadeGame,
} from "../../lib/arcade/games";

import ArcadeGamePanel from "./ArcadeGamePanel";

import "./game.css";


// ==========================================================
// GAME ROUTE 001 — DYNAMIC PROGRAM
// ==========================================================

export default async function ArcadeGamePage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const {
    slug,
  } = await params;

  const game =
    getArcadeGame(slug);

  if (!game) {
    notFound();
  }

  return (
    <ArcadeGamePanel
      game={game}
    />
  );
}
