import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { ACCESS_CONFIG } from '../docs/.vitepress/accessConfig.js'

if (!/^[a-f0-9]{64}$/.test(ACCESS_CONFIG.hash)) throw new Error('访问摘要必须是 SHA-256')
writeFileSync(fileURLToPath(new URL('../docs/public/kb-access-config.js', import.meta.url)),
  `// Generated from accessConfig.js.\nwindow.KB_ACCESS_CONFIG = Object.freeze(${JSON.stringify(ACCESS_CONFIG)});\n`)
