import DefaultTheme from 'vitepress/theme'
import {h} from "vue";
import Layout from "./Layout.vue";

import './scroll.css'

export default {
    extends: DefaultTheme,
    Layout() {
        return h(Layout, null,{})
    },
}