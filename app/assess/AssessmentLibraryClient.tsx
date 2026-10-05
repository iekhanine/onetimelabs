"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import styles from "./assessment.module.css";

type AssessmentCard = {
  type: string;
  title: string;
  shortTitle: string;
  group: string;
  intro: string;
  scoreLabel: string;
  questionCount: number;
  estimatedMinutes: string;
};

export default function AssessmentLibraryClient({
  cards,
  groups,
}: {
  cards: AssessmentCard[];
  groups: string[];
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cards.filter((card) => {
      const matchesGroup = group === "All" || card.group === group;
      const matchesQuery = !needle || [card.title, card.shortTitle, card.group, card.intro, card.scoreLabel]
        .join(" ")
        .toLowerCase()
        .includes(needle);
      return matchesGroup && matchesQuery;
    });
  }, [cards, group, query]);

  return (
    <section className={styles.librarySection}>
      <div className={styles.libraryToolbar}>
        <label className={styles.searchBox}>
          <Search size={16} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search assessments — security, cloud, SaaS, service desk…"
            aria-label="Search assessment library"
          />
        </label>
        <div className={styles.filterRow} aria-label="Assessment categories">
          {["All", ...groups].map((item) => (
            <button
              className={`${styles.filterButton} ${group === item ? styles.filterButtonActive : ""}`}
              type="button"
              key={item}
              onClick={() => setGroup(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.libraryCount}>
        <strong>{visible.length}</strong> free assessment{visible.length === 1 ? "" : "s"}
        {group !== "All" ? ` in ${group}` : ""}
      </div>

      {visible.length === 0 ? (
        <div className={styles.libraryEmpty}>No assessments match that search yet.</div>
      ) : (
        <div className={styles.libraryGrid}>
          {visible.map((card) => (
            <article className={styles.libraryCard} key={card.type}>
              <div className={styles.libraryCardTop}>
                <span className={styles.libraryBadge}>{card.group}</span>
                <span>{card.questionCount} questions</span>
              </div>
              <h2>{card.shortTitle}</h2>
              <p>{card.intro}</p>
              <div className={styles.cardFacts}>
                <span>{card.estimatedMinutes}</span>
                <span>{card.scoreLabel}</span>
              </div>
              <Link className={styles.primaryLink} href={`/assess/${card.type}`}>
                Start assessment <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
