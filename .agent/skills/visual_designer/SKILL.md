# Skill: Wix Visual Designer (`visual-designer`)

Esta skill se enfoca en elevar la estética de tu sitio Wix, asegurando que cumpla con los estándares de lujo, minimalismo y alta gama definidos en el **GOTI Design System**.

## Capacidades

1.  **Auditoría Estética:**
    *   Analiza los colores, tipografías y espaciados del sitio actual.
    *   Verifica la consistencia con la paleta de GOTI (Gold Primary: `#f9d006`, Dark Primary: `#181711`).
    *   Detecta oportunidades para aplicar Glassmorphism y micro-animaciones.

2.  **Propuesta de Diseño Premium:**
    *   Sugiere cambios específicos basados en los principios de diseño de GOTI.
    *   Ejemplo: "Cambiar el fondo de la sección Hero a `#181711` con un gradiente de superposición oscuro".
    *   Ejemplo: "Aplicar `backdrop-filter: blur(12px)` a la barra de navegación".

3.  **Ejecución de Estilo:**
    *   Utiliza la automatización para navegar al "Site Design" de Wix.
    *   Modifica temas de color, estilos de texto y añade CSS personalizado (donde Wix lo permita).
    *   Sincroniza el "look and feel" con el archivo `DESIGN.md`.

## Uso

```bash
cd .agent/skills/visual_designer
node designer.js
```

## Referencia de Diseño (GOTI DS)
*   **Colores**: Oro (#f9d006) para acentos, Oscuro (#181711) para fondos.
*   **Efectos**: Glassmorphism (blur + transparencia).
*   **Tipografía**: Manrope para títulos, Noto Sans para cuerpo.

---
**Nota**: Esta skill reemplaza la automatización de Email para priorizar el impacto visual inmediato.
