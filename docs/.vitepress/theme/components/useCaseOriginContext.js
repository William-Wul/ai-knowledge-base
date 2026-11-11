import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import navCases from '../../data/cases-generated/nav.json'
import { getListContext, resolveCaseContext } from './caseBrowsing.js'

let cachedFullCases = null
let loadingFullCases = null

function ensureFullCases() {
  if (cachedFullCases) return Promise.resolve(cachedFullCases)
  if (!loadingFullCases) {
    loadingFullCases = import('../../data/cases-generated/index.json').then(mod => {
      cachedFullCases = mod.default || mod
      return cachedFullCases
    })
  }
  return loadingFullCases
}

export function useCaseOriginContext(getItem) {
  const route = useRoute()
  const fromPath = ref(null)
  const fullCases = ref(cachedFullCases)

  function readOrigin() {
    if (typeof window === 'undefined') return
    fromPath.value = new URLSearchParams(window.location.search).get('from')
    if (getListContext(fromPath.value)?.query && !fullCases.value) {
      ensureFullCases().then(list => { fullCases.value = list }).catch(() => {})
    }
  }

  watch(() => route.path, () => readOrigin(), { flush: 'post' })
  onMounted(() => {
    readOrigin()
    window.addEventListener('popstate', readOrigin)
  })
  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') window.removeEventListener('popstate', readOrigin)
  })

  const context = computed(() => {
    const item = getItem()
    if (!item) return null
    const catalog = getListContext(fromPath.value)?.query && fullCases.value ? fullCases.value : navCases
    return resolveCaseContext(item, catalog, fromPath.value)
  })

  return { fromPath, context }
}
