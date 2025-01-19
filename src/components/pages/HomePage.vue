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
              <p class="subtitle">Share your thoughts, ideas, and stories</p>
            </Transition>
          </div>
        </div>

        <div class="right-content">
          <Transition name="fade-left" appear>
            <div class="search-container">
              <el-input
                v-model="searchQuery"
                placeholder="Search articles..."
                class="search-input"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </div>
          </Transition>
          
          <Transition name="fade-left" appear>
            <div class="actions">
              <el-button 
                type="primary" 
                @click="createPost"
                class="action-button"
              >
                Create Post
              </el-button>
              <el-button 
                @click="viewPosts"
                class="action-button"
              >
                View Posts
              </el-button>
            </div>
          </Transition>
        </div>

        <div class="theme-toggle">
          <el-switch
            v-model="isDark"
            inline-prompt
            class="theme-switch"
          />
        </div>
      </header>

      <!-- Featured Posts Section -->
      <section class="featured-posts">
        <h2 class="section-title">Featured Posts</h2>
        <div class="posts-grid">
          <PostCard 
            v-for="post in featuredPosts" 
            :key="post.id" 
            :post="post"
          />
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories">
        <h2 class="section-title">Categories</h2>
        <div class="category-grid">
          <CategoryButton
            v-for="(category, index) in categories"
            :key="category.id"
            :category="category"
            :color="categoryColors[index % categoryColors.length]"
            :count="categoryCounts[category.id]"
            :is-active="selectedCategory === category.id"
            @select="handleCategorySelect"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { isDarkMode, toggleDarkMode } from '@/stores/themeStore'
import PostCard from '@/components/common/PostCard.vue'
import CategoryButton from '@/components/common/CategoryButton.vue'

const router = useRouter()
const searchQuery = ref('')
const isExpanded = ref(false)

const isDark = computed({
  get: () => isDarkMode.value,
  set: () => toggleDarkMode()
})

// Mock data for featured posts
const featuredPosts = ref([
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    excerpt: 'Learn the basics of Vue 3 and its composition API...',
    image: 'http://picsum.photos/id/123/200/100',
    date: '2024-01-15',
    author: 'John Doe',
    category: { id: 1, name: 'Vue' },
    views: 1200,
    likes: 45,
    tags: ['Vue3', 'JavaScript', 'Frontend']
  },
  {
    id: 2,
    title: 'Mastering TypeScript',
    excerpt: 'Deep dive into TypeScript features and best practices for large-scale applications.',
    image: 'https://picsum.photos/seed/typescript/400/300',
    date: '2024-03-14',
    author: 'Jane Smith'
  },
  {
    id: 3,
    title: 'Modern CSS Techniques',
    excerpt: 'Explore the latest CSS features and how to use them effectively in your projects.',
    image: 'https://picsum.photos/seed/css/400/300',
    date: '2024-03-13',
    author: 'Mike Johnson'
  }
])

// Categories with Element Plus icons
const categories = ref([
  { id: 1, name: 'Technology', icon: 'Monitor' },
  { id: 2, name: 'Design', icon: 'Brush' },
  { id: 3, name: 'Development', icon: 'Terminal' },
  { id: 4, name: 'Tutorials', icon: 'Reading' },
  { id: 5, name: 'News', icon: 'Bell' },
  { id: 6, name: 'Tips & Tricks', icon: 'Magic-stick' }
])

const createPost = () => {
  router.push('/create-post')
}

const viewPosts = () => {
  router.push('/posts')
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

const categoryColors = ['primary', 'success', 'warning', 'danger', 'info'] as const
const selectedCategory = ref<number | null>(null)

// Mock category counts
const categoryCounts = {
  1: 15,
  2: 8,
  3: 12,
  4: 5,
  5: 20,
  6: 7
}

const handleCategorySelect = (id: number) => {
  selectedCategory.value = selectedCategory.value === id ? null : id
  // Additional logic here...
}
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
  width: 100%;
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
}

.container.expanded {
  width: 100%;
}

.header {
  padding: 40px;
  background: linear-gradient(
    to right bottom,
    rgba(var(--primary-color-rgb), 0.1),
    rgba(var(--primary-color-rgb), 0.05)
  );
  border-bottom: 1px solid rgba(var(--primary-color-rgb), 0.1);
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

.featured-posts, .categories {
  padding: 40px;
}

.section-title {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.post-card {
  background: var(--surface-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(var(--primary-color-rgb), 0.1);
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.post-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid rgba(var(--primary-color-rgb), 0.1);
}

.post-content {
  padding: 20px;
}

.post-content h3 {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.post-content p {
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.5;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.category-button {
  width: 100%;
  height: 48px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.category-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    margin: 10px;
    border-radius: 16px;
  }

  .featured-posts, .categories {
    margin: 10px;
  }

  .header {
    padding: 20px;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Add these new styles */
.featured-posts, .categories {
  background-color: var(--surface-color);
  margin: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.section-title {
  position: relative;
  display: inline-block;
  margin-left: 20px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.section-title:hover::after {
  transform: scaleX(1);
}
</style> 