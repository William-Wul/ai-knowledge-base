import { loadTaggedCases } from '../../scripts/case-tags-data.mjs'
import { renderCaseDetailMarkdown } from '../../scripts/generate-practice-cases.mjs'

export default {
  paths() {
    return loadTaggedCases().map(item => ({
      params: { slug: item.slug },
      content: renderCaseDetailMarkdown(item),
    }))
  },
}
