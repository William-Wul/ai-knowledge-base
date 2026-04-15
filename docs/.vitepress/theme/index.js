import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'
import HomeLayout from './HomeLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeLayout', HomeLayout)
  },
  Layout() {
    return h(PasswordGate, null, {
      default: () => h(DefaultTheme.Layout),
    })
  },
}
