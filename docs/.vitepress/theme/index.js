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
import ModelRanking from './components/ModelRanking.vue'
import VideoBoard from './components/VideoBoard.vue'
import ContentReviewNote from './components/ContentReviewNote.vue'
import ArticleMeta from './components/ArticleMeta.vue'
import ModuleArticles from './components/ModuleArticles.vue'
import { initLearningProgress, recordVisit } from './learningProgress.js'
import './custom.css'
import './components/cases.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeLayout', HomeLayout)
    app.component('BilibiliVideo', BilibiliVideo)
    app.component('AiAbilityQuiz', AiAbilityQuiz)
    app.component('VocabEmbed', VocabEmbed)
    app.component('ModelRanking', ModelRanking)
    app.component('VideoBoard', VideoBoard)
    app.component('ModuleArticles', ModuleArticles)
  },
  setup() {
    const route = useRoute()
    const { frontmatter, title } = useData()

    // 全站只建一个放大实例，切页时换绑当前页图片（以前每次切页新建一个、从不释放）
    let zoom = null
    const initZoom = () => {
      if (!zoom) zoom = mediumZoom({ background: 'rgba(0, 0, 0, 0.85)', margin: 24 })
      zoom.detach()
      zoom.attach('.vp-doc :not(a) > img:not(.no-zoom)')
    }

    const trackProgress = () => recordVisit(route.path.replace(/\.html$/, ''), frontmatter.value.title || title.value)

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
      initLearningProgress()
      trackProgress()
    })
    watch(
      () => route.path,
      () => nextTick(() => {
        initZoom()
        updateDocsClass()
        trackProgress()
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
          'doc-before': () => [h(Breadcrumb), h(ArticleMeta), h(ContentReviewNote)],
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
