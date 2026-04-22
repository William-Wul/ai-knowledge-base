import { h, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import PasswordGate from './PasswordGate.vue'
import HomeLayout from './HomeLayout.vue'
import BilibiliVideo from './components/BilibiliVideo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeLayout', HomeLayout)
    app.component('BilibiliVideo', BilibiliVideo)
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.vp-doc :not(a) > img:not(.no-zoom)', {
        background: 'rgba(0, 0, 0, 0.85)',
        margin: 24,
      })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  },
  Layout() {
    return h('div', [h(DefaultTheme.Layout), h(PasswordGate)])
  },
}
