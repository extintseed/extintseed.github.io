# EXTINT S.E.E.D

Sitio web corporativo de EXTINT S.E.E.D, empresa ecuatoriana especializada en prevención, protección y seguridad contra incendios.

Sitio publicado: <https://www.extintseed.com/>

## Organización

- `sitio/`: única copia editable y publicable de la web. Contiene HTML, CSS, JavaScript, imágenes, dominio, robots y sitemap.
- `tools/verificar-sitio.mjs`: comprueba los recursos del catálogo y de las galerías, archivos ausentes e identificadores duplicados.
- `.github/workflows/publicar-sitio.yml`: valida y publica exclusivamente `sitio/` con GitHub Pages.
- `.git/`: historial recuperable del proyecto; no se publica y no debe eliminarse.

## Actualizar la web

1. Editar `sitio/index.html` (contenido principal), `sitio/script.js` (productos, precios y galerías) o `sitio/style.css` (diseño).
2. Añadir imágenes dentro de su carpeta correspondiente en `sitio/Imagenes/`. El catálogo convierte las rutas PNG/JPG de sus datos a los archivos `.webp` publicados.
3. Ejecutar `node tools/verificar-sitio.mjs` y revisar la web con un servidor local. Por ejemplo: `python -m http.server 8080 --directory sitio`.
4. Confirmar los cambios y enviarlos a la rama `main`. El flujo **Publicar sitio web** valida los archivos y los despliega automáticamente.

Ya no es necesario preparar ni mantener `extintseed-site.zip`. La versión previa a la reorganización se conserva en el commit `ce9a7d4` del historial de Git, incluido su ZIP original.

El sitemap es `https://www.extintseed.com/sitemap.xml`. Solo contiene páginas con URL propia; las categorías y ventanas flotantes no son páginas independientes.
