"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Play, X, ChevronLeft, ChevronRight, Sparkles, ExternalLink } from "lucide-react";
import { ES_SERVICES, EN_SERVICES } from "@/components/servicesData";
import { DotMatrix, moveGlow } from "@/components/PaguraiLanding";

type Lang = "en" | "es";

export default function ServiceProjectsPage() {
  const params = useParams();
  const [lang, setLang] = useState<Lang>("es");
  const [mounted, setMounted] = useState(false);
  const [activeLightboxVideo, setActiveLightboxVideo] = useState<string | null>(null);
  const [activeLightboxImages, setActiveLightboxImages] = useState<string[] | null>(null);
  const [activeLightboxImageIndex, setActiveLightboxImageIndex] = useState<number>(0);
  const [activeLightboxHtml, setActiveLightboxHtml] = useState<{ url: string; title: string; company: string } | null>(null);

  // Drag-to-slide interactive state for mockups
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);
  const [isDraggingState, setIsDraggingState] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect language from HTML lang attribute set by parent, or default to Spanish
    const htmlLang = document.documentElement.lang;
    if (htmlLang === "en" || htmlLang === "es") {
      setLang(htmlLang as Lang);
    }
  }, []);

  // Control dynamic body overflow locking when lightbox is active
  useEffect(() => {
    if (activeLightboxVideo !== null || activeLightboxImages !== null || activeLightboxHtml !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLightboxVideo, activeLightboxImages, activeLightboxHtml]);

  // Support ESC key and Arrow keys close/navigate action
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightboxVideo(null);
        setActiveLightboxImages(null);
        setActiveLightboxHtml(null);
      } else if (e.key === "ArrowLeft" && activeLightboxImages) {
        setActiveLightboxImageIndex((prev) => (prev > 0 ? prev - 1 : activeLightboxImages.length - 1));
      } else if (e.key === "ArrowRight" && activeLightboxImages) {
        setActiveLightboxImageIndex((prev) => (prev < activeLightboxImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxImages]);

  // Reset scroll to top when opening or switching mockup images (no autoscroll)
  useEffect(() => {
    if (activeLightboxImages !== null) {
      const container = document.getElementById("react-lightbox-active-img-wrapper");
      if (container) {
        container.scrollTop = 0;
      }
    }
  }, [activeLightboxImages, activeLightboxImageIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      if (e.button !== 0) return;
      const container = e.currentTarget;
      isDraggingRef.current = true;
      dragStartYRef.current = e.clientY;
      dragStartScrollTopRef.current = container.scrollTop;
      setIsDraggingState(true);
      try {
        container.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - dragStartYRef.current;
    e.currentTarget.scrollTop = dragStartScrollTopRef.current - deltaY;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDraggingState(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  if (!mounted) return null;

  const idStr = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "0";
  const serviceIndex = parseInt(idStr, 10);
  const services = lang === "es" ? ES_SERVICES : EN_SERVICES;
  const service = services[serviceIndex] || services[0];

  const labels = {
    es: {
      back: "Volver al inicio",
      titleSuffix: "Proyectos Realizados",
      descEyebrow: "Detalles del servicio",
      projectEyebrow: "Casos de éxito",
      viewProject: "Ver resultados",
      metaTitle: "Casos de estudio y proyectos construidos.",
      closeVideo: "Cerrar video",
    },
    en: {
      back: "Back to home",
      titleSuffix: "Completed Projects",
      descEyebrow: "Service details",
      projectEyebrow: "Success cases",
      viewProject: "View results",
      metaTitle: "Case studies and built projects.",
      closeVideo: "Close video",
    },
  }[lang];

  return (
    <div className="app-shell theme-dark" style={{ minHeight: "100vh" }}>
      <DotMatrix />
      <div className="bg-cover" aria-hidden="true" />
      <div className="bg-glows" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <header className="site-header" style={{ position: "relative", pointerEvents: "auto" }}>
        <div className="cyber-nav" style={{ justifyContent: "flex-start", gap: "24px" }} onPointerMove={moveGlow}>
          <Link href="/#servicios" className="site-btn secondary" style={{ minHeight: "36px", padding: "8px 16px" }}>
            <span className="btn-glow" aria-hidden="true" />
            <span className="btn-content" style={{ fontSize: "12px", gap: "6px" }}>
              <ArrowLeft size={14} /> {labels.back}
            </span>
          </Link>
          <div className="brand-mark">
            <span style={{ position: "static", width: "auto", height: "auto", overflow: "visible", clip: "auto", color: "var(--ink-muted)", fontSize: "14px", letterSpacing: "0.1em" }}>
              PAGURAI / {service.title.toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      <main style={{ padding: "40px 0 96px" }}>
        <section className="section-block" style={{ padding: 0 }}>
          <div className="section-head" style={{ gridTemplateColumns: "1fr", gap: "16px", marginBottom: "48px" }}>
            <div>
              <span className="eyebrow blue">{labels.descEyebrow}</span>
              <h1 style={{ 
                margin: "12px 0 0",
                fontFamily: "var(--font-display), sans-serif",
                fontStyle: "italic",
                fontWeight: 700,
                textTransform: "uppercase",
                lineHeight: "0.95",
                fontSize: "clamp(38px, 5.5vw, 68px)",
                color: "#fff"
              }}>
                {service.title}
              </h1>
            </div>
            <p style={{ maxWidth: "720px", fontSize: "18px", color: "var(--ink-soft)", margin: 0 }}>
              {service.description}
            </p>
            {((serviceIndex === 0 || serviceIndex === 1 || serviceIndex === 2) || serviceIndex === 4 || serviceIndex === 5 || serviceIndex === 6 || serviceIndex === 7) && (
              <div style={{ marginTop: "20px" }}>
                <span className="eyebrow" style={{ fontSize: "11px", color: "var(--ink-muted)", letterSpacing: "0.1em" }}>
                  {lang === "es" ? "HERRAMIENTAS USADAS" : "TOOLS USED"}
                </span>
                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "12px", flexWrap: "wrap" }}>
                  {(serviceIndex === 5 || serviceIndex === 6) ? (
                    <>
                      <img src="/assets/images/projects/Logo Claude.webp" alt="Claude" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Texto (1).webp" alt="React" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Logo Antigravity.webp" alt="Antigravity" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Logo Github.webp" alt="Github" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Logo GoHighLevel.webp" alt="GoHighLevel" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Hubspot(2).webp" alt="Hubspot" style={{ height: "38px", width: "auto" }} />
                    </>
                  ) : serviceIndex === 7 ? (
                    <>
                      <img src="/assets/images/projects/Hubspot(2).webp" alt="Hubspot" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Logo GoHighLevel.webp" alt="GoHighLevel" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/N8N.webp" alt="N8N" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Zapier.webp" alt="Zapier" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Codex.webp" alt="Codex" style={{ height: "38px", width: "auto" }} />
                    </>
                  ) : serviceIndex === 4 ? (
                    <>
                      <img src="/assets/images/projects/Logo (Meta).webp" alt="Meta" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Logo (Google).webp" alt="Google" style={{ height: "38px", width: "auto" }} />
                    </>
                  ) : (
                    <>
                      <img src="/assets/images/projects/Texto.webp" alt="Tool" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Texto (1).webp" alt="Tool" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Texto (2).webp" alt="Tool" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Texto (3).webp" alt="Tool" style={{ height: "38px", width: "auto" }} />
                      <img src="/assets/images/projects/Texto (4).webp" alt="Tool" style={{ height: "38px", width: "auto" }} />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "28px" }}>
            <span className="eyebrow">{service.cardTitle || labels.projectEyebrow}</span>
          </div>

          {/* 2 cuadros de proyectos */}
          <div className="projects-grid">
            {service.projectsDetail.map((project) => {
              const handleCardClick = () => {
                if (project.video) {
                  setActiveLightboxVideo(project.video);
                } else if (project.html) {
                  setActiveLightboxHtml({ url: project.html, title: project.title, company: project.company });
                } else if (project.images) {
                  setActiveLightboxImages(project.images);
                  setActiveLightboxImageIndex(0);
                } else {
                  setActiveLightboxImages([project.image]);
                  setActiveLightboxImageIndex(0);
                }
              };

              return (
                <article
                  className={`project-card ${service.accent === "pink" ? "connected-card" : ""}`}
                  key={project.title}
                  onPointerMove={moveGlow}
                  onClick={handleCardClick}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", height: "100%", width: "100%" }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                      <span style={{
                        color: service.accent === "pink" ? "var(--pink-neon)" : "var(--accent-color)",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                        fontSize: "13px"
                      }}>
                        {project.company.toUpperCase()}
                      </span>
                      <CheckCircle2 size={18} style={{ color: service.accent === "pink" ? "var(--pink-neon)" : "var(--accent-color)" }} />
                    </div>

                    {/* Text above image */}
                    <div>
                      <h3 style={{
                        fontSize: "21px",
                        color: "#fff",
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        margin: 0,
                        textTransform: "uppercase",
                        lineHeight: "1.1"
                      }}>
                        {project.title}
                      </h3>
                      <p style={{ marginTop: "8px", color: "var(--ink-soft)", fontSize: "13.5px", lineHeight: "1.5" }}>
                        {project.description}
                      </p>
                    </div>

                    {/* Image Wrapper */}
                    <div style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: project.aspectRatio || "16 / 9",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid var(--line)",
                      marginTop: "16px",
                      background: "rgba(0, 0, 0, 0.2)"
                    }}>
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: project.aspectRatio ? "contain" : "cover" }}
                        priority
                      />
                    </div>

                    {/* Button */}
                    <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                      <button
                        type="button"
                        className="site-btn secondary"
                        style={{ padding: "8px 18px", fontSize: "11px", minHeight: "36px", width: "100%", display: "flex", justifyContent: "center" }}
                        onPointerMove={moveGlow}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick();
                        }}
                      >
                        <span className="btn-glow" aria-hidden="true" />
                        <span className="btn-content">
                          {labels.viewProject}
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer" style={{ marginTop: "40px" }}>
        <span>PAGURAI © 2026</span>
        <span>{labels.metaTitle}</span>
      </footer>

      {/* Fullscreen Video Lightbox Overlay */}
      {activeLightboxVideo !== null && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 110, background: "rgba(2, 3, 10, 0.94)", cursor: "zoom-out" }}
          onClick={() => setActiveLightboxVideo(null)}
        >
          <button
            type="button"
            className="modal-close-btn"
            style={{ top: "30px", right: "30px", width: "44px", height: "44px" }}
            onClick={() => setActiveLightboxVideo(null)}
            aria-label={labels.closeVideo}
          >
            <X size={24} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              width: activeLightboxVideo.includes("1_1") || activeLightboxVideo.includes("Colombiana") ? "min(500px, calc(100vw - 40px))" : "min(1180px, calc(100vw - 40px))", 
              aspectRatio: activeLightboxVideo.includes("1_1") || activeLightboxVideo.includes("Colombiana") ? "1 / 1" : "16 / 9", 
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.85)",
              margin: "auto"
            }}
          >
            <video
              src={activeLightboxVideo}
              autoPlay
              controls
              playsInline
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000" }}
            />
          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox Overlay */}
      {activeLightboxImages !== null && (() => {
        const imgSrc = activeLightboxImages[activeLightboxImageIndex] || "";
        const isMockup = imgSrc.includes("Landing page") || imgSrc.includes("Pagureo") || imgSrc.includes("carro") || imgSrc.includes("Lp") || imgSrc.includes("Marca") || imgSrc.includes("Dashboard") || imgSrc.includes("dashboard");
        const showNav = activeLightboxImages.length > 1;

        return (
          <div 
            className="modal-overlay" 
            style={{ zIndex: 110, background: "rgba(2, 3, 10, 0.94)", cursor: "zoom-out" }}
            onClick={() => setActiveLightboxImages(null)}
          >
            <button
              type="button"
              className="modal-close-btn"
              style={{ top: "30px", right: "30px", width: "44px", height: "44px" }}
              onClick={() => setActiveLightboxImages(null)}
            >
              <X size={24} />
            </button>

            <div 
              onClick={(e) => e.stopPropagation()} 
              style={{ 
                width: "min(800px, calc(100vw - 40px))", 
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 24px 80px rgba(0, 0, 0, 0.85)",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                background: "#080912",
                cursor: "default"
              }}
            >
              {/* Active Image Container */}
              <div 
                id="react-lightbox-active-img-wrapper" 
                className="active-image-container"
                onPointerDown={isMockup ? handlePointerDown : undefined}
                onPointerMove={isMockup ? handlePointerMove : undefined}
                onPointerUp={isMockup ? handlePointerUp : undefined}
                onPointerCancel={isMockup ? handlePointerUp : undefined}
                style={{ 
                  width: "100%", 
                  aspectRatio: "4 / 3", 
                  position: "relative", 
                  display: "flex", 
                  flexDirection: isMockup ? "column" : "row",
                  alignItems: isMockup ? "stretch" : "center", 
                  justifyContent: isMockup ? "flex-start" : "center", 
                  background: "#02030a",
                  overflowY: isMockup ? "auto" : "hidden",
                  cursor: isMockup ? (isDraggingState ? "grabbing" : "grab") : "default",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  touchAction: isMockup ? "pan-y" : "auto"
                }}
              >
                {isMockup && (
                  <div 
                    style={{
                      position: "sticky",
                      top: "14px",
                      alignSelf: "flex-end",
                      marginRight: "14px",
                      marginBottom: "-32px",
                      background: "rgba(8, 9, 18, 0.8)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      borderRadius: "20px",
                      padding: "5px 14px",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "var(--ink-soft)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      pointerEvents: "none",
                      zIndex: 10,
                      letterSpacing: "0.03em",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.5)"
                    }}
                  >
                    <span style={{ color: "var(--accent-color)", fontWeight: "bold" }}>↕</span>
                    <span>{lang === "es" ? "Desliza para explorar" : "Scroll or drag to explore"}</span>
                  </div>
                )}
                <img 
                  src={imgSrc} 
                  alt="Gallery Image" 
                  draggable={false}
                  style={isMockup ? {
                    width: "100%",
                    height: "auto",
                    maxHeight: "none",
                    objectFit: "contain",
                    pointerEvents: "none",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    display: "block"
                  } : {
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                  }}
                />

                {showNav && (
                  <>
                    {/* Prev Button */}
                    <button 
                      onClick={() => setActiveLightboxImageIndex((prev) => (prev > 0 ? prev - 1 : activeLightboxImages.length - 1))}
                      style={{ position: "absolute", left: "16px", width: "44px", height: "44px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.5)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", zIndex: 5 }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {/* Next Button */}
                    <button 
                      onClick={() => setActiveLightboxImageIndex((prev) => (prev < activeLightboxImages.length - 1 ? prev + 1 : 0))}
                      style={{ position: "absolute", right: "16px", width: "44px", height: "44px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.5)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", zIndex: 5 }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {showNav && (
                <>
                  {/* Thumbnails strip */}
                  <div style={{ display: "flex", gap: "10px", padding: "12px 16px", background: "rgba(0, 0, 0, 0.4)", overflowX: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.06)", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    {activeLightboxImages.map((thumbSrc, idx) => {
                      const isActive = idx === activeLightboxImageIndex;
                      return (
                        <div
                          key={thumbSrc}
                          onClick={() => setActiveLightboxImageIndex(idx)}
                          style={{
                            width: "72px",
                            height: "54px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            border: `2.5px solid ${isActive ? "#0098ff" : "rgba(255,255,255,0.12)"}`,
                            transform: isActive ? "scale(1.08)" : "scale(1)",
                            boxShadow: isActive ? "0 0 12px rgba(0, 152, 255, 0.45)" : "none",
                            flexShrink: 0,
                            opacity: isActive ? 1 : 0.62
                          }}
                        >
                          <img src={thumbSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Bullet indicator footer */}
                  <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.06)", fontFamily: "var(--font-body)" }}>
                    <span style={{ color: "var(--ink-soft)", fontSize: "13px" }}>{activeLightboxImageIndex + 1} / {activeLightboxImages.length}</span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {activeLightboxImages.map((_, idx) => (
                        <span 
                          key={idx}
                          onClick={() => setActiveLightboxImageIndex(idx)}
                          style={{ 
                            width: "6px", 
                            height: "6px", 
                            borderRadius: "50%", 
                            display: "inline-block", 
                            cursor: "pointer", 
                            transition: "all 0.2s", 
                            background: idx === activeLightboxImageIndex ? "#0098ff" : "rgba(255,255,255,0.2)" 
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })()}

      {/* Fullscreen HTML Interactive System Lightbox Modal */}
      {activeLightboxHtml !== null && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 110, background: "rgba(2, 3, 10, 0.94)", cursor: "default" }}
          onClick={() => setActiveLightboxHtml(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              width: "min(1360px, calc(100vw - 32px))", 
              height: "min(880px, calc(100vh - 48px))",
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.9)",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              background: "#080912"
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              background: "rgba(18, 18, 26, 0.88)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              zIndex: 2
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent-color)",
                  boxShadow: "0 0 10px var(--accent-color)"
                }} />
                <span style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "0.08em", color: "var(--accent-color)", textTransform: "uppercase" }}>
                  {activeLightboxHtml.company}
                </span>
                <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>·</span>
                <span style={{ fontSize: "13px", color: "#fff", fontWeight: 500, fontFamily: "var(--font-body)" }}>
                  {activeLightboxHtml.title}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <a
                  href={activeLightboxHtml.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-btn secondary"
                  style={{
                    padding: "6px 14px",
                    fontSize: "11px",
                    minHeight: "32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    textDecoration: "none"
                  }}
                  title={lang === "es" ? "Abrir en pantalla completa" : "Open in new tab"}
                >
                  <span className="btn-content" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <ExternalLink size={13} />
                    <span>{lang === "es" ? "Abrir completo" : "Open full"}</span>
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveLightboxHtml(null)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Iframe displaying the HTML project */}
            <iframe
              src={activeLightboxHtml.url}
              title={activeLightboxHtml.title}
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                border: "none",
                background: "#0a0a0f"
              }}
              allow="fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
}


