import {defineConfig} from 'vitepress'
import navbar from './navbar.js'
import sidebar from './sidebar.js'
import {container} from "@mdit/plugin-container";

export default defineConfig({
    lang: 'en-US',
    title: 'Fastjs',
    themeConfig: {
        nav: navbar.nav,
        sidebar: sidebar,
        editLink: {
            pattern: "https://github.com/fastjs-team/docs/edit/main/:path",
            text: "Edit this page on GitHub",
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/fastjs-team/core'},
            {icon: 'twitter', link: 'https://twitter.com/dy_xiaodong2022'}
        ],
        outline: [2, 5],
    },
    markdown: {
        config: (md) => {
            md.use(container, {
                name: 'advance',
                openRender() {
                    return `<div class="advance-container">`
                },
                closeRender() {
                    return `</div>`
                }
            }).use(container, {
                name: 'simple',
                openRender() {
                    return `<div class="simple-container">`
                },
                closeRender() {
                    return `</div>`
                }
            })
        },
    },
})