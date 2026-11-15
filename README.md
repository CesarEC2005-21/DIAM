# Carta de Amor & Celebración 💖🥂

Una landing page interactiva, elegante y festiva desarrollada con **Next.js**, **Tailwind CSS**, **Framer Motion** y **Canvas Confetti**.

---

## ✨ Características y Estructura

### 1. Pantalla de Bienvenida (Portada Interactiva)
- **Foto y Nombre:** Retrato enmarcado con borde dorado brillante, mostrando el nombre **Diana** y un mensaje de dedicatoria.
- **Corazón Interactivo:**
  - Corazón con **bordes rojos definidos** y **fondo blanco**.
  - **Progreso en 3 clics:**
    - **1er Clic:** Se llena un 33% desde la base hacia arriba + comienza un latido suave.
    - **2do Clic:** Se llena un 66% + latido más rápido y apasionado con resplandor rojizo.
    - **3er Clic:** Se llena al **100%** de color rojo brillante + explosión festiva de confeti dorado y corazones + transición automática a la 2da página.

### 2. Segunda Pantalla (Experiencia de Amor & Fiesta)
- **Música de fondo:** Reproductor flotante con control de reproducción/pausa, silenciar/activar volumen y barras de ecualizador animadas.
- **Álbum de Recuerdos (Carrusel):**
  - Carrusel elegante con fotos de alta calidad, efecto Polaroid/tarjeta de lujo.
  - Botones de navegación (anterior/siguiente), selector de miniaturas, pausa/reproducción automática y subtítulos para cada momento.
- **Carta de Amor:**
  - Diseño estilo pergamino fino con sello de cera en relieve con la inicial "D".
  - Tipografía clásica de imprenta (*Cormorant Garamond*), letra capital iluminada y dedicatoria emotiva que celebra el amor y la alegría de la vida en pareja.
  - Firma manuscrita en fuente script.
- **Fotografía General de Cierre:**
  - Imagen panorámica destacada en marco dorado ornamental.
  - Botón interactivo: *"¡Celebrar Nuestro Amor! 🥂✨"* que dispara una lluvia de fuegos artificiales de confeti.
- **Partículas Ambientales:**
  - Corazones y destellos dorados que flotan suavemente por la pantalla para una atmósfera romántica y de fiesta.

---

## 🛠️ Cómo Iniciar el Proyecto

En la terminal, ejecuta:

```bash
npm run dev
```

Luego abre tu navegador en [http://localhost:3000](http://localhost:3000).

Para compilar para producción:
```bash
npm run build
npm run start
```

---

## 📸 Cómo Personalizar las Fotos y Textos

Todo el contenido está centralizado en un único archivo muy fácil de editar:

📁 **[`src/config/loveData.ts`](file:///c:/Users/Lenovo/Documents/DIANA/src/config/loveData.ts)**

Allí puedes cambiar:
1. **Nombre del destinatario:** `recipientName: "Diana"`
2. **Foto de portada:** `coverImage: "URL_DE_TU_FOTO"`
3. **Música:** `musicUrl: "URL_DE_TU_CANCION.mp3"` (puedes colocar un archivo en la carpeta `public/` o un enlace directo).
4. **Fotos del carrusel:** Añade o reemplaza las URLs, títulos y fechas del arreglo `albumPhotos`.
5. **Carta de amor:** Modifica el título, fecha, saludo, párrafos y firma en el objeto `letter`.
6. **Foto final:** Reemplaza la imagen final y el mensaje en `finalPhoto`.

"# DIAM" 
