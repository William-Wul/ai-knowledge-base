<template>
  <div v-if="!authenticated" class="password-gate">
    <div class="gate-card" :class="{ shake: shaking }">
      <div class="gate-logo">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="#2D5A3D"/>
          <path d="M24 12C28.4 12 32 15.6 32 20V22H34C35.1 22 36 22.9 36 24V36C36 37.1 35.1 38 34 38H14C12.9 38 12 37.1 12 36V24C12 22.9 12.9 22 14 22H16V20C16 15.6 19.6 12 24 12ZM24 15C21.2 15 19 17.2 19 20V22H29V20C29 17.2 26.8 15 24 15ZM24 27C22.9 27 22 27.9 22 29C22 30.1 22.9 31 24 31C25.1 31 26 30.1 26 29C26 27.9 25.1 27 24 27Z" fill="white"/>
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

// ⚠️ 修改密码请在此处更改
const CORRECT_PASSWORD = 'ai2026'
const STORAGE_KEY = 'kb_auth_v1'

const authenticated = ref(false)
const password = ref('')
const hasError = ref(false)
const shaking = ref(false)
const showPassword = ref(false)
const inputRef = ref(null)

onMounted(() => {
  // 检测 Netlify Identity 身份验证 token，自动跳转到后台处理
  const hash = window.location.hash
  if (hash.includes('invite_token') || hash.includes('recovery_token') || hash.includes('confirmation_token')) {
    window.location.replace('/admin/' + hash)
    return
  }

  const stored = sessionStorage.getItem(STORAGE_KEY)
  if (stored === 'ok') {
    authenticated.value = true
  } else {
    nextTick(() => inputRef.value?.focus())
  }
})

function handleSubmit() {
  if (password.value === CORRECT_PASSWORD) {
    sessionStorage.setItem(STORAGE_KEY, 'ok')
    authenticated.value = true
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
</style>
