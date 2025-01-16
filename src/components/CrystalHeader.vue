<template>
  <header class="header">
    <div class="header-left">
      <img src="/crystal.svg" alt="Logo" class="logo" />
      <h1 class="title">Crystal UI</h1>
    </div>
    <div class="header-right">
      <button class="header-button">
        <span class="icon">📚</span>
        <span>文档</span>
      </button>
      <button class="header-button">
        <span class="icon">⚙️</span>
        <span>设置</span>
      </button>
      <button class="theme-button" @click="toggleTheme">
        <span class="icon">{{ isDark ? '🌞' : '🌙' }}</span>
        <span>{{ isDark ? '浅色' : '深色' }}</span>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CrystalHeader',
  setup() {
    const isDark = ref<boolean>(false)

    const initTheme = (): void => {
      const theme = localStorage.getItem('theme') || 'light'
      isDark.value = theme === 'dark'
      document.documentElement.setAttribute('data-theme', theme)
    }

    const toggleTheme = (): void => {
      isDark.value = !isDark.value
      const theme = isDark.value ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }

    return {
      isDark,
      toggleTheme
    }
  }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px var(--padding);
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--primary-light)
  );
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
  animation: pulse 2s infinite;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.header-button,
.theme-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
}

.header-button:hover,
.theme-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.header-button:active,
.theme-button:active {
  transform: translateY(1px);
}

.header-button::after,
.theme-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.header-button:active::after,
.theme-button:active::after {
  animation: ripple 0.4s ease-out;
}

.icon {
  font-size: 16px;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(40, 40);
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>