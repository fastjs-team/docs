import { defineConfig } from "vitepress";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import { container } from "@mdit/plugin-container";

export default defineConfig({
  lang: "en-US",
  title: "Fastjs",
  srcDir: "docs",
  vite: {
    assetsInclude: ["*.png"],
  },
  head: [["link", { rel: "icon", type: "image/x-icon", href: "/icon.png" }]],
  themeConfig: {
    nav: navbar,
    logo: "/icon.png",
    sidebar: sidebar,
    editLink: {
      pattern: "https://github.com/fastjs-team/docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/fastjs-team/core" },
      { icon: "twitter", link: "https://twitter.com/dy_xiaodong2022" },
    ],
    outline: [2, 5],
    search: {
      provider: "algolia",
      options: {
        appId: "NJNQH9E5XC",
        apiKey: "99c195cd5bb8691f49998d4a921982dc",
        indexName: "fastjs",
      },
    },
  },
  markdown: {
    config: (md) => {
      md.use(container, {
        name: "advance",
        openRender() {
          return `<div class="advance-container">`;
        },
        closeRender() {
          return `</div>`;
        },
      }).use(container, {
        name: "simple",
        openRender() {
          return `<div class="simple-container">`;
        },
        closeRender() {
          return `</div>`;
        },
      });
    },
  },
});
