import { ref } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  // Update surface color based on theme
  document.documentElement.style.setProperty(
    '--surface-color',
    isDarkMode.value ? '#1a1a1a' : '#ffffff'
  )
}

// Initialize theme based on user preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  toggleDarkMode()
}

export { isDarkMode, toggleDarkMode }