# Pagurai — AI Content, Automation & Paid Ads Studio 🚀

Prototipo web interactivo y responsivo para **Pagurai Creative**, un estudio digital enfocado en la creación de contenido, automatización de marketing y pautas publicitarias impulsadas por Inteligencia Artificial para marcas e-commerce/DTC (Direct-to-Consumer).

---

## 🎨 Características Clave

*   **Diseño Premium**: Interfaz moderna en modo oscuro, con efecto de glassmorphic, colores curados y tipografías Montserrat, Poppins e Inter de Google Fonts.
*   **100% Responsivo**: Adaptado para una navegación fluida en dispositivos móviles, tablets y ordenadores de escritorio.
*   **Traducción Dinámica (ES / EN)**: Sistema nativo de internacionalización que permite alternar instantáneamente el idioma de todo el sitio entre español e inglés.
*   **Navegación Fluida (SPA)**: Pestañas interactivas y acordeones auto-plegables para explorar a fondo cada pilar de servicio.
*   **Optimizado**: Sin dependencias pesadas ni frameworks, cargado con SVG in-line para mayor velocidad de carga y portabilidad.

---

## 📁 Estructura del Proyecto

El proyecto está diseñado bajo una arquitectura ultra-ligera de **Single Page Application (SPA)** ideal para hosting rápido:

```bash
website-pagurai/
├── index.html       # Archivo principal con estructura, estilos (CSS) y lógica (JS)
├── .gitignore       # Archivo para omitir archivos temporales en Git
└── README.md        # Documentación del proyecto (este archivo)
```

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

No requiere de ningún servidor ni base de datos, ¡es 100% estático!

1.  Clona el repositorio en tu ordenador:
    ```bash
    git clone https://github.com/TU-USUARIO/website-pagurai.git
    ```
2.  Accede a la carpeta del proyecto:
    ```bash
    cd website-pagurai
    ```
3.  Abre el archivo `index.html` en tu navegador favorito haciendo doble clic sobre él o ejecutando:
    *   **En Windows (PowerShell):** `Start-Process index.html`
    *   **En macOS:** `open index.html`
    *   **En Linux:** `xdg-open index.html`

---

## 🌐 Cómo Subirlo y Hospedarlo Gratis en GitHub Pages

Puedes hacer que este prototipo sea visible para cualquier persona en internet de forma gratuita usando **GitHub Pages**. Sigue estos sencillos pasos:

### 1. Inicializar Git y Subir a GitHub
Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar repositorio local
git init

# Agregar los archivos
git add .

# Crear el primer commit
git commit -m "feat: setup initial responsive SPA structure with ES/EN language support"

# Conectar con tu repositorio de GitHub (Reemplaza con tu URL real de GitHub)
git remote add origin https://github.com/TU-USUARIO/website-pagurai.git
git branch -M main

# Subir archivos
git push -u origin main
```

### 2. Activar GitHub Pages
Una vez subidos tus archivos a tu repositorio de GitHub:
1.  Entra a tu repositorio en **github.com**.
2.  Ve a la pestaña **Settings** (Configuración) en la barra superior derecha.
3.  En la barra lateral izquierda, haz clic en **Pages**.
4.  En la sección **Build and deployment**, bajo **Source**, selecciona **Deploy from a branch**.
5.  En **Branch**, selecciona `main` y la carpeta `/ (root)`. Luego haz clic en **Save** (Guardar).
6.  ¡Listo! En un par de minutos, GitHub te proporcionará un enlace público (ej. `https://TU-USUARIO.github.io/website-pagurai/`) donde tu sitio web estará disponible para todo el mundo.

---

## 🛠️ Tecnologías Utilizadas

*   **HTML5** semántico para SEO y accesibilidad.
*   **CSS3** moderno (Variables CSS, CSS Grid, Flexbox, Media Queries y transiciones nativas).
*   **JavaScript (ES6+)** nativo para control de pestañas, acordeones de servicios, toggles de formularios y traducción en tiempo real.

---

Desarrollado con ❤️ para **Pagurai Creative**.
