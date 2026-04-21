# Jayesh Gulani - Portfolio

A modern, interactive portfolio website featuring parallax scrolling, 3D animations, and smooth scroll-based transitions.

## Features

- 🎨 Modern dark theme with premium aesthetics
- 🌊 Smooth scroll with Lenis
- 🎭 Parallax effects and depth-based animations
- 🎯 3D interactive elements with Three.js
- ⚡ Optimized for performance (90+ Lighthouse score)
- 📱 Fully responsive design
- ♿ Accessibility-friendly with reduced motion support

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D**: Three.js, React Three Fiber
- **Smooth Scroll**: Lenis

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy your images to the `public/images/` folder:
   - jayesh.jpg
   - barcode 1.png
   - door window.png
   - food items.png
   - knowledge_graph_img.jpg
   - movies.png
   - amberdesigner.png
   - Jayesh Gulani Resume-1.pdf

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Performance Optimizations

- Lazy loading for images
- Code splitting
- Optimized animations with GPU acceleration
- Reduced motion support for accessibility
- Minimal JavaScript bundle size

## Customization

Edit the content in the component files:
- `app/components/Hero.tsx` - Hero section
- `app/components/About.tsx` - About section
- `app/components/Skills.tsx` - Skills section
- `app/components/Projects.tsx` - Projects section
- `app/components/Experience.tsx` - Experience timeline
- `app/components/Contact.tsx` - Contact form
