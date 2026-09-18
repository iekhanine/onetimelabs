"use client";

import { useMemo, useState } from "react";
import styles from "./a220.module.css";

type AcronymItem = {
  acronym: string;
  meaning: string;
};

type AcronymSection = {
  title: string;
  items: AcronymItem[];
};

const sections: AcronymSection[] = [
  {
    title: "Aircraft General",
    items: [
      { acronym: "CTP", meaning: "Control Tuning Panel" },
      { acronym: "FCP", meaning: "Flight Control Panel" },
      { acronym: "ISI", meaning: "Integrated Standby Instrument" },
      { acronym: "MKP", meaning: "Multifunction Keyboard Panel" },
      { acronym: "CCP", meaning: "Cursor Control Panel" },
      { acronym: "ACP", meaning: "Audio Control Panel" },
      { acronym: "RSP", meaning: "Reversionary Switch Panel" },
      { acronym: "TQA", meaning: "Throttle Quadrant Assembly" },
      { acronym: "FSCL", meaning: "Flight Spoiler Control Lever" },
      { acronym: "IMS", meaning: "Information Management System" },
    ],
  },
  {
    title: "Air Management",
    items: [
      { acronym: "IAMS", meaning: "Integrated Air Management System" },
      { acronym: "BALODS", meaning: "Bleed Air Leak and Overheat Detection System" },
      { acronym: "IASC", meaning: "Integrated Air System Controllers" },
    ],
  },
  {
    title: "Bleed",
    items: [
      { acronym: "IPCV", meaning: "Intermediate Pressure Check Valve" },
      { acronym: "HPV", meaning: "High Pressure Valve" },
      { acronym: "PRSOV", meaning: "Pressure Regulating Shutoff Valve (Bleed Valve)" },
      { acronym: "FAV", meaning: "Fan Air Valve" },
      { acronym: "BTS", meaning: "Bleed Temp Sensor" },
      { acronym: "HPGC", meaning: "High Pressure Ground Connection" },
    ],
  },
  {
    title: "Air Conditioning",
    items: [
      { acronym: "LPGC", meaning: "Low Pressure Ground Connection" },
      { acronym: "RABV", meaning: "Ram Air Regulating Valve" },
      { acronym: "TCV", meaning: "Temp Control Valve" },
      { acronym: "FCV", meaning: "Flow Control Valve" },
      { acronym: "TAV", meaning: "Trim Air Valve" },
      { acronym: "TAPRV", meaning: "Trim Air Pressure Regulating Valve" },
      { acronym: "TASOV", meaning: "Trim Air Shutoff Valve" },
      { acronym: "ERAV", meaning: "Emergency Ram Air Valve" },
    ],
  },
  {
    title: "Auto Flight",
    items: [
      { acronym: "AFCS", meaning: "Automatic Flight Control System" },
      { acronym: "PFCC", meaning: "Primary Flight Control Computer" },
      { acronym: "FMA", meaning: "Flight Mode Annunciator" },
      { acronym: "EDM", meaning: "Emergency Descent Mode" },
    ],
  },
  {
    title: "APU",
    items: [
      { acronym: "ECU", meaning: "Electronic Control Unit" },
      { acronym: "FCU", meaning: "Fuel Control Unit" },
      { acronym: "AOHE", meaning: "Air/Oil Heat Exchanger" },
    ],
  },
  {
    title: "Communications",
    items: [
      { acronym: "RIU", meaning: "Radio Interface Unit" },
      { acronym: "SDU", meaning: "Satellite Data Unit" },
    ],
  },
  {
    title: "Electrical",
    items: [
      { acronym: "FBWPC", meaning: "Fly-By-Wire Power Converter" },
      { acronym: "EPC", meaning: "Electrical Power Center" },
      { acronym: "BPCU", meaning: "Bus Power Control Unit" },
      { acronym: "EMPC", meaning: "Emergency Power Control" },
      { acronym: "VFG", meaning: "Variable Frequency Generator" },
      { acronym: "PMG", meaning: "Permanent Magnet Generator" },
      { acronym: "GCU", meaning: "Generator Control Unit" },
      { acronym: "OPU", meaning: "Overvoltage Protection Unit" },
      { acronym: "AGCU", meaning: "APU Generator Control Unit" },
      { acronym: "RGC", meaning: "RAT Generator Control" },
      { acronym: "CDC", meaning: "Control and Distribution Cabinet" },
      { acronym: "SSPC", meaning: "Solid State Power Controller" },
    ],
  },
  {
    title: "Fire and Overheat",
    items: [{ acronym: "FDEX", meaning: "Fire Detection and Extinguishing System" }],
  },
  {
    title: "Flight Controls",
    items: [
      { acronym: "IIM", meaning: "Inceptor Interface Module" },
      { acronym: "PFCC", meaning: "Primary Flight Control Computer" },
      { acronym: "REU", meaning: "Remote Electronics Unit" },
      { acronym: "AFCU", meaning: "Alternate Flight Control Unit" },
      { acronym: "MCE", meaning: "Horizontal Stab Motor Control Electronics" },
      { acronym: "PCU", meaning: "Power Control Unit" },
      { acronym: "SFECU", meaning: "Slat/Flap Electronic Control Unit" },
      { acronym: "PDU", meaning: "Power Drive Unit" },
    ],
  },
  {
    title: "Fuel",
    items: [
      { acronym: "FQC", meaning: "Fuel Quantity Computer" },
      { acronym: "FTIS", meaning: "Fuel Tank Inerting System" },
    ],
  },
  {
    title: "Landing Gear",
    items: [
      { acronym: "LGSCU", meaning: "Landing Gear and Steering Control Unit" },
      { acronym: "BDCU", meaning: "Brake Data Concentrator Unit" },
      { acronym: "EMCU", meaning: "Electric Motor Control Unit" },
      { acronym: "BCS", meaning: "Brake Control System" },
      { acronym: "EMA", meaning: "Electric Motor Actuator" },
    ],
  },
  {
    title: "Lighting",
    items: [{ acronym: "EPSU", meaning: "Emergency Power Supply Unit" }],
  },
  {
    title: "Engine",
    items: [
      { acronym: "FDGS", meaning: "Fan Drive Gear System" },
      { acronym: "EEC", meaning: "Electronic Engine Control" },
      { acronym: "PHMU", meaning: "Prognostics and Health Management Unit" },
      { acronym: "ACC", meaning: "Turbine Active Clearance Control" },
      { acronym: "IFPC", meaning: "Integrated Fuel Pump and Control" },
      { acronym: "OCM", meaning: "Oil Control Module" },
    ],
  },
  {
    title: "Water and Waste",
    items: [
      { acronym: "CMS", meaning: "Cabin Management System" },
      { acronym: "WWSC", meaning: "Water and Waste System Controller" },
    ],
  },
];

export default function A220AcronymsClient() {
  const [activeSection, setActiveSection] = useState("Flight Controls");
  const [query, setQuery] = useState("");

  const visibleSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;

    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.acronym.toLowerCase().includes(q) ||
            item.meaning.toLowerCase().includes(q) ||
            section.title.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [query]);

  const currentSection =
    visibleSections.find((section) => section.title === activeSection) ??
    visibleSections[0] ??
    null;

  return (
    <main className={styles.shell}>
      <section className={styles.card} aria-label="A220 acronym reference">
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>ONETIME LABS / PRIVATE REFERENCE</p>
            <h1>A220 Acronym Reference</h1>
            <p className={styles.subtitle}>
              Quick-reference transcription from study notes. Verify against approved training material.
            </p>
          </div>

          <div className={styles.badge} aria-label="Aircraft type">
            A220
          </div>
        </header>

        <div className={styles.searchWrap}>
          <input
            className={styles.search}
            type="search"
            placeholder="Search acronym or definition…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search acronyms"
          />
        </div>

        <div className={styles.layout}>
          <nav className={styles.menu} aria-label="A220 system categories">
            {visibleSections.map((section) => (
              <button
                key={section.title}
                className={`${styles.menuItem} ${
                  currentSection?.title === section.title ? styles.active : ""
                }`}
                onClick={() => setActiveSection(section.title)}
                type="button"
              >
                <span>{section.title}</span>
                <span className={styles.chevron}>›</span>
              </button>
            ))}
          </nav>

          <section className={styles.content}>
            {currentSection ? (
              <>
                <div className={styles.sectionHeading}>
                  <div>
                    <p className={styles.sectionLabel}>SYSTEM</p>
                    <h2>{currentSection.title}</h2>
                  </div>
                  <span className={styles.count}>
                    {currentSection.items.length} {currentSection.items.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className={styles.list}>
                  {currentSection.items.map((item) => (
                    <article className={styles.row} key={`${currentSection.title}-${item.acronym}`}>
                      <div className={styles.acronym}>{item.acronym}</div>
                      <div className={styles.dash}>—</div>
                      <div className={styles.meaning}>{item.meaning}</div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.empty}>No matching acronyms found.</div>
            )}
          </section>
        </div>

        <footer className={styles.footer}>
          <span>OneTime Labs</span>
          <span>Unofficial study reference • Not for operational use</span>
        </footer>
      </section>
    </main>
  );
}
