# Skill: Wix Auditor & Editor (`wix-auditor`)

Esta skill es una herramienta avanzada para auditar, mejorar y personalizar tu sitio Wix automáticamente utilizando técnicas de scraping y automatización de navegador.

## Capacidades

1.  **Auditoría Automática (`Phase 1`):**
    *   Analiza la página en vivo (`https://gotirot.wixsite.com/actividadeseduca`).
    *   Verifica elementos críticos de SEO (H1, Meta Descripción, Título).
    *   Evalúa la longitud y consistencia del contenido.
    *   Compara con las mejores prácticas de marca (Goti Design System).

2.  **Sugerencias Inteligentes:**
    *   Basado en la auditoría, genera una lista de 3 acciones recomendadas.
    *   Ejemplo: "Acortar título H1", "Agregar sección de novedades", "Corregir enlaces rotos".

3.  **Ejecución de Cambios (`Phase 2`):**
    *   Inicia sesión automáticamente en el Dashboard de Wix.
    *   Navega al Editor Visual.
    *   Localiza elementos por coincidencia de texto (Text Matching).
    *   Ofrece una interfaz para aplicar cambios (actualmente en modo asistido/híbrido debido a la complejidad del canvas de Wix).

## Uso

Para ejecutar la auditoría y ver las sugerencias:

```bash
cd .agent/skills/wix_auditor
npm start
```

Sigue las instrucciones en la terminal para seleccionar una acción.

## Configuración

Las credenciales y URLs se gestionan en `wix_config.json`.
Asegúrate de mantener `2fa_enabled: false` para una ejecución sin interrupciones, o estar atento para aprobar el inicio de sesión.
