<template>
  <div v-if="!authenticated" class="password-gate">
    <div class="gate-card" :class="{ shake: shaking }">
      <div class="gate-logo">
        <!-- 与全站一致的绿书脊 logo（同 favicon.svg） -->
        <svg width="44" height="46" viewBox="9 7 41 43" aria-hidden="true">
          <rect x="13" y="10" width="9" height="36" rx="2.5" fill="#1f4332"/>
          <rect x="25" y="10" width="9" height="36" rx="2.5" fill="#3a7050"/>
          <rect x="38" y="14" width="7" height="32" rx="2.5" transform="rotate(12 41.5 30)" fill="#6dbf8a"/>
        </svg>
      </div>
      <h1>AI 学习知识库</h1>
      <p class="gate-subtitle">请输入访问密码继续</p>

      <form @submit.prevent="handleSubmit" class="gate-form">
        <div class="input-wrapper" :class="{ error: hasError }">
          <input
            ref="inputRef"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="输入访问密码"
            autocomplete="current-password"
            @input="hasError = false"
          />
          <button type="button" class="toggle-btn" @click.stop.prevent="showPassword = !showPassword" tabindex="-1">
            <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          </button>
        </div>
        <p v-if="hasError" class="error-msg">密码错误，请重试</p>
        <button type="submit" class="submit-btn" :class="{ disabled: !password }" @click.prevent="password && handleSubmit()">
          进入知识库 →
        </button>
      </form>

      <p class="gate-hint">如忘记密码，请联系管理员</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// ⚠️ 修改密码：把新密码用 SHA-256 算一下，把十六进制摘要填到这里。
// 算法：printf '%s' '你的密码' | shasum -a 256
// 明文不进代码，避免被 F12 一眼看穿。
const CORRECT_HASH = '743392a6cfca212568fbd1ca6b693f91f583f67672f2698b000dc20e062ddf6e'
const STORAGE_KEY = 'kb_auth_v1'

const authenticated = ref(false)
const password = ref('')
const hasError = ref(false)
const shaking = ref(false)
const showPassword = ref(false)
const inputRef = ref(null)

// SHA-256 摘要（用浏览器原生 Web Crypto API，不引入依赖）
async function sha256(text) {
  const data = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

function redirectIfNotFound() {
  setTimeout(() => {
    if (document.title.startsWith('404')) {
      window.location.replace('/')
    }
  }, 300)
}

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'ok') {
    authenticated.value = true
    redirectIfNotFound()
  } else {
    nextTick(() => inputRef.value?.focus())
  }
})

async function handleSubmit() {
  const hash = await sha256(password.value)
  if (hash === CORRECT_HASH) {
    localStorage.setItem(STORAGE_KEY, 'ok')
    authenticated.value = true
    redirectIfNotFound()
  } else {
    hasError.value = true
    shaking.value = true
    password.value = ''
    setTimeout(() => {
      shaking.value = false
      nextTick(() => inputRef.value?.focus())
    }, 600)
  }
}
</script>

<style scoped>
.password-gate {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #f0f4f1 0%, #e8f0ea 50%, #f5f7f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.gate-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 40px rgba(45, 90, 61, 0.12), 0 2px 8px rgba(0,0,0,0.06);
  text-align: center;
  border: 1px solid rgba(45, 90, 61, 0.08);
  transition: transform 0.1s;
}

.gate-logo {
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: center;
}

.gate-card h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a2e20;
  margin: 0 0 0.4rem;
  letter-spacing: -0.02em;
}

.gate-subtitle {
  color: #6b7c6e;
  font-size: 0.9rem;
  margin: 0 0 1.8rem;
}

.gate-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 2.8rem 0.75rem 1rem;
  border: 1.5px solid #d1d9d3;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fafbfa;
  color: #1a2e20;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  border-color: #2D5A3D;
  box-shadow: 0 0 0 3px rgba(45, 90, 61, 0.1);
  background: white;
}

.input-wrapper.error input {
  border-color: #dc2626;
  background: #fff5f5;
}

.toggle-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #9aab9e;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.toggle-btn:hover { color: #2D5A3D; }

.error-msg {
  color: #dc2626;
  font-size: 0.82rem;
  margin: -0.25rem 0 0;
  text-align: left;
}

.submit-btn {
  padding: 0.8rem;
  background: #2D5A3D;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  letter-spacing: 0.01em;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.submit-btn:hover:not(:disabled) {
  background: #245033;
  box-shadow: 0 4px 12px rgba(45, 90, 61, 0.3);
  transform: translateY(-1px);
}

.submit-btn:active:not(:disabled) { transform: translateY(0); }

.submit-btn:disabled,
.submit-btn.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.gate-hint {
  color: #9aab9e;
  font-size: 0.78rem;
  margin: 1rem 0 0;
}

/* 抖动动画 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-8px); }
  30% { transform: translateX(8px); }
  45% { transform: translateX(-6px); }
  60% { transform: translateX(6px); }
  75% { transform: translateX(-3px); }
  90% { transform: translateX(3px); }
}

.shake {
  animation: shake 0.55s ease-in-out;
}

@media (max-width: 480px) {
  .gate-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }
  .gate-card h1 { font-size: 1.3rem; }
}

/* ============ 深色模式：密码门夜景化 ============ */
.dark .password-gate {
  background: linear-gradient(135deg, #131c16 0%, #18231c 50%, #111713 100%);
}
.dark .gate-card {
  background: #1f2e24;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0,0,0,0.2);
  border-color: rgba(160, 200, 175, 0.12);
}
.dark .gate-card h1 { color: #d6e0db; }
.dark .gate-subtitle { color: #a3b3aa; }
.dark .input-wrapper input {
  background: #16221b;
  color: #d6e0db;
  border-color: #2f4438;
}
.dark .input-wrapper input:focus {
  border-color: #6dbf8a;
  box-shadow: 0 0 0 3px rgba(109, 191, 138, 0.14);
  background: #182721;
}
.dark .input-wrapper.error input {
  border-color: #e4a6aa;
  background: #382426;
}
.dark .gate-hint { color: #7d8c83; }
</style>
