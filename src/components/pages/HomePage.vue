<template>
  <div class="home-page" @mousemove="handleMouseMove">
    <div class="background-pattern"></div>
    <div class="background-gradient" :style="gradientStyle"></div>
    <div class="container" :class="{ 'expanded': isExpanded }">
      <header class="header">
        <div class="left-content">
          <Transition name="fade-right" appear>
            <img src="/crystal.svg" alt="Crystal Logo" class="logo" />
          </Transition>
          
          <div class="text-content">
            <Transition name="fade-right" appear>
              <h1 class="title">Crystal Blog</h1>
            </Transition>
            
            <Transition name="fade-right" appear>
              <p class="subtitle">A Beautiful Vue 3 Component Library</p>
            </Transition>
          </div>
        </div>

        <div class="right-content">
          <Transition name="fade-left" appear>
            <div class="search-container">
              <el-input
                v-model="searchQuery"
                placeholder="Search components..."
                :prefix-icon="Search"
                class="search-input"
              />
            </div>
          </Transition>
          
          <Transition name="fade-left" appear>
            <div class="actions">
              <el-button 
                type="primary" 
                @click="getStarted"
                class="action-button"
              >
                Get Started
              </el-button>
              <el-button 
                @click="viewComponents"
                class="action-button"
              >
                View Components
              </el-button>
            </div>
          </Transition>
        </div>

        <Transition name="fade" appear>
          <div class="theme-toggle">
            <el-switch
              v-model="isDark"
              inline-prompt
              :active-icon="Moon"
              :inactive-icon="Sunny"
            />
          </div>
        </Transition>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Search, Moon, Sunny } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { isDarkMode, toggleDarkMode } from '@/stores/themeStore'

const router = useRouter()
const searchQuery = ref('')
const isExpanded = ref(false)

const isDark = computed({
  get: () => isDarkMode.value,
  set: () => toggleDarkMode()
})

onMounted(() => {
  // Trigger expansion animation after mount
  setTimeout(() => {
    isExpanded.value = true
  }, 100)
})

const getStarted = () => {
  router.push('/guide')
}

const viewComponents = () => {
  router.push('/components')
}

// Mouse movement effect
const mouseX = ref(0)
const mouseY = ref(0)

const gradientStyle = computed(() => ({
  background: `radial-gradient(circle at ${mouseX.value}% ${mouseY.value}%, 
    rgba(var(--primary-color-rgb), 0.15) 0%, 
    rgba(var(--primary-color-rgb), 0.05) 25%, 
    transparent 50%)`
}))

const handleMouseMove = (event: MouseEvent) => {
  const { clientX, clientY } = event
  const { innerWidth, innerHeight } = window
  mouseX.value = (clientX / innerWidth) * 100
  mouseY.value = (clientY / innerHeight) * 100
}

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: var(--background-color);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.background-pattern {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
  background: 
    radial-gradient(circle at 0% 0%, var(--primary-light) 0%, transparent 50%),
    radial-gradient(circle at 100% 0%, var(--secondary-color) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, var(--tertiary-color) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, var(--primary-color) 0%, transparent 50%),
    repeating-linear-gradient(
      45deg,
      var(--surface-color) 0,
      var(--surface-color) 10px,
      transparent 10px,
      transparent 11px
    ),
    repeating-linear-gradient(
      -45deg,
      var(--surface-color) 0,
      var(--surface-color) 10px,
      transparent 10px,
      transparent 11px
    );
  background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%;
  filter: blur(1px);
  animation: backgroundShift 15s ease-in-out infinite alternate;
}

.background-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.7;
  mix-blend-mode: overlay;
  transition: background 0.3s ease;
}

@keyframes backgroundShift {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 2% 2%;
  }
}

@keyframes gradientFlow {
  0% {
    background-size: 200% 200%;
    background-position: 0% 0%;
  }
  50% {
    background-size: 200% 200%;
    background-position: 100% 100%;
  }
  100% {
    background-size: 200% 200%;
    background-position: 0% 0%;
  }
}

.container {
  position: relative;
  width: 0;
  max-width: 1200px;
  margin: 0 auto;
  background: var(--surface-color);
  border-radius: 24px;
  box-shadow: 
    0 0 0 1px rgba(var(--primary-color-rgb), 0.05),
    0 20px 40px -8px rgba(0, 0, 0, 0.1),
    0 4px 12px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  backdrop-filter: blur(20px);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.container.expanded {
  width: 100%;
}

.header {
  display: flex;
  padding: 60px;
  position: relative;
  z-index: 1;
  min-width: 1200px;
}

.left-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 40px;
}

.text-content {
  text-align: left;
}

.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
}

.logo {
  width: 100px;
  height: 100px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 400px;
}

/* Dark mode adjustments */
:root[class~='dark'] .background-pattern {
  opacity: 0.15;
  background: 
    radial-gradient(circle at 0% 0%, var(--primary-light) 0%, transparent 50%),
    radial-gradient(circle at 100% 0%, var(--secondary-color) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, var(--tertiary-color) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, var(--primary-color) 0%, transparent 50%),
    repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.03) 0,
      rgba(255, 255, 255, 0.03) 10px,
      transparent 10px,
      transparent 11px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.03) 0,
      rgba(255, 255, 255, 0.03) 10px,
      transparent 10px,
      transparent 11px
    );
  animation: backgroundShift 20s ease-in-out infinite alternate;
}

:root[class~='dark'] .background-gradient {
  opacity: 0.3;
  mix-blend-mode: color-dodge;
}

/* Hover effect on container */
.container {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.container:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 0 0 1px rgba(var(--primary-color-rgb), 0.05),
    0 30px 60px -12px rgba(0, 0, 0, 0.15),
    0 8px 24px -4px rgba(0, 0, 0, 0.1);
}

.search-container {
  width: 100%;
  max-width: 500px;
  margin-bottom: 32px;
}

.search-input {
  width: 100%;
}

.actions {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
}

@media (max-width: 1200px) {
  .header {
    flex-direction: column;
    min-width: auto;
    padding: 40px 20px;
  }

  .left-content {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }

  .text-content {
    text-align: center;
  }

  .right-content {
    align-items: center;
  }

  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    max-width: 600px;
    text-align: center;
  }
}

/* Animation classes */
.fade-down-enter-active,
.fade-down-leave-active,
.fade-up-enter-active,
.fade-up-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-from {
  opacity: 0;
}

.fade-down-leave-to,
.fade-up-leave-to,
.fade-leave-to {
  opacity: 0;
}

/* Hover animations */
.action-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.logo {
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: rotate(360deg);
  transition: transform 1s ease;
}

.search-input {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-container:hover .search-input {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Staggered animations */
.title {
  animation: slideIn 0.6s ease 0.2s both;
}

.subtitle {
  animation: slideIn 0.6s ease 0.4s both;
}

.search-container {
  animation: slideIn 0.6s ease 0.6s both;
}

.actions {
  animation: slideIn 0.6s ease 0.8s both;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode transition */
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Responsive animations */
@media (prefers-reduced-motion: reduce) {
  .fade-down-enter-active,
  .fade-down-leave-active,
  .fade-up-enter-active,
  .fade-up-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .action-button,
  .logo,
  .search-input {
    transition: none;
  }

  .title,
  .subtitle,
  .search-container,
  .actions {
    animation: none;
  }

  .background-pattern {
    animation: none;
  }
  
  .background-gradient {
    display: none;
  }
}

/* Add new animation classes */
.fade-right-enter-active,
.fade-left-enter-active {
  transition: all 0.5s ease;
  transition-delay: 0.6s;
}

.fade-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
</style> 