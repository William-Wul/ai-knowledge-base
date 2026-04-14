import DefaultTheme from 'vitepress/theme'
import PasswordGate from './PasswordGate.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(PasswordGate, null, {
      default: () => h(DefaultTheme.Layout),
    })
  },
}

// Vue 的 h 函数需要从 vue 引入
import { h } from 'vue'
