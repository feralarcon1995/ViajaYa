import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

function stylesBeforeModuleScripts(): Plugin {
  return {
    name: 'styles-before-module-scripts',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const linkRe = /<link[^>]+href="[^"]*\/assets\/[^"]+\.css"[^>]*>/g;
        const links = html.match(linkRe);
        if (!links?.length) return html;
        let out = html;
        links.forEach((l) => {
          out = out.replace(l, '');
        });
        const marker = '<script type="module"';
        const i = out.indexOf(marker);
        if (i === -1) return html;
        const block = `${links.join('\n    ')}\n    `;
        return `${out.slice(0, i)}${block}${out.slice(i)}`;
      },
    },
  };
}

export default defineConfig({
  plugins: [stylesBeforeModuleScripts()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: 'index.html',
        destinations: 'pages/destinations.html',
        detail: 'pages/detail.html',
        reservations: 'pages/reservations.html',
        quote: 'pages/quote.html',
        contact: 'pages/contact.html',
      },
    },
  },
});
