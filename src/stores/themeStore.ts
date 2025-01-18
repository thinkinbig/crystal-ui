import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
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
    initTheme,
    toggleTheme
  }
}) 