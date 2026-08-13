/* Sunset Frequency direction: a tropical brutalist studio desk; the live identity artifact stays dominant. */
import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import {
  ArrowDownToLine, ArrowUpRight, Camera, Check, ChevronDown, Copy,
  Download, ExternalLink, FileImage, Flame, Instagram, Link2, Linkedin,
  MapPin, Menu, Palette, Send, Share2, Sparkles, Sun, Waves, X,
} from "lucide-react";

const HERO = "/manus-storage/goa-sunset-hero_c30ffcdd.jpg";
const CARD_TEXTURE = "/manus-storage/goa-card-texture_a60a36b7.jpg";
const LOGO = "/manus-storage/hh-sun-wave-logo_bec6c0e1.png";

const themes = [
  { id: "guava", name: "Sunset Guava", note: "last light", color: "#FF6B5E", className: "theme-guava" },
  { id: "mango", name: "Mango Disco", note: "hot & golden", color: "#FFC857", className: "theme-mango" },
  { id: "lagoon", name: "Lagoon FM", note: "after dark", color: "#8CE4C3", className: "theme-lagoon" },
  { id: "plum", name: "Anjuna Plum", note: "night signal", color: "#F19AC3", className: "theme-plum" },
];

const formats = [
  { id: "card", title: "Builder Card", meta: "Social / 3:2", icon: "▣" },
  { id: "frame", title: "Profile Frame", meta: "Avatar / 1:1", icon: "◉" },
  { id: "story", title: "Story Poster", meta: "Vertical / 9:16", icon: "▤" },
];

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "HH";
}

function EditorialPage({ kind }: { kind: "gallery" | "about" }) {
  const isGallery = kind === "gallery";
  return (
    <div className={`site-shell editorial-page ${kind}`}>
      <header className="topbar"><a className="brand" href="/"><span className="brand-mark"><img src={LOGO} alt="" /></span><span className="brand-words"><strong>HACKER HOUSE</strong><em>गोवा</em></span></a><nav className="main-nav"><a href="/generator">Generator</a><a className={isGallery ? "active" : ""} href="/gallery">Gallery</a><a className={!isGallery ? "active" : ""} href="/about">About</a></nav><div className="header-actions"><span className="network-pill"><span className="status-dot" /> BUILT ON <b>SOLANA</b></span><a className="wallet-btn" href="/generator"><ArrowUpRight size={15} /> Build your signal</a></div></header>
      <main className="editorial-main">
        <div className="editorial-kicker"><span className="section-kicker">{isGallery ? "02 / The builder wall" : "03 / A note from Goa"}</span><span>HHG / 2026</span></div>
        <div className="editorial-hero"><div><h1>{isGallery ? <>A wall of<br /><i>bright minds.</i></> : <>Goa is a<br /><i>state of mind.</i></>}</h1><p>{isGallery ? "The room is big enough for 247 different ways of thinking. Soon, this is where every signal will land." : "A four-day collision of ambitious builders, generous strangers, and ideas that refuse to stay small."}</p>{isGallery ? <a className="hero-link" href="/generator">Add your signal <ArrowUpRight size={16} /></a> : <a className="hero-link" href="/generator">Make your identity <ArrowUpRight size={16} /></a>}</div><div className="editorial-number"><span>{isGallery ? "01—247" : "OCT 28—31"}</span><strong>{isGallery ? "WALL" : "GOA"}</strong><small>{isGallery ? "collectible builder signals" : "where good ideas get loud"}</small></div></div>
        {isGallery ? <div className="wall-grid">{["protocol poet", "midnight shipper", "signal gardener", "soft launch specialist", "contract wizard", "beautifully stubborn"].map((label, i) => <div className={`wall-card wc-${i}`} key={label}><span>0{i + 1} / HHG</span><strong>{label}</strong><small>builder signal · 2026</small><i /></div>)}</div> : <div className="manifesto-grid"><div className="manifesto-card warm"><Sun size={28} /><strong>Bring the weird idea.</strong><p>The one you have not found a slot for yet.</p></div><div className="manifesto-card cool"><Waves size={28} /><strong>Share the signal.</strong><p>Generosity is a technical advantage.</p></div><div className="manifesto-card coral"><Sparkles size={28} /><strong>Leave with proof.</strong><p>Ship something that did not exist before.</p></div></div>}
      </main><footer><a className="brand footer-brand" href="/"><span className="brand-mark"><img src={LOGO} alt="" /></span><span className="brand-words"><strong>HACKER HOUSE</strong><em>गोवा</em></span></a><span className="footer-copy">© Hacker House Goa<br />All rights reserved.</span></footer>
    </div>
  );
}

export default function Home() {
  const route = window.location.pathname;
  if (route === "/gallery" || route === "/about") return <EditorialPage kind={route.slice(1) as "gallery" | "about"} />;
  const [name, setName] = useState("Aryan Sharma");
  const [role, setRole] = useState("Full Stack Developer");
  const [builderTitle, setBuilderTitle] = useState("Smart Contract Wizard");
  const [location, setLocation] = useState("Goa, India");
  const [handle, setHandle] = useState("@aryanbuilds");
  const [format, setFormat] = useState("card");
  const [theme, setTheme] = useState(themes[0]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const artifactRef = useRef<HTMLDivElement>(null);

  const activeFormat = useMemo(() => formats.find((item) => item.id === format) ?? formats[0], [format]);

  const onPhoto = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  const shareOnX = () => {
    const safe = (value: string) => value.replace(/[<>&\"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;", "'": "&apos;" })[character] ?? character);
    const photoMarkup = photo
      ? `<image href="${photo}" x="210" y="110" width="580" height="580" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)"/>`
      : `<circle cx="500" cy="400" r="290" fill="#123f42"/><text x="500" y="430" text-anchor="middle" fill="${theme.color}" font-family="Arial" font-weight="700" font-size="170">${safe(initials(name))}</text>`;
    const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"><defs><clipPath id="portrait"><circle cx="500" cy="400" r="290"/></clipPath><radialGradient id="sky"><stop stop-color="#3d263f"/><stop offset="1" stop-color="#101d20"/></radialGradient></defs><rect width="1000" height="1000" fill="url(#sky)"/><circle cx="500" cy="400" r="330" fill="none" stroke="${theme.color}" stroke-width="10"/><circle cx="500" cy="400" r="306" fill="none" stroke="#ffc857" stroke-width="2" stroke-dasharray="8 14"/>${photoMarkup}<circle cx="500" cy="400" r="290" fill="none" stroke="${theme.color}" stroke-width="7"/><circle cx="800" cy="180" r="34" fill="#ffc857"/><text x="500" y="790" text-anchor="middle" fill="#f7e8c2" font-family="Arial" font-weight="700" font-size="44" letter-spacing="6">HACKER HOUSE</text><text x="500" y="850" text-anchor="middle" fill="${theme.color}" font-family="Arial" font-style="italic" font-size="42">गोवा</text><text x="500" y="925" text-anchor="middle" fill="#b8ccc0" font-family="Arial" font-size="22" letter-spacing="5">HHG / 2026 · #FRAMEINGOA</text></svg>`;
    const frameUrl = URL.createObjectURL(new Blob([frameSvg], { type: "image/svg+xml" }));
    const downloadLink = document.createElement("a");
    downloadLink.href = frameUrl;
    downloadLink.download = `${name.toLowerCase().replace(/\s+/g, "-")}-hh-goa-profile-frame.svg`;
    downloadLink.click();
    const caption = `My frame is tuned for Hacker House Goa 2026. See you in Goa. #FrameInGoa`;
    const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(window.location.origin + "/generator")}`;
    window.open(xUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(frameUrl), 1000);
    toast.success("Your HH Goa profile frame is ready. X is opening with your caption.");
  };

  const downloadPng = async () => {
    if (!artifactRef.current) return;
    try {
      await document.fonts.ready;
      const dataUrl = await toPng(artifactRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#101d20",
        fontEmbedCSS: undefined,
      });
      const link = document.createElement("a");
      link.download = `${name.toLowerCase().replace(/\\s+/g, "-")}-hh-goa-2026.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Your high-resolution PNG matches the live preview.");
    } catch {
      toast.error("The preview could not be exported. Please try again.");
    }
  };

  const shareToInstagram = () => {
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    toast.info("Instagram is opening. Use the downloaded PNG to update your profile or post.");
  };

  const shareToLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + "/generator")}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const copyShareLink = async () => {
    const shareText = `${name} · ${builderTitle} · Hacker House Goa 2026 #FrameInGoa — ${window.location.origin}/generator`;
    await navigator.clipboard?.writeText(shareText);
    toast.success("Caption and generator link copied.");
  };

  const download = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><rect width="1200" height="760" fill="#101d20"/><rect x="18" y="18" width="1164" height="724" rx="28" fill="#171b2a" stroke="${theme.color}" stroke-width="4"/><circle cx="190" cy="380" r="135" fill="#0f3b3b" stroke="${theme.color}" stroke-width="5"/><text x="190" y="390" text-anchor="middle" fill="${theme.color}" font-size="56" font-family="Arial" font-weight="700">${initials(name)}</text><text x="420" y="190" fill="#f7e8c2" font-size="58" font-family="Arial" font-weight="700">${name}</text><text x="420" y="250" fill="${theme.color}" font-size="27" font-family="Arial">${role}</text><text x="420" y="340" fill="#f7e8c2" font-size="34" font-family="Arial" font-weight="700">${builderTitle}</text><text x="420" y="430" fill="#9eb5ae" font-size="22" font-family="Arial">${location}  ·  ${handle}</text><text x="950" y="660" fill="${theme.color}" font-size="22" font-family="Arial">HH GOA / 2026</text></svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.toLowerCase().replace(/\s+/g, "-")}-hh-goa-2026.svg`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Your identity card is ready to take with you.");
  };

  return (
    <div className="site-shell" style={{ "--accent": theme.color } as React.CSSProperties}>
      <div className="ambient-orb orb-one" /><div className="ambient-orb orb-two" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Hacker House Goa home">
          <span className="brand-mark"><img src={LOGO} alt="" /></span>
          <span className="brand-words"><strong>HACKER HOUSE</strong><em>गोवा</em></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="active" href="#generator">Generator</a><a href="#gallery">Gallery</a><a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <span className="network-pill"><span className="status-dot" /> BUILT ON <b>SOLANA</b></span>
          <button className="wallet-btn" onClick={() => toast.success("Wallet connection is queued for the main event.")}><Link2 size={15} /> Connect wallet</button>
          <button className="menu-btn" onClick={() => setShowMenu(!showMenu)} aria-label="Open menu"><Menu size={20} /></button>
        </div>
        {showMenu && <div className="mobile-menu"><a href="#generator">Generator</a><a href="#gallery">Gallery</a><a href="#about">About</a></div>}
      </header>

      <main id="top">
        <section className="hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,26,28,.72), rgba(10,26,28,.98)), url(${HERO})` }}>
          <div className="hero-copy"><span className="eyebrow"><Sun size={14} /> 28—31 OCT 2026 · GOA, INDIA</span><h1>Make your <i>signal</i><br /><span>visible.</span></h1><p>One card for the builders, dreamers, and delightful chaos-makers heading to Hacker House Goa.</p><a href="#generator" className="hero-link">Build your identity <ArrowDownToLine size={16} /></a></div>
          <div className="hero-stamp"><span>HH / 26</span><strong>247</strong><small>builders in the room</small></div>
          <div className="ticker"><span>GOA FREQUENCY</span><span>LESS NOISE · MORE SIGNAL</span><span>BUILD LOUD · SHIP KIND</span><span>GOA FREQUENCY</span></div>
        </section>

        <section id="generator" className="workbench">
          <aside className="control-rail">
            <div className="rail-heading"><span className="section-kicker">01 / Identity studio</span><h2>Tune your<br /><i>presence.</i></h2><p>Everything updates live. No account, no fuss, no weak profiles.</p></div>
            <div className="step-list"><span className="step current"><b>01</b><span>Build your signal</span></span><span className="step"><b>02</b><span>Pick your frequency</span></span><span className="step"><b>03</b><span>Take it to Goa</span></span></div>
            <div className="mini-note"><Flame size={17} /><div><strong>Made for the shortlist</strong><p>Distinctive by default. Yours by the end.</p></div></div>
          </aside>

          <div className="studio-panel">
            <div className="panel-bar"><div><span className="live-dot" /> LIVE PREVIEW <small>changes are instant</small></div><span className="panel-index">HHG / 2026</span></div>
            <div className="studio-grid">
              <div className="controls">
                <div className="control-block"><div className="block-label"><span>01</span> Your details</div><label>Full name<input value={name} onChange={(e) => setName(e.target.value)} maxLength={28} /></label><label>Role / discipline<input value={role} onChange={(e) => setRole(e.target.value)} maxLength={32} /></label><label>Builder title<input value={builderTitle} onChange={(e) => setBuilderTitle(e.target.value)} maxLength={32} /></label><div className="two-col"><label>Base camp<input value={location} onChange={(e) => setLocation(e.target.value)} /></label><label>Signal handle<input value={handle} onChange={(e) => setHandle(e.target.value)} /></label></div></div>
                <div className="control-block"><div className="block-label"><span>02</span> Your photo</div><button className="upload-zone" onClick={() => inputRef.current?.click()}><input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => onPhoto(e.target.files?.[0])} />{photo ? <img src={photo} alt="Your uploaded portrait" /> : <><Camera size={23} /><strong>Drop a portrait here</strong><small>or click to browse · JPG / PNG / HEIC</small></>}</button>{photo && <button className="text-action" onClick={() => setPhoto(null)}><X size={13} /> remove photo</button>}</div>
                <div className="control-block"><div className="block-label"><span>03</span> Choose a format</div><div className="format-grid">{formats.map((item) => <button key={item.id} className={`format-card ${format === item.id ? "selected" : ""}`} onClick={() => setFormat(item.id)}><span className="format-icon">{item.icon}</span><strong>{item.title}</strong><small>{item.meta}</small>{format === item.id && <Check className="check" size={14} />}</button>)}</div></div>
                <div className="control-block"><div className="block-label"><span>04</span> Pick your frequency</div><div className="theme-grid">{themes.map((item) => <button key={item.id} className={`theme-chip ${theme.id === item.id ? "selected" : ""}`} onClick={() => setTheme(item)}><i style={{ background: item.color }} /><span>{item.name}<small>{item.note}</small></span>{theme.id === item.id && <Check size={14} />}</button>)}</div></div>
              </div>

              <div className="artifact-column"><div className="artifact-label"><span>04 / Artifact</span><span className="artifact-meta"><Sparkles size={13} /> generated live</span></div><div ref={artifactRef} className={`identity-artifact ${format} ${theme.className} collectible-artifact`} style={{ backgroundImage: `linear-gradient(120deg, rgba(18,26,39,.88), rgba(25,18,39,.76)), url(${CARD_TEXTURE})` }}>
                <div className="artifact-top"><span>HACKER HOUSE <i>गोवा</i></span><span>OCT 28—31 / 2026</span></div><div className="artifact-main"><div className="portrait-wrap">{photo ? <img src={photo} alt="Portrait" /> : <div className="portrait-placeholder"><span>{initials(name)}</span><small>your portrait<br />goes here</small></div>}<div className="sun-ring" /></div><div className="artifact-copy"><span className="artifact-kicker">BUILDER / SIGNAL 026</span><h3>{name || "Your name"}</h3><p className="artifact-role">{role || "Your discipline"}</p><div className="artifact-divider" /><strong>{builderTitle || "Your builder title"}</strong><p className="artifact-location"><MapPin size={14} /> {location || "Goa, India"}</p><span className="artifact-handle">{handle || "@yourhandle"}</span></div></div><div className="artifact-bottom"><span><Waves size={14} /> LESS NOISE. MORE SIGNAL.</span><span>HHG / 2026</span></div>
              </div><div className="artifact-actions"><button className="primary-action" onClick={downloadPng}><Download size={16} /> Download {activeFormat.title}</button><button className="secondary-action" onClick={shareOnX}><X size={16} /> Share on X</button></div><div className="share-row"><span>SHARE TO</span><button onClick={shareOnX} aria-label="Share on X"><X size={15} /></button><button onClick={shareToInstagram} aria-label="Share on Instagram"><Instagram size={15} /></button><button onClick={shareToLinkedIn} aria-label="Share on LinkedIn"><Linkedin size={15} /></button><button onClick={copyShareLink} aria-label="Copy link"><Copy size={15} /></button></div></div>
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery-strip"><div><span className="section-kicker">02 / The frequency</span><h2>Every builder has<br /><i>a different light.</i></h2></div><div className="gallery-copy"><p>Save a card, swap a palette, and show up with a signal that feels like you. The best ideas rarely arrive in the same shape.</p><button onClick={() => toast.info("Gallery opens when the first 250 builders start sharing.")}>See the builder wall <ExternalLink size={15} /></button></div><div className="color-bars"><span /><span /><span /><span /><span /></div></section>
        <section id="about" className="about-strip"><div><span className="section-kicker">03 / Why this exists</span><h2>Less noise.<br /><i>More signal.</i></h2></div><p>Hacker House Goa is a four-day collision of ambitious builders, generous strangers, and ideas that refuse to stay small. This little studio is your first artifact from the room.</p><div className="about-stat"><strong>247</strong><span>builders<br />one signal</span></div></section>
      </main>
      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><img src={LOGO} alt="" /></span><span className="brand-words"><strong>HACKER HOUSE</strong><em>गोवा</em></span></a><div className="footer-mid"><span>BUILT FOR THE BOLD · 2026</span><span>BUILT ON <b>SOLANA</b></span></div><span className="footer-copy">© Hacker House Goa<br />All rights reserved.</span></footer>
    </div>
  );
}
