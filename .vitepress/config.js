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
    },
    markdown: {
        config: (md) => {
            md.use(container, {
                name: 'advance',
                openRender() {
                    return `<Advance>`
                },
                closeRender() {
                    return `</Advance>`
                }
            }).use(container, {
                name: 'simple',
                openRender() {
                    return `<Simple>`
                },
                closeRender() {
                    return `</Simple>`
                }
            })
        },
    },
})