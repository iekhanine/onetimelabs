import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ban, BriefcaseBusiness, CarFront, Clock3, HeartPulse, Landmark, Mic2, Play, Podcast, ShoppingCart, Smartphone, Tv, Users, Utensils, Youtube } from "lucide-react";
import "./omr.css";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "OldManRant | Daily Complaints From a Man Who Has Officially Had Enough",
  description: "Daily complaints, observations, and unsolicited opinions from people who have officially had enough.",
  openGraph: { title: "OldManRant", description: "Different old people. Same bullshit.", type: "website" },
};

const episodes = [
  { date: "OCT 26, 2026", title: "GET THE FUCK OFF MY LAWN", duration: "02:47", image: "/omr/ep1.jpg" },
  { date: "OCT 25, 2026", title: "WHY THE FUCK DOES EVERYTHING NEED AN APP?", duration: "03:12", image: "/omr/ep2.jpg" },
  { date: "OCT 24, 2026", title: "WHAT THE HELL HAPPENED TO BOREDOM?", duration: "02:58", image: "/omr/ep3.jpg" },
  { date: "OCT 23, 2026", title: "THE GODDAMN GROCERY STORE", duration: "03:21", image: "/omr/ep4.jpg" },
  { date: "OCT 22, 2026", title: "YOUNG PEOPLE AND THEIR FUCKING MUSIC", duration: "02:36", image: "/omr/ep5.jpg" },
];

const categories = [
  [Smartphone, "Technology"], [Users, "People"], [Utensils, "Food"], [CarFront, "Cars"], [BriefcaseBusiness, "Work"], [HeartPulse, "Dating"],
  [Landmark, "Government"], [ShoppingCart, "Shopping"], [Tv, "Television"], [HeartPulse, "The Body"], [Clock3, "The Good Old Days"], [Ban, "Things That Shouldn't Fucking Exist"],
] as const;

export default async function OMRHome() {
  const supabase = await createClient();
  const { data: dbCharacters } = await supabase.from("omr_characters").select("name,slug,avatar_url").eq("active", true).order("created_at");
  return (
    <div className="omr-page">
      <header className="omr-header">
        <div className="omr-header__inner">
          <Link className="omr-logo" href="/omr" aria-label="OldManRant home"><span>OLDMANRANT</span><sup>™</sup><small>DAILY COMPLAINTS FROM A MAN WHO HAS OFFICIALLY HAD ENOUGH.</small></Link>
          <nav className="omr-nav" aria-label="OldManRant navigation">
            <Link className="is-active" href="#home">HOME</Link><Link href="#episodes">EPISODES</Link><Link href="#categories">CATEGORIES</Link><Link href="#ranters">ABOUT</Link><Link href="#submit">SUBMIT</Link><Link href="/omr/upload">UPLOAD</Link>
          </nav>
          <div className="omr-listen"><Mic2 size={27} strokeWidth={1.8}/><span>LISTEN ON</span><div className="omr-listen__icons"><span aria-label="Spotify">◉</span><Podcast aria-label="Apple Podcasts" size={22}/><Youtube aria-label="YouTube" size={23}/></div></div>
        </div>
      </header>

      <main id="home">
        <section className="omr-hero">
          <div className="omr-hero__photo"><Image src="/omr/hero-scene.jpg" alt="An irritated old man sitting in a chair with a microphone and coffee mug" fill priority sizes="(max-width: 900px) 100vw, 56vw"/></div>
          <article className="omr-rant-card">
            <div className="omr-tape">TODAY&apos;S RANT</div>
            <div className="omr-episode-stamp"><strong>EPISODE 001</strong><span>OCT 26, 2026</span></div>
            <h1>GET THE FUCK OFF<br/>MY LAWN</h1>
            <p className="omr-rant-quote">“I&apos;m trying to watch Matlock...”</p>
            <div className="omr-player"><button type="button" aria-label="Play episode"><Play fill="currentColor" size={25}/></button><div className="omr-waveform" aria-hidden="true">{Array.from({length:48}).map((_,i)=><i key={i} style={{height:`${8+((i*17)%27)}px`}}/>)}</div><strong>02:47</strong></div>
            <div className="omr-rant-actions"><a href="#player"><span>◉</span> LISTEN NOW</a><a href="#transcript">READ TRANSCRIPT <ArrowRight size={14}/></a></div>
          </article>
        </section>

        <section className="omr-episodes" id="episodes">
          <div className="omr-section-heading"><h2>LATEST EPISODES</h2><Link href="#episodes">VIEW ALL EPISODES <ArrowRight size={15}/></Link></div>
          <div className="omr-episode-grid">{episodes.map((episode)=><article className="omr-episode-card" key={episode.date}><div className="omr-card-image"><Image src={episode.image} alt="" fill sizes="(max-width: 900px) 50vw, 20vw"/><span>{episode.date}</span></div><h3>{episode.title}</h3><div className="omr-card-meta"><Play fill="currentColor" size={12}/><span>{episode.duration}</span></div></article>)}</div>
        </section>

        <section className="omr-paper" id="categories">
          <div className="omr-paper__inner">
            <div className="omr-ranters" id="ranters"><h2>MEET THE RANTERS</h2><div className="omr-red-rule"/><div className="omr-character-strip">{dbCharacters?.length ? dbCharacters.map((c)=><Link className="omr-character" href={`/omr/character/${c.slug}`} key={c.slug} title={c.name}><Image src={c.avatar_url || "/omr/characters.jpg"} alt={c.name} fill sizes="55px"/></Link>) : [0,1,2,3,4].map((n)=><div className="omr-character" key={n}><Image src="/omr/characters.jpg" alt="OldManRant character" fill sizes="55px" style={{objectPosition:`${n*25}% center`}}/></div>)}</div><p>Different old people. Same bullshit.</p><div className="omr-red-rule omr-red-rule--short"/></div>
            <div className="omr-category-list"><h2>BROWSE BY CATEGORY</h2><div className="omr-category-grid">{categories.map(([Icon,label])=><Link href="#episodes" key={label}><Icon size={18} strokeWidth={2.2}/><span>{label}</span></Link>)}</div></div>
            <aside className="omr-submit-note" id="submit"><h2>SUBMIT SOMETHING<br/>TO RANT ABOUT</h2><p>What&apos;s pissing you off?</p><form action="#submit" method="get"><input aria-label="Rant submission" name="rant" placeholder="Type it here..."/><button type="submit">SEND IT</button></form><small>Could be you. Might be me.<br/>Definitely will be pissed.</small></aside>
          </div>
        </section>
      </main>

      <footer className="omr-footer"><div className="omr-footer__brand">OLDMANRANT<sup>™</sup></div><p>Because apparently somebody has to say it.</p><div className="omr-socials"><span>f</span><span>𝕏</span><span>◎</span><span>▶</span></div><div className="omr-footer__signal"><span>▮▮▮</span> NEW RANT. EVERY DAY.</div></footer>
    </div>
  );
}
