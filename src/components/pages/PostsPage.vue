<template>
  <div class="posts-page">
    <div class="posts-header">
      <h1>Blog Posts</h1>
      <div class="posts-filters">
        <div class="filter-row">
          <el-input
            v-model="searchQuery"
            placeholder="Search posts..."
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-select 
            v-model="selectedCategory" 
            placeholder="Category"
            clearable
            class="category-select"
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            >
              <div class="category-option">
                <el-icon><component :is="category.icon" /></el-icon>
                <span>{{ category.name }}</span>
              </div>
            </el-option>
          </el-select>
        </div>
        
        <TagList
          v-model="selectedTags"
          :tags="allTags"
          :selectable="true"
          class="tag-filter"
        />
      </div>
    </div>

    <div class="posts-stats">
      <span>{{ totalPosts }} posts found</span>
      <span v-if="selectedTags.length">
        {{ selectedTags.length }} tags selected
      </span>
    </div>

    <div class="posts-grid">
      <PostCard 
        v-for="post in filteredPosts" 
        :key="post.id" 
        :post="post"
        :show-stats="true"
      />
    </div>

    <div class="posts-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="totalPosts"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, View, Star } from '@element-plus/icons-vue'
import type { Post, Category } from '@/types'
import PostCard from '@/components/common/PostCard.vue'
import TagList from '@/components/common/TagList.vue'

// State
const searchQuery = ref('')
const selectedCategory = ref<number | null>(null)
const currentPage = ref(1)
const pageSize = ref(9)

// Mock data
const posts = ref<Post[]>([
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    excerpt: 'Learn the basics of Vue 3 and its composition API...',
    image: '/images/post1.jpg',
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
    excerpt: 'Deep dive into TypeScript features and best practices...',
    image: '/images/post2.jpg',
    date: '2024-03-14',
    author: 'Jane Smith',
    category: { id: 2, name: 'TypeScript' },
    views: 850,
    likes: 32,
    tags: ['TypeScript', 'JavaScript', 'Development']
  },
  {
    id: 3,
    title: 'CSS Grid Layout',
    excerpt: 'Modern CSS Grid techniques for responsive layouts...',
    image: '/images/post3.jpg',
    date: '2024-03-13',
    author: 'Mike Johnson',
    category: { id: 3, name: 'CSS' },
    views: 1500,
    likes: 67,
    tags: ['CSS', 'Layout', 'Frontend']
  },
  {
    id: 4,
    title: 'State Management with Pinia',
    excerpt: 'Learn how to manage state effectively in Vue applications...',
    image: '/images/post4.jpg',
    date: '2024-03-12',
    author: 'Sarah Wilson',
    category: { id: 1, name: 'Vue' },
    views: 980,
    likes: 41,
    tags: ['Vue3', 'Pinia', 'State-Management']
  },
  {
    id: 5,
    title: 'Modern Web Animation Techniques',
    excerpt: 'Exploring the latest animation techniques for modern web apps...',
    image: '/images/post5.jpg',
    date: '2024-03-11',
    author: 'Alex Brown',
    category: { id: 3, name: 'CSS' },
    views: 750,
    likes: 28,
    tags: ['CSS', 'Animation', 'Frontend']
  }
])

const categories = ref<Category[]>([
  { id: 1, name: 'Vue', icon: 'Monitor', description: 'Vue.js related content' },
  { id: 2, name: 'TypeScript', icon: 'Terminal', description: 'TypeScript tutorials and tips' },
  { id: 3, name: 'CSS', icon: 'Brush', description: 'CSS and design related content' },
  { id: 4, name: 'JavaScript', icon: 'Connection', description: 'JavaScript fundamentals and advanced topics' },
  { id: 5, name: 'Tools', icon: 'Tools', description: 'Development tools and utilities' }
])

// 添加标签筛选功能
const selectedTags = ref<string[]>([])

// Computed
const filteredPosts = computed(() => {
  let result = posts.value

  // 按分类筛选
  if (selectedCategory.value) {
    result = result.filter(post => post.category?.id === selectedCategory.value)
  }

  // 按标签筛选
  if (selectedTags.value.length) {
    result = result.filter(post => 
      selectedTags.value.every(tag => post.tags.includes(tag))
    )
  }

  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return result
})

const totalPosts = computed(() => filteredPosts.value.length)

// 添加标签筛选器
const allTags = computed(() => {
  const tagSet = new Set<string>()
  posts.value.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet)
})

// Utils
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.posts-page {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.posts-header {
  margin-bottom: 24px;
}

.posts-header h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.posts-filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-row {
  display: flex;
  gap: 16px;
  width: 100%;
}

.search-input {
  flex: 2;
}

.category-select {
  flex: 1;
  min-width: 160px;
}

.category-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tag-filter {
  flex: 1;
  min-width: 200px;
}

.posts-stats {
  display: flex;
  gap: 16px;
  color: var(--el-text-color-secondary);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.posts-pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .posts-page {
    padding: 20px;
  }

  .posts-filters {
    gap: 12px;
  }

  .filter-row {
    flex-direction: column;
  }

  .search-input,
  .category-select,
  .tag-filter {
    width: 100%;
  }
}
</style> 