import React from "react";
import {
  Sparkles,
  Video,
  Workflow,
  Megaphone,
  LayoutTemplate,
  Search,
  Laptop,
} from "lucide-react";

export type ProjectDetail = {
  company: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  images?: string[];
  staticImage?: string;
  carouselImages?: string[];
  html?: string;
  aspectRatio?: string;
};

export type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  accent: "blue" | "pink";
  projects: string[];
  projectsDetail: ProjectDetail[];
  cardTitle?: string;
};

export const EN_SERVICES: Service[] = [
  {
    number: "01",
    title: "AI content creation",
    description:
      "On-brand product imagery, lifestyle visuals, and ad creatives generated at scale in days, not weeks.",
    tags: ["Product images", "Lifestyle", "Reels", "Ad creatives"],
    icon: Sparkles,
    accent: "blue",
    projects: ["Jeffrey Levinson: hero set", "Pagureo: lifestyle carousel", "Apparel: lifestyle pack"],
    projectsDetail: [
      {
        company: "Jeffrey Levinson",
        title: "Hero Set Visuals",
        description: "AI-generated luxury product placement in premium aesthetic environments, increasing CTR by 45%.",
        image: "/assets/images/projects/JL portada.webp",
        staticImage: "/assets/images/projects/JL_C1_Mon_B_StillReachable.webp",
        carouselImages: [
          "/assets/images/projects/JL CR1.webp",
          "/assets/images/projects/JL_CR2.webp",
          "/assets/images/projects/JL_CR3.webp",
          "/assets/images/projects/JL_CR4.webp",
        ],
        images: [
          "/assets/images/projects/JL CR1.webp",
          "/assets/images/projects/JL_CR2.webp",
          "/assets/images/projects/JL_CR3.webp",
          "/assets/images/projects/JL_CR4.webp",
        ],
      },
      {
        company: "Pagureo",
        title: "Lifestyle Carousel",
        description: "Full fashion and streetwear collection visuals on virtual models under simulated studio lighting.",
        image: "/assets/images/projects/79fc3ac8-1ee7-4673-b5c9-565910c183b9.webp",
        images: [
          "/assets/images/projects/PREO_1.webp",
          "/assets/images/projects/PREO_2.webp",
          "/assets/images/projects/PREO_3.webp",
          "/assets/images/projects/PREO_4.webp",
        ],
      },
    ],
  },
  {
    number: "02",
    title: "Video and creative production",
    description:
      "Native eCommerce video: product spots, ads, and social content built for the feed and the funnel.",
    tags: ["Product", "Spots", "Ads", "Social"],
    icon: Video,
    accent: "pink",
    projects: ["Amper: :30 spot", "Colombiana: social campaign", "DTC: product demo"],
    projectsDetail: [
      {
        company: "Amper",
        title: "Product Launch Commercial",
        description: "Dynamic, high-energy cinematic commercial for social media ads and digital positioning.",
        image: "/assets/images/projects/service1-project0.webp",
        video: "/assets/images/projects/service1-project0.webm",
      },
      {
        company: "Colombiana",
        title: "La Nuestra Campaign",
        description: "Production of high-impact 1:1 social ads capturing cultural identity and driving brand engagement.",
        image: "/assets/images/projects/service1-project1.webp",
        video: "/assets/images/projects/service1-project1.webm",
        aspectRatio: "1/1",
      },
    ],
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
    projectsDetail: [
      {
        company: "Prai Cosmetics",
        title: "AI Video Automation",
        description: "Automated ComfyUI workflow to generate dynamic video ads and product animations from a single image.",
        image: "/assets/images/projects/service2-project0.webp",
        video: "/assets/images/projects/service2-project0.webm",
      },
      {
        company: "Prai Fashion",
        title: "AI Fashion & Model Generator",
        description: "Advanced ComfyUI generation system that scales and produces infinite clothing variations on virtual models in seconds.",
        image: "/assets/images/projects/service2-project1.webp",
        images: [
          "/assets/images/projects/Comfy (1).webp",
          "/assets/images/projects/Comfy (2).webp",
          "/assets/images/projects/Comfy (3).webp",
          "/assets/images/projects/Comfy (4).webp",
          "/assets/images/projects/Comfy (5).webp",
          "/assets/images/projects/Comfy (7).webp",
          "/assets/images/projects/ComfyUI_temp_inrkh_00004_.webp",
          "/assets/images/projects/ComfyUI-image_4_00001_.webp",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Digital Strategy",
    description:
      "Digital strategies built to connect your channels, attract opportunities, and turn marketing efforts into measurable growth.",
    tags: ["Strategy", "Benchmarking", "Branding", "Optimization"],
    icon: Megaphone,
    accent: "pink",
    cardTitle: "STRATEGY INCLUDED",
    projects: [
      "Digital audit and strategic planning",
      "Channel, audience, and goal definition",
      "KPI tracking and continuous optimization",
    ],
    projectsDetail: [
      {
        company: "Glow Beauty",
        title: "Brand Identity Design",
        description: "Comprehensive visual brand guidelines and identity system designed to build trust and authority.",
        image: "/assets/images/projects/Logo Branding 1.webp",
        images: ["/assets/images/projects/Branding 1.webp"],
      },
      {
        company: "Nook Design",
        title: "Brand Guidelines & Assets",
        description: "Cohesive brand architecture and asset library for unified marketing channels and digital platforms.",
        image: "/assets/images/projects/Logo Branding 2.webp",
        images: ["/assets/images/projects/Branding 2.webp"],
      },
    ],
  },
  {
    number: "05",
    title: "Paid Media Management",
    description:
      "Full-service paid media management across Meta Ads and Google Ads to reach qualified audiences, optimize ad spend, and drive measurable growth.",
    tags: ["Meta Ads", "Google Ads", "Media Buying", "Optimization"],
    icon: Megaphone,
    accent: "pink",
    cardTitle: "WHAT’S INCLUDED",
    projects: [
      "Meta Ads campaign management",
      "Google Ads campaign management",
      "Media buying, testing, and budget optimization",
    ],
    projectsDetail: [
      {
        company: "Nook Design",
        title: "Google Ads Dashboard",
        description: "Advanced analytics dashboard for real-time Google Ads campaign performance and tracking.",
        image: "/assets/images/projects/service3-project0.webp",
        images: ["/assets/images/projects/Google ads Dashboard.webp"],
      },
      {
        company: "Velo Apparel",
        title: "Google Ads Scaling",
        description: "Scaling Search and Performance Max campaigns targeting high purchase intent, resulting in a 180% increase in conversions.",
        image: "/assets/images/projects/service3-project1.webp",
        images: ["/assets/images/projects/Google ads 2.webp"],
      },
      {
        company: "Sana Supplements",
        title: "Performance Max Campaign",
        description: "Optimization of Google Performance Max campaigns achieving a 4.1x ROAS on generic search terms.",
        image: "/assets/images/projects/Imagen Dash Board meta.webp",
        images: ["/assets/images/projects/Dashboard Meta ads.webp"],
      },
      {
        company: "Zeta Shoes",
        title: "Search & Shopping Funnel",
        description: "Google Search and Shopping ads funnel alignment, boosting click-through-rate by 48% and reducing cost-per-acquisition.",
        image: "/assets/images/projects/Meta.webp",
        images: ["/assets/images/projects/Dashboard 2 meta ads.webp"],
      },
    ],
  },
  {
    number: "06",
    title: "Website Design",
    description:
      "Complete websites designed to showcase your brand, organize your services, and create a seamless experience that turns visitors into business opportunities.",
    tags: ["UX/UI", "Responsive", "Multi-page", "Optimization"],
    icon: Laptop,
    accent: "pink",
    cardTitle: "WHAT’S INCLUDED",
    projects: [
      "Full website design and development",
      "Page architecture, navigation, and user experience",
      "Responsive design, forms, and basic integrations",
    ],
    projectsDetail: [
      {
        company: "Nutra Labs",
        title: "Corporate Web Design",
        description: "Design and development of a corporate website optimized for conversions and institutional brand presentation.",
        image: "/assets/images/projects/Diseño Web portadqa 1.webp",
        images: ["/assets/images/projects/Diseño Web 1.webp"],
      },
      {
        company: "Bensom",
        title: "E-Commerce Website",
        description: "Online store web structure featuring fluid responsive design and page speed optimization to maximize sales.",
        image: "/assets/images/projects/Bensom.webp",
        images: ["/assets/images/projects/Diseño Web 2.webp"],
      },
    ],
  },
  {
    number: "07",
    title: "Sales Funnel",
    description:
      "High-converting pages with copy, design, and tracking ready to plug into your campaigns.",
    tags: ["Design", "Copy", "Forms", "CRO"],
    icon: LayoutTemplate,
    accent: "blue",
    projects: ["DTC supplement LP", "Lead capture page", "Tracking funnel"],
    projectsDetail: [
      {
        company: "Keto Fuel",
        title: "High-CRO Product Page",
        description: "Custom-designed DTC landing page with direct checkout integration.",
        image: "/assets/images/projects/service4-project0.webp",
        images: ["/assets/images/projects/Landing page (Pagureo).webp"],
      },
      {
        company: "Zen Sleep",
        title: "Lead Generation Hub",
        description: "Clean, high-performance landing page optimizing lead capture rates by 28%.",
        image: "/assets/images/projects/service4-project1.webp",
        images: ["/assets/images/projects/Marca de carro LP.webp"],
      },
    ],
  },
  {
    number: "08",
    title: "CRM Management",
    description:
      "CRM systems built to centralize your leads, automate follow-ups, and turn more opportunities into revenue.",
    tags: ["CRM Setup", "Pipelines", "Automation", "Reporting"],
    icon: Workflow,
    accent: "blue",
    projects: [
      "CRM setup and optimization",
      "Sales pipelines and deal stages",
      "Automations and dashboards",
    ],
    projectsDetail: [
      {
        company: "Casa Home",
        title: "GoHighLevel Lead Automation",
        description: "Custom CRM architecture with automated sales pipelines, email sequences, and automatic lead follow-ups.",
        image: "/assets/images/projects/ghl-logo.webp",
        html: "/assets/images/Html%20projects/pagureo-omnichannel-sales-crm-automation-system.html",
      },
      {
        company: "Nutra Labs",
        title: "n8n Integration & Workflows",
        description: "Advanced business process automation and real-time lead synchronization between databases, webhooks, and digital advertising channels.",
        image: "/assets/images/projects/n8n-portada.webp",
        html: "/assets/images/Html%20projects/ecommerce-ai-content-production-social-media-automation-system.html",
      },
    ],
  },
  {
    number: "09",
    title: "Digital strategy",
    description:
      "Roadmap, ICP, and perceived value: the strategic base that gives direction to content, media, and product.",
    tags: ["Benchmarking", "ICP", "Perceived value", "User personas"],
    icon: Search,
    accent: "pink",
    projects: ["Competitive map", "3 user personas + ICP", "Perceived value matrix"],
    projectsDetail: [
      {
        company: "Terra Earth",
        title: "ICP Roadmap Analysis",
        description: "Comprehensive competitive profiling and perceived value matrix formulation.",
        image: "/assets/images/projects/service5-project0.webp",
      },
      {
        company: "Vibe Audio",
        title: "Go-to-Market Strategy",
        description: "Strategic setup identifying 3 target user personas and defining creative direction.",
        image: "/assets/images/projects/service5-project1.webp",
      },
    ],
  },
];

export const ES_SERVICES: Service[] = [
  {
    number: "01",
    title: "Creación de contenido con IA",
    description:
      "Imágenes de producto, lifestyle y creatividades on-brand a escala, en días, no semanas.",
    tags: ["Imágenes de producto", "Lifestyle", "Reels", "Ad creatives"],
    icon: Sparkles,
    accent: "blue",
    projects: ["Jeffrey Levinson: set hero", "Pagureo: carrusel lifestyle", "Apparel: pack lifestyle"],
    projectsDetail: [
      {
        company: "Jeffrey Levinson",
        title: "Hero Set Visuals",
        description: "Colocación de productos generados por IA en entornos estéticos premium, aumentando CTR en un 45%.",
        image: "/assets/images/projects/JL portada.webp",
        staticImage: "/assets/images/projects/JL_C1_Mon_B_StillReachable.webp",
        carouselImages: [
          "/assets/images/projects/JL CR1.webp",
          "/assets/images/projects/JL_CR2.webp",
          "/assets/images/projects/JL_CR3.webp",
          "/assets/images/projects/JL_CR4.webp",
        ],
        images: [
          "/assets/images/projects/JL CR1.webp",
          "/assets/images/projects/JL_CR2.webp",
          "/assets/images/projects/JL_CR3.webp",
          "/assets/images/projects/JL_CR4.webp",
        ],
      },
      {
        company: "Pagureo",
        title: "Lifestyle Carousel",
        description: "Línea completa de moda y streetwear en modelos virtuales bajo simulación de iluminación de estudio.",
        image: "/assets/images/projects/79fc3ac8-1ee7-4673-b5c9-565910c183b9.webp",
        images: [
          "/assets/images/projects/PREO_1.webp",
          "/assets/images/projects/PREO_2.webp",
          "/assets/images/projects/PREO_3.webp",
          "/assets/images/projects/PREO_4.webp",
        ],
      },
    ],
  },
  {
    number: "02",
    title: "Producción audiovisual",
    description:
      "Video nativo eCom: spots de producto, ads y contenido social hechos para el feed y el funnel.",
    tags: ["Producto", "Spots", "Ads", "Social"],
    icon: Video,
    accent: "pink",
    projects: ["Amper: spot :30", "Colombiana: campaña social", "DTC: demo de producto"],
    projectsDetail: [
      {
        company: "Amper",
        title: "Spot de Lanzamiento",
        description: "Comercial cinematográfico dinámico para el posicionamiento y lanzamiento digital de la bebida energética.",
        image: "/assets/images/projects/service1-project0.webp",
        video: "/assets/images/projects/service1-project0.webm",
      },
      {
        company: "Colombiana",
        title: "Campaña Colombiana La Nuestra",
        description: "Producción de spots publicitarios en formato 1:1 optimizados para redes sociales, conectando con la identidad y tradición del país.",
        image: "/assets/images/projects/service1-project1.webp",
        video: "/assets/images/projects/service1-project1.webm",
        aspectRatio: "1/1",
      },
    ],
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
    projectsDetail: [
      {
        company: "Prai Cosmetics",
        title: "Automatización de Video con IA",
        description: "Flujo automatizado en ComfyUI para generar animaciones y anuncios dinámicos de producto a partir de una sola imagen.",
        image: "/assets/images/projects/service2-project0.webp",
        video: "/assets/images/projects/service2-project0.webm",
      },
      {
        company: "Prai Fashion",
        title: "Generador de Modelos y Moda con IA",
        description: "Sistema avanzado de generación en ComfyUI que escala y produce variaciones infinitas de prendas sobre modelos virtuales en segundos.",
        image: "/assets/images/projects/service2-project1.webp",
        images: [
          "/assets/images/projects/Comfy (1).webp",
          "/assets/images/projects/Comfy (2).webp",
          "/assets/images/projects/Comfy (3).webp",
          "/assets/images/projects/Comfy (4).webp",
          "/assets/images/projects/Comfy (5).webp",
          "/assets/images/projects/Comfy (7).webp",
          "/assets/images/projects/ComfyUI_temp_inrkh_00004_.webp",
          "/assets/images/projects/ComfyUI-image_4_00001_.webp",
        ],
      },
    ],
  },
  {
    number: "04",
    title: "Estrategia Digital",
    description:
      "Estrategias digitales diseñadas para conectar tus canales, atraer oportunidades y convertir acciones de marketing en crecimiento medible.",
    tags: ["Estrategia", "Bench marking", "Branding", "Optimización"],
    icon: Megaphone,
    accent: "pink",
    cardTitle: "ESTRATEGIA INCLUIDA",
    projects: [
      "Diagnóstico y planificación digital",
      "Definición de canales, audiencias y objetivos",
      "KPIs, seguimiento y optimización continua",
    ],
    projectsDetail: [
      {
        company: "Glow Beauty",
        title: "Identidad y Diseño de Marca",
        description: "Manual de identidad visual y diseño de marca completo para construir confianza y posicionamiento.",
        image: "/assets/images/projects/Logo Branding 1.webp",
        images: ["/assets/images/projects/Branding 1.webp"],
      },
      {
        company: "Nook Design",
        title: "Directrices de Marca y Recursos",
        description: "Arquitectura de marca coherente y biblioteca de recursos para canales digitales integrados.",
        image: "/assets/images/projects/Logo Branding 2.webp",
        images: ["/assets/images/projects/Branding 2.webp"],
      },
    ],
  },
  {
    number: "05",
    title: "Publicidad en Redes",
    description:
      "Gestión integral de publicidad digital en Meta Ads y Google Ads para atraer audiencias calificadas, optimizar la inversión y generar resultados medibles.",
    tags: ["Meta Ads", "Google Ads", "Media Buying", "Optimización"],
    icon: Megaphone,
    accent: "pink",
    cardTitle: "GESTIÓN INCLUIDA",
    projects: [
      "Gestión de campañas en Meta Ads",
      "Gestión de campañas en Google Ads",
      "Media buying, testing y optimización de presupuesto",
    ],
    projectsDetail: [
      {
        company: "Nook Design",
        title: "Dashboard de Google Ads",
        description: "Dashboard de analítica avanzada para el control de rendimiento y rentabilidad de campañas en tiempo real.",
        image: "/assets/images/projects/service3-project0.webp",
        images: ["/assets/images/projects/Google ads Dashboard.webp"],
      },
      {
        company: "Velo Apparel",
        title: "Escalamiento con Google Ads",
        description: "Escalado de campañas de Search y Performance Max dirigidas a usuarios con alta intención de compra, logrando un aumento del 180% en conversiones.",
        image: "/assets/images/projects/service3-project1.webp",
        images: ["/assets/images/projects/Google ads 2.webp"],
      },
      {
        company: "Sana Supplements",
        title: "Campaña Performance Max",
        description: "Optimización de campañas de Google Performance Max alcanzando un ROAS de 4.1x en términos de búsqueda genéricos.",
        image: "/assets/images/projects/Imagen Dash Board meta.webp",
        images: ["/assets/images/projects/Dashboard Meta ads.webp"],
      },
      {
        company: "Zeta Shoes",
        title: "Funnel de Búsqueda y Shopping",
        description: "Alineación del embudo de anuncios de Google Search y Shopping, incrementando el CTR en un 48% y reduciendo el costo de adquisición.",
        image: "/assets/images/projects/Meta.webp",
        images: ["/assets/images/projects/Dashboard 2 meta ads.webp"],
      },
    ],
  },
  {
    number: "06",
    title: "Diseño Web",
    description:
      "Sitios web completos diseñados para presentar tu marca, organizar tus servicios y crear una experiencia clara que convierta visitantes en oportunidades de negocio.",
    tags: ["UX/UI", "Responsive", "Multi-página", "Optimización"],
    icon: Laptop,
    accent: "pink",
    cardTitle: "DESARROLLO INCLUIDO",
    projects: [
      "Diseño y desarrollo de sitio web completo",
      "Arquitectura de páginas, navegación y experiencia de usuario",
      "Diseño responsive, formularios e integraciones básicas",
    ],
    projectsDetail: [
      {
        company: "Nutra Labs",
        title: "Diseño Web Corporativo",
        description: "Diseño y desarrollo de sitio web corporativo optimizado para la conversión y presentación institucional de la marca.",
        image: "/assets/images/projects/Diseño Web portadqa 1.webp",
        images: ["/assets/images/projects/Diseño Web 1.webp"],
      },
      {
        company: "Bensom",
        title: "Tienda Online E-Commerce",
        description: "Estructura web de tienda online con diseño responsive fluido y optimización de velocidad de carga para maximizar ventas.",
        image: "/assets/images/projects/Bensom.webp",
        images: ["/assets/images/projects/Diseño Web 2.webp"],
      },
    ],
  },
  {
    number: "07",
    title: "Sales Funnel",
    description:
      "Páginas de alta conversión con copy, diseño y tracking listas para conectarse con tus campañas.",
    tags: ["Diseño", "Copy", "Forms", "CRO"],
    icon: LayoutTemplate,
    accent: "blue",
    projects: ["Suplemento DTC: LP", "Página de captura", "Tracking funnel"],
    projectsDetail: [
      {
        company: "Keto Fuel",
        title: "Página de Producto de Alto CRO",
        description: "Landing page personalizada de venta directa DTC con checkout integrado.",
        image: "/assets/images/projects/service4-project0.webp",
        images: ["/assets/images/projects/Landing page (Pagureo).webp"],
      },
      {
        company: "Zen Sleep",
        title: "Centro de Captura de Leads",
        description: "Landing page limpia y veloz que incrementa las tasas de captura de leads en un 28%.",
        image: "/assets/images/projects/service4-project1.webp",
        images: ["/assets/images/projects/Marca de carro LP.webp"],
      },
    ],
  },
  {
    number: "08",
    title: "Gestión de CRM",
    description:
      "Sistemas CRM organizados para centralizar tus leads, automatizar seguimientos y convertir más oportunidades en ventas.",
    tags: ["Configuración", "Pipelines", "Automatización", "Reportes"],
    icon: Workflow,
    accent: "blue",
    projects: [
      "Configuración y optimización del CRM",
      "Pipelines y etapas de venta",
      "Automatizaciones y dashboards",
    ],
    projectsDetail: [
      {
        company: "Casa Home",
        title: "Automatización de Leads en GoHighLevel",
        description: "Estructura de CRM personalizada con pipelines automatizados, secuencias de email marketing y seguimiento automático de leads.",
        image: "/assets/images/projects/ghl-logo.webp",
        html: "/assets/images/Html%20projects/pagureo-omnichannel-sales-crm-automation-system.html",
      },
      {
        company: "Nutra Labs",
        title: "Integración y Flujos con n8n",
        description: "Automatización avanzada de procesos de negocio y sincronización en tiempo real de leads entre bases de datos, webhooks y pauta digital.",
        image: "/assets/images/projects/n8n-portada.webp",
        html: "/assets/images/Html%20projects/ecommerce-ai-content-production-social-media-automation-system.html",
      },
    ],
  },
  {
    number: "09",
    title: "Estrategia digital",
    description:
      "Hoja de ruta, ICP y valor percibido: la base estratégica que da dirección a contenido, pauta y producto.",
    tags: ["Benchmarking", "ICP", "Valor percibido", "User personas"],
    icon: Search,
    accent: "pink",
    projects: ["Mapa competitivo", "3 user personas + ICP", "Matriz de valor percibido"],
    projectsDetail: [
      {
        company: "Terra Earth",
        title: "Análisis de Mapa de ICP",
        description: "Perfilado competitivo exhaustivo y formulación de matriz de valor percibido.",
        image: "/assets/images/projects/service5-project0.webp",
      },
      {
        company: "Vibe Audio",
        title: "Estrategia de Entrada al Mercado",
        description: "Configuración estratégica identificando 3 user personas objetivo y dirección creativa.",
        image: "/assets/images/projects/service5-project1.webp",
      },
    ],
  },
];
