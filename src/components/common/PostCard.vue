<template>
  <div class="post-card" @click="navigateToPost">
    <div class="post-image" :style="{ backgroundImage: `url(${post.image})` }">
      <div class="post-category" v-if="post.category">
        <el-tag size="small">{{ post.category.name }}</el-tag>
      </div>
    </div>
    <div class="post-content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
      <div class="post-meta">
        <div class="post-info">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-author">{{ post.author }}</span>
        </div>
        <div class="post-tags" v-if="post.tags?.length">
          <TagList :tags="post.tags" />
        </div>
        <div class="post-stats" v-if="showStats">
          <span class="views">
            <el-icon><View /></el-icon> {{ post.views }}
          </span>
          <span class="likes">
            <el-icon><Star /></el-icon> {{ post.likes }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { View, Star } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import type { Post } from '@/types'
import TagList from './TagList.vue'

const props = defineProps<{
  post: Post
  showStats?: boolean
}>()

const router = useRouter()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const navigateToPost = () => {
  router.push(`/posts/${props.post.id}`)
}
</script>

<style scoped>
.post-card {
  background: var(--surface-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(var(--primary-color-rgb), 0.1);
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.post-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-bottom: 1px solid rgba(var(--primary-color-rgb), 0.1);
}

.post-category {
  position: absolute;
  top: 16px;
  right: 16px;
}

.post-content {
  padding: 20px;
}

.post-content h2 {
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
  flex-direction: column;
  gap: 8px;
}

.post-info {
  display: flex;
  gap: 12px;
  color: var(--el-text-color-secondary);
  font-size: 0.9rem;
}

.post-stats {
  display: flex;
  gap: 16px;
}

.post-stats span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.post-tags {
  margin: 8px 0;
}
</style> 