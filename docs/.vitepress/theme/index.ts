import DefaultTheme from 'vitepress/theme'
import './scroll.css'
import {selecter} from 'fastjs-next'

selecter("body").el().onload = () => {
    setInterval(() => {
        selecter(".VPDocAsideOutline .outline-link").each(el => {
            el.text(
                el.text().replace(/v[0-9.]+/g, "")
            )
        })
    }, 100)
}

export default DefaultTheme