"use client";

import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  LayoutTemplate,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Moon,
  Play,
  Search,
  Sparkles,
  Sun,
  Video,
  Workflow,
  X,
  Zap,
} from "lucide-react";

type Lang = "en" | "es";
type Theme = "dark" | "light";

type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  accent: "blue" | "pink";
  projects: string[];
};

type Copy = {
  nav: {
    aria: string;
    home: string;
    services: string;
    work: string;
    contact: string;
    diagnosis: string;
    openMenu: string;
    closeMenu: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    badge: string;
    title: React.ReactNode;
    text: string;
    work: string;
    system: string;
    visualAria: string;
    video: string;
    variations: string;
  };
  proof: Array<[string, string]>;
  blocks: {
    eyebrow: string;
    title: string;
    text: string;
    items: string[];
    connected: string;
  };
  services: {
    eyebrow: string;
    title: React.ReactNode;
    text: string;
    selected: string;
    items: Service[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    all: string;
    items: Array<[string, string, string]>;
  };
  cta: {
    title: string;
    text: string;
    button: string;
  };
  contact: {
    eyebrow: string;
    title: React.ReactNode;
    text: string;
    email: string;
    whatsapp: string;
    response: string;
    fields: {
      name: string;
      company: string;
      whatsapp: string;
      web: string;
      business: string;
      services: string;
      multi: string;
      message: string;
      submit: string;
      idle: string;
      sent: string;
    };
    placeholders: {
      name: string;
      company: string;
      whatsapp: string;
      web: string;
      business: string;
      message: string;
    };
    serviceOptions: string[];
  };
  footer: string;
};

const EN_SERVICES: Service[] = [
  {
    number: "01",
    title: "AI content creation",
    description:
      "On-brand product imagery, lifestyle visuals, and ad creatives generated at scale in days, not weeks.",
    tags: ["Product images", "Lifestyle", "Reels", "Ad creatives"],
    icon: Sparkles,
    accent: "blue",
    projects: ["Skincare: hero set", "Sneakers: static carousel", "Apparel: lifestyle pack"],
  },
  {
    number: "02",
    title: "Video and creative production",
    description:
      "Native eCommerce video: product spots, ads, and social content built for the feed and the funnel.",
    tags: ["Product", "Spots", "Ads", "Social"],
    icon: Video,
    accent: "pink",
    projects: ["Coffee brand: :30 spot", "Home goods: reels x6", "DTC: product demo"],
  },
  {
    number: "03",
    title: "Content automation",
    description:
      "AI workflows that turn one asset into hundreds of variations by channel, audience, and campaign.",
    tags: ["AI workflows", "Variations", "Prompts", "Scale"],
    icon: Workflow,
    accent: "blue",
    projects: ["12 variations / hour", "Prompt pipeline", "Asset repurposing"],
  },
  {
    number: "04",
    title: "Paid media",
    description:
      "A trafficker-led Meta and Google setup built around your content, funnel, and numbers.",
    tags: ["Trafficker", "Meta Ads", "Google Ads", "Reports"],
    icon: Megaphone,
    accent: "pink",
    projects: ["Meta ads sprint", "Google Search setup", "Weekly reporting"],
  },
  {
    number: "05",
    title: "Landing pages",
    description:
      "High-converting pages with copy, design, and tracking ready to plug into your campaigns.",
    tags: ["Design", "Copy", "Forms", "CRO"],
    icon: LayoutTemplate,
    accent: "blue",
    projects: ["DTC supplement LP", "Lead capture page", "Tracking funnel"],
  },
  {
    number: "06",
    title: "Digital strategy",
    description:
      "Roadmap, ICP, and perceived value: the strategic base that gives direction to content, media, and product.",
    tags: ["Benchmarking", "ICP", "Perceived value", "User personas"],
    icon: Search,
    accent: "pink",
    projects: ["Competitive map", "3 user personas + ICP", "Perceived value matrix"],
  },
];

const ES_SERVICES: Service[] = [
  {
    number: "01",
    title: "Creación de contenido con IA",
    description:
      "Imágenes de producto, lifestyle y creatividades on-brand a escala, en días, no semanas.",
    tags: ["Imágenes de producto", "Lifestyle", "Reels", "Ad creatives"],
    icon: Sparkles,
    accent: "blue",
    projects: ["Skincare: set hero", "Tenis: carrusel estático", "Apparel: pack lifestyle"],
  },
  {
    number: "02",
    title: "Producción audiovisual",
    description:
      "Video nativo eCom: spots de producto, ads y contenido social hechos para el feed y el funnel.",
    tags: ["Producto", "Spots", "Ads", "Social"],
    icon: Video,
    accent: "pink",
    projects: ["Marca de café: spot :30", "Hogar: reels x6", "DTC: demo de producto"],
  },
  {
    number: "03",
    title: "Automatización de contenido",
    description:
      "Flujos con IA que convierten un asset en cientos de variaciones por canal, audiencia y campaña.",
    tags: ["Flujos IA", "Variaciones", "Prompts", "Escala"],
    icon: Workflow,
    accent: "blue",
    projects: ["12 variaciones / hora", "Pipeline de prompts", "Reutilización de assets"],
  },
  {
    number: "04",
    title: "Pauta digital",
    description:
      "Setup liderado por trafficker para Meta y Google alrededor de tu contenido, tu funnel y tus números.",
    tags: ["Trafficker", "Meta Ads", "Google Ads", "Reportes"],
    icon: Megaphone,
    accent: "pink",
    projects: ["Sprint de Meta Ads", "Setup Google Search", "Reporte semanal"],
  },
  {
    number: "05",
    title: "Landing pages",
    description:
      "Páginas de alta conversión con copy, diseño y tracking listas para conectarse con tus campañas.",
    tags: ["Diseño", "Copy", "Forms", "CRO"],
    icon: LayoutTemplate,
    accent: "blue",
    projects: ["Suplemento DTC: LP", "Página de captura", "Tracking funnel"],
  },
  {
    number: "06",
    title: "Estrategia digital",
    description:
      "Hoja de ruta, ICP y valor percibido: la base estratégica que da dirección a contenido, pauta y producto.",
    tags: ["Benchmarking", "ICP", "Valor percibido", "User personas"],
    icon: Search,
    accent: "pink",
    projects: ["Mapa competitivo", "3 user personas + ICP", "Matriz de valor percibido"],
  },
];

const COPY: Record<Lang, Copy> = {
  en: {
    nav: {
      aria: "Primary navigation",
      home: "Home",
      services: "Services",
      work: "Work",
      contact: "Contact",
      diagnosis: "Diagnosis",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      themeLight: "Switch to light theme",
      themeDark: "Switch to dark theme",
    },
    hero: {
      badge: "[CORE_REEL_24]",
      title: <>Content, automation and <em>AI-powered ads</em>.</>,
      text: "Systems to produce content, run campaigns, and generate sales at scale with less friction.",
      work: "View work",
      system: "View system",
      visualAria: "Pagurai visual system",
      video: "VIDEO · :15",
      variations: "variations / hour",
    },
    proof: [
      ["STUDIO", "PAGURAI CREATIVE"],
      ["FOCUS", "AI VISUAL SYSTEMS"],
      ["BASE", "MIAMI, FL"],
      ["AVAILABLE", "WORLDWIDE"],
    ],
    blocks: {
      eyebrow: "WHAT WE DO · 7 BLOCKS",
      title: "A toolkit, not a service menu.",
      text: "Each block works on its own, but together they form a content + sales system.",
      items: [
        "AI content creation",
        "Video production",
        "Content automation",
        "Meta Ads",
        "Google Ads",
        "Trafficker",
        "Landing pages",
      ],
      connected: "Connected as one system",
    },
    services: {
      eyebrow: "SERVICES · 6 PILLARS",
      title: <>Six blocks. <em>One system.</em></>,
      text: "Each pillar works on its own, but they are designed to connect into a content + ads engine for your store.",
      selected: "Selected projects",
      items: EN_SERVICES,
    },
    portfolio: {
      eyebrow: "PORTFOLIO · SELECTED WORK",
      title: "Mixed media, visual systems, and campaign-ready assets.",
      all: "View all",
      items: [
        ["Skincare: Hero set", "AI Image", "large"],
        ["Coffee brand: :30 spot", "Video Ad", "wide"],
        ["Sneakers: static carousel", "Creative", "small"],
        ["DTC supplement: LP", "Landing", "small"],
        ["Workflow: 12 variations / hour", "Automation", "wide"],
        ["Apparel: lifestyle pack", "AI Image", "small"],
        ["Home goods: Reels x6", "Short video", "small"],
      ],
    },
    cta: {
      title: "Turn your content into a scalable sales system.",
      text: "Free diagnosis · 20 minutes · no commitment",
      button: "Get started",
    },
    contact: {
      eyebrow: "CONTACT · LEAD CAPTURE",
      title: <>Tell us what you sell. <em>We build the system.</em></>,
      text: "Send us a short brief and we will return a free 20-minute diagnosis: what is missing, what to automate, and what to test first.",
      email: "hello@pagurai.com",
      whatsapp: "WhatsApp: +57 ··· ··· ····",
      response: "Typical reply within ~24h, business days",
      fields: {
        name: "Name",
        company: "Company",
        whatsapp: "WhatsApp",
        web: "Website / Instagram",
        business: "Type of business",
        services: "Service needed",
        multi: "(multi-select)",
        message: "Message",
        submit: "Request diagnosis",
        idle: "No spam. Ever.",
        sent: "Brief received. We will contact you soon.",
      },
      placeholders: {
        name: "Your name",
        company: "Your brand name",
        whatsapp: "+57 ··· ··· ····",
        web: "pagurai.com · @brand",
        business: "Skincare DTC, specialty coffee, etc.",
        message: "Tell us what you need...",
      },
      serviceOptions: ["AI Content", "Video", "Meta Ads", "Google Ads", "Landing page", "Full system"],
    },
    footer: "HERO → SERVICES → PORTFOLIO → CONTACT",
  },
  es: {
    nav: {
      aria: "Navegación principal",
      home: "Inicio",
      services: "Servicios",
      work: "Trabajo",
      contact: "Contacto",
      diagnosis: "Diagnóstico",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      themeLight: "Cambiar a tema claro",
      themeDark: "Cambiar a tema oscuro",
    },
    hero: {
      badge: "[CORE_REEL_24]",
      title: <>Contenido, automatización y <em>pauta con IA</em>.</>,
      text: "Sistemas para producir contenido, correr campañas y generar ventas a escala, con menos fricción.",
      work: "Ver trabajo",
      system: "Ver sistema",
      visualAria: "Sistema visual Pagurai",
      video: "VIDEO · :15",
      variations: "variaciones / hora",
    },
    proof: [
      ["STUDIO", "PAGURAI CREATIVE"],
      ["FOCUS", "AI VISUAL SYSTEMS"],
      ["BASE", "MIAMI, FL"],
      ["AVAILABLE", "WORLDWIDE"],
    ],
    blocks: {
      eyebrow: "QUÉ HACEMOS · 7 BLOQUES",
      title: "Una caja de herramientas, no un menú de servicios.",
      text: "Cada bloque vive solo, pero juntos forman un sistema de contenido + ventas.",
      items: [
        "Creación de contenido con IA",
        "Producción audiovisual",
        "Automatización de contenido",
        "Meta Ads",
        "Google Ads",
        "Trafficker",
        "Landing pages",
      ],
      connected: "Conectados como un solo sistema",
    },
    services: {
      eyebrow: "SERVICIOS · 6 PILARES",
      title: <>Seis bloques. <em>Un sistema.</em></>,
      text: "Cada pilar funciona por sí solo, pero están pensados para conectarse en un motor de contenido + pauta para tu tienda.",
      selected: "Proyectos seleccionados",
      items: ES_SERVICES,
    },
    portfolio: {
      eyebrow: "PORTAFOLIO · TRABAJOS SELECCIONADOS",
      title: "Mixed media, sistemas visuales y piezas listas para campaña.",
      all: "Ver todos",
      items: [
        ["Skincare: Hero set", "Imagen IA", "large"],
        ["Marca de café: spot :30", "Video Ad", "wide"],
        ["Tenis: carrusel estático", "Creatividad", "small"],
        ["Suplemento DTC: LP", "Landing", "small"],
        ["Workflow: 12 variaciones / hora", "Automatización", "wide"],
        ["Apparel: pack lifestyle", "Imagen IA", "small"],
        ["Hogar: Reels x6", "Video corto", "small"],
      ],
    },
    cta: {
      title: "Convierte tu contenido en un sistema de ventas escalable.",
      text: "Diagnóstico gratis · 20 minutos · sin compromiso",
      button: "Empezar",
    },
    contact: {
      eyebrow: "CONTACTO · CAPTURA DE LEAD",
      title: <>Cuéntanos qué vendes. <em>Nosotros armamos el sistema.</em></>,
      text: "Envíanos un brief corto y te devolvemos un diagnóstico gratis de 20 min: qué falta, qué automatizar y qué probar primero.",
      email: "hello@pagurai.com",
      whatsapp: "WhatsApp: +57 ··· ··· ····",
      response: "Respuesta habitual en ~24h, días hábiles",
      fields: {
        name: "Nombre",
        company: "Empresa",
        whatsapp: "WhatsApp",
        web: "Sitio web / Instagram",
        business: "Tipo de negocio",
        services: "Servicio que necesitas",
        multi: "(multi-selección)",
        message: "Mensaje",
        submit: "Solicitar diagnóstico",
        idle: "Sin spam. Nunca.",
        sent: "Brief recibido. Te contactaremos pronto.",
      },
      placeholders: {
        name: "Tu nombre",
        company: "Nombre de tu marca",
        whatsapp: "+57 ··· ··· ····",
        web: "pagurai.com · @marca",
        business: "Skincare DTC, café especialidad, etc.",
        message: "Cuéntanos qué necesitas...",
      },
      serviceOptions: ["Contenido con IA", "Video", "Meta Ads", "Google Ads", "Landing page", "Sistema completo"],
    },
    footer: "HERO → SERVICIOS → PORTAFOLIO → CONTACTO",
  },
};

function moveGlow(e: ReactPointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  e.currentTarget.style.setProperty("--px", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--py", `${e.clientY - rect.top}px`);
}

function DotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let time = 0;
    let dots: Array<{ x: number; y: number; seed: number; delay: number }> = [];
    let accentColor = [0, 152, 255];

    const hash = (x: number, y: number) =>
      ((Math.sin(x * 127.1 + y * 311.7) * 43758.5453123) % 1 + 1) % 1;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const accentString =
        getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() ||
        "0, 152, 255";
      accentColor = accentString.split(",").map((value) => Number(value.trim()));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const grid = 20;
      const cols = Math.ceil(width / grid) + 1;
      const rows = Math.ceil(height / grid) + 1;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          dots.push({
            x: c * grid + grid / 2,
            y: r * grid + grid / 2,
            seed: hash(c, r),
            delay: hash(c + 0.5, r + 0.5),
          });
        }
      }
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const cx = width / 2;
      const cy = height / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy) || 1;

      dots.forEach((dot) => {
        const flicker = Math.sin(time * 3.5 + dot.seed * 50) * 0.5 + 0.5;
        const phase = Math.sin(time * 1.5 + dot.delay * 12) * 0.5 + 0.5;
        const blink = Math.sin(time * 1.8 + dot.seed * 100 + dot.delay * 60);
        const blinkOn = blink > (dot.seed > 0.7 ? -0.4 : 0.1) ? 1 : 0;
        const dist = Math.sqrt((dot.x - cx) ** 2 + (dot.y - cy) ** 2);
        const reveal = Math.max(0, Math.min(1, time * 1.2 - (dist / maxDist) * 3));
        let baseOpacity;

        if (dot.seed > 0.85) {
          baseOpacity = (0.46 + flicker * 0.34) * blinkOn;
        } else if (dot.seed > 0.6) {
          baseOpacity = (0.22 + phase * 0.18) * blinkOn;
        } else {
          baseOpacity = (0.07 + flicker * 0.08) * blinkOn;
        }

        const opacity = baseOpacity * reveal;
        if (opacity < 0.01) return;

        const rgb = dot.seed > 0.92 ? accentColor.join(",") : "255,255,255";
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="vw-dot-bg" aria-hidden="true">
      <canvas id="matrix-canvas" ref={canvasRef} />
      <div className="vw-dot-fade" />
    </div>
  );
}

function useCardGlow() {
  useEffect(() => {
    const selectors = [
      ".glow-card",
      ".service-row",
      ".portfolio-card",
      ".contact-cards div",
      ".lead-form",
      ".hero-visual",
      ".proof-strip div",
    ].join(",");

    const updateGlow = (event: PointerEvent) => {
      document.querySelectorAll<HTMLElement>(selectors).forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", updateGlow);
    return () => document.removeEventListener("pointermove", updateGlow);
  }, []);
}

function Button({
  children,
  href = "#contacto",
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <a className={`site-btn ${variant}`} href={href} onPointerMove={moveGlow}>
      <span className="btn-glow" aria-hidden="true" />
      <span className="btn-content">{children}</span>
    </a>
  );
}

export default function PaguraiLanding() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openService, setOpenService] = useState(0);
  const [selected, setSelected] = useState([0, 2]);
  const [sent, setSent] = useState(false);

  const copy = COPY[lang];
  useCardGlow();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLanguage = (nextLang: Lang) => {
    setLang(nextLang);
    setSent(false);
  };

  const toggleService = (serviceIndex: number) => {
    setSelected((current) =>
      current.includes(serviceIndex)
        ? current.filter((item) => item !== serviceIndex)
        : [...current, serviceIndex],
    );
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className={`app-shell theme-${theme}`}>
      <DotMatrix />
      <div className="bg-cover" aria-hidden="true" />
      <div className="bg-glows" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <header className="site-header">
        <nav className="cyber-nav" aria-label={copy.nav.aria} onPointerMove={moveGlow}>
          <a className="brand-mark" href="#inicio" aria-label="Pagurai home">
            <Image
              src={
                theme === "dark"
                  ? "/assets/images/logo/logo-pagurai-dark.png"
                  : "/assets/images/logo/logo-pagurai-light.png"
              }
              alt=""
              width={180}
              height={54}
              priority
            />
            <span>Pagurai</span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#inicio" onClick={() => setMenuOpen(false)}>{copy.nav.home}</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>{copy.nav.services}</a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>{copy.nav.work}</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>{copy.nav.contact}</a>
          </div>

          <div className="nav-controls" aria-label="Language and theme controls">
            <div className="language-toggle" aria-label="Language selector">
              <button className={lang === "en" ? "active" : ""} type="button" onClick={() => changeLanguage("en")}>
                EN
              </button>
              <button className={lang === "es" ? "active" : ""} type="button" onClick={() => changeLanguage("es")}>
                ES
              </button>
            </div>

            <button
              className="theme-toggle"
              type="button"
              aria-label={theme === "dark" ? copy.nav.themeLight : copy.nav.themeDark}
              onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <Button href="#contacto" variant="secondary">
            {copy.nav.diagnosis} <ArrowRight size={16} />
          </Button>

          <button
            className="menu-btn"
            type="button"
            aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-copy">
            <span className="section-badge">{copy.hero.badge}</span>
            <h1>{copy.hero.title}</h1>
            <p>{copy.hero.text}</p>
            <div className="hero-actions">
              <Button href="#portfolio">
                {copy.hero.work} <ArrowRight size={18} />
              </Button>
              <Button href="#servicios" variant="ghost">
                <Play size={17} /> {copy.hero.system}
              </Button>
            </div>
          </div>

          <aside className="hero-visual" aria-label={copy.hero.visualAria}>
            <div className="visual-toolbar">
              <span />
              <span />
              <span />
              <strong>AI VISUAL SYSTEMS</strong>
            </div>
            <div className="visual-stage">
              <div className="reel-card main-reel">
                <span>{copy.hero.video}</span>
                <div className="play-node"><Play size={24} fill="currentColor" /></div>
              </div>
              <div className="metric-card">
                <BarChart3 size={20} />
                <strong>ROAS</strong>
                <span>90d sprint</span>
              </div>
              <div className="metric-card pink">
                <Zap size={20} />
                <strong>12x</strong>
                <span>{copy.hero.variations}</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Pagurai facts">
          {copy.proof.map(([k, v]) => (
            <div key={k}>
              <span>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </section>

        <section className="section-block" id="servicios">
          <div className="section-head">
            <div>
              <span className="eyebrow">{copy.blocks.eyebrow}</span>
              <h2>{copy.blocks.title}</h2>
            </div>
            <p>{copy.blocks.text}</p>
          </div>

          <div className="block-grid">
            {copy.blocks.items.map((block, index) => (
              <article className={`glow-card mini ${index === 0 ? "featured" : ""}`} key={block} onPointerMove={moveGlow}>
                <span className="card-num">{String(index + 1).padStart(2, "0")}</span>
                <CheckCircle2 size={22} />
                <h3>{block}</h3>
              </article>
            ))}
            <article className="glow-card mini outline" onPointerMove={moveGlow}>
              <span className="card-num">+</span>
              <Workflow size={22} />
              <h3>{copy.blocks.connected}</h3>
            </article>
          </div>
        </section>

        <section className="section-block service-system">
          <div className="section-head">
            <div>
              <span className="eyebrow blue">{copy.services.eyebrow}</span>
              <h2>{copy.services.title}</h2>
            </div>
            <p>{copy.services.text}</p>
          </div>

          <div className="service-list">
            {copy.services.items.map((service, index) => {
              const Icon = service.icon;
              const isOpen = openService === index;
              return (
                <article
                  className={`service-row ${service.accent} ${isOpen ? "open" : ""}`}
                  key={service.title}
                >
                  <button type="button" onClick={() => setOpenService(isOpen ? -1 : index)}>
                    <span className="service-number">{service.number}</span>
                    <span className="service-icon"><Icon size={24} /></span>
                    <span className="service-main">
                      <strong>{service.title}</strong>
                      <small>{service.description}</small>
                    </span>
                    <span className="service-tags">
                      {service.tags.map((tag) => <em key={tag}>{tag}</em>)}
                    </span>
                    <span className="service-plus">{isOpen ? "-" : "+"}</span>
                  </button>

                  <div className="service-panel">
                    <div className="panel-copy">
                      <span>{copy.services.selected}</span>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <div className="project-stack">
                      {service.projects.map((project) => (
                        <div key={project}>
                          <CheckCircle2 size={16} />
                          <span>{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section-block" id="portfolio">
          <div className="section-head">
            <div>
              <span className="eyebrow">{copy.portfolio.eyebrow}</span>
              <h2>{copy.portfolio.title}</h2>
            </div>
            <Button href="#contacto" variant="secondary">
              {copy.portfolio.all} <ArrowRight size={16} />
            </Button>
          </div>

          <div className="portfolio-grid">
            {copy.portfolio.items.map(([title, tag, size], index) => (
              <article className={`portfolio-card ${size}`} key={title} onPointerMove={moveGlow}>
                <div className="portfolio-media">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <strong>{title}</strong>
                  <em>{tag}</em>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <div>
            <h2>{copy.cta.title}</h2>
            <p>{copy.cta.text}</p>
          </div>
          <Button href="#contacto">
            {copy.cta.button} <ArrowRight size={18} />
          </Button>
        </section>

        <section className="contact-section" id="contacto">
          <div className="contact-copy">
            <span className="eyebrow">{copy.contact.eyebrow}</span>
            <h2>{copy.contact.title}</h2>
            <p>{copy.contact.text}</p>

            <div className="contact-cards">
              <div><Mail size={20} /><span>{copy.contact.email}</span></div>
              <div><MessageCircle size={20} /><span>{copy.contact.whatsapp}</span></div>
              <div><Clock3 size={20} /><span>{copy.contact.response}</span></div>
            </div>
          </div>

          <form className="lead-form" onSubmit={submitForm}>
            <label>
              {copy.contact.fields.name} <span>*</span>
              <input required type="text" placeholder={copy.contact.placeholders.name} />
            </label>
            <label>
              {copy.contact.fields.company} <span>*</span>
              <input required type="text" placeholder={copy.contact.placeholders.company} />
            </label>
            <label>
              {copy.contact.fields.whatsapp} <span>*</span>
              <input required type="tel" placeholder={copy.contact.placeholders.whatsapp} />
            </label>
            <label>
              {copy.contact.fields.web}
              <input type="text" placeholder={copy.contact.placeholders.web} />
            </label>
            <label className="full">
              {copy.contact.fields.business}
              <input type="text" placeholder={copy.contact.placeholders.business} />
            </label>

            <div className="form-services full">
              <span>{copy.contact.fields.services} <small>{copy.contact.fields.multi}</small></span>
              <div>
                {copy.contact.serviceOptions.map((item, index) => (
                  <button
                    className={selected.includes(index) ? "selected" : ""}
                    key={item}
                    type="button"
                    onClick={() => toggleService(index)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <label className="full">
              {copy.contact.fields.message}
              <textarea placeholder={copy.contact.placeholders.message} />
            </label>

            <div className="form-foot full">
              <small>{sent ? copy.contact.fields.sent : copy.contact.fields.idle}</small>
              <button className="submit-btn" type="submit">
                {copy.contact.fields.submit} <ArrowRight size={17} />
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <span>PAGURAI © 2026</span>
        <span>{copy.footer}</span>
      </footer>
    </div>
  );
}
