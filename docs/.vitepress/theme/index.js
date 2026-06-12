import { h, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import PasswordGate from './PasswordGate.vue'
import HomeLayout from './HomeLayout.vue'
import BilibiliVideo from './components/BilibiliVideo.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import BackToTop from './components/BackToTop.vue'
import ReadingControls from './components/ReadingControls.vue'
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
      () => nextTick(() => {
        initZoom()
        if (typeof window !== 'undefined' && window._hmt) {
          window._hmt.push(['_trackPageview', window.location.pathname])
        }
      })
    )
  },
  Layout() {
    return h(
      'div',
      [
        h(DefaultTheme.Layout, null, {
          // 把面包屑塞进文章正文上方
          'doc-before': () => h(Breadcrumb),
          // 阅读控件:沉浸阅读按钮进导航栏,侧栏折叠把手是 fixed 定位不受挂载点影响
          'nav-bar-content-after': () => h(ReadingControls),
        }),
        h(BackToTop),
        h(PasswordGate),
      ]
    )
  },
}
