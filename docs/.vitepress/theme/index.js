import { h, onMounted, watch, nextTick } from 'vue'
import { useRoute, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import PasswordGate from './PasswordGate.vue'
import HomeLayout from './HomeLayout.vue'
import VocabEmbed from './components/VocabEmbed.vue'
import BilibiliVideo from './components/BilibiliVideo.vue'
import AiAbilityQuiz from './components/AiAbilityQuiz.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import BackToTop from './components/BackToTop.vue'
import ReadingControls from './components/ReadingControls.vue'
import SidebarHeader from './components/SidebarHeader.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeLayout', HomeLayout)
    app.component('BilibiliVideo', BilibiliVideo)
    app.component('AiAbilityQuiz', AiAbilityQuiz)
    app.component('VocabEmbed', VocabEmbed)
  },
  setup() {
    const route = useRoute()
    const { frontmatter } = useData()

    const initZoom = () => {
      mediumZoom('.vp-doc :not(a) > img:not(.no-zoom)', {
        background: 'rgba(0, 0, 0, 0.85)',
        margin: 24,
      })
    }

    // 文章页(带侧栏)在桌面端隐藏顶部导航栏,导航统一走侧栏;
    // 首页等无侧栏页面保持原样。CSS 按 html.kb-docs 生效
    const updateDocsClass = () => {
      if (typeof document === 'undefined') return
      const fm = frontmatter.value || {}
      const isDocs = !(fm.layout === 'home' || fm.layout === 'page' || fm.sidebar === false)
      document.documentElement.classList.toggle('kb-docs', isDocs)
    }

    onMounted(() => {
      initZoom()
      updateDocsClass()
    })
    watch(
      () => route.path,
      () => nextTick(() => {
        initZoom()
        updateDocsClass()
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
          // 侧栏顶部:本站导航(折叠) + 沉浸 + 搜索
          'sidebar-nav-before': () => h(SidebarHeader),
        }),
        h(BackToTop),
        h(ReadingControls),
        h(PasswordGate),
      ]
    )
  },
}
