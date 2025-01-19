<template>
  <el-button 
    class="category-button"
    :class="[`category-${color}`, { active: isActive }]"
    @click="$emit('select', category.id)"
  >
    <el-icon v-if="category.icon" class="category-icon">
      <component :is="category.icon"></component>
    </el-icon>
    <span class="category-name">{{ category.name }}</span>
    <span v-if="count" class="category-count">{{ count }}</span>
  </el-button>
</template>

<script setup lang="ts">
import type { Category } from '@/types'

interface Props {
  category: Category
  isActive?: boolean
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  count?: number
}

withDefaults(defineProps<Props>(), {
  isActive: false,
  color: 'primary'
})

defineEmits<{
  (e: 'select', id: number): void
}>()
</script>

<style scoped>
.category-button {
  height: 28px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  border-radius: 6px;
  background: var(--el-fill-color-light);
  transition: all 0.2s ease;
  border: 1px solid transparent;
  color: var(--el-text-color-regular);
}

.category-icon {
  font-size: 1em;
  transition: all 0.2s ease;
}

.category-name {
  font-weight: normal;
}

.category-count {
  background: var(--el-fill-color);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.75em;
  margin-left: 4px;
}

/* Color variants */
.category-primary {
  color: var(--primary-color);
}

.category-success {
  color: var(--el-color-success);
}

.category-warning {
  color: var(--el-color-warning);
}

.category-danger {
  color: var(--el-color-danger);
}

.category-info {
  color: var(--el-color-info);
}

/* Hover states */
.category-button:hover {
  background: var(--el-fill-color);
}

/* Active states */
.category-button.active {
  font-weight: 500;
}

.category-primary.active {
  background: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary-light-5);
}

.category-success.active {
  background: var(--el-color-success-light-9);
  border-color: var(--el-color-success-light-5);
}

.category-warning.active {
  background: var(--el-color-warning-light-9);
  border-color: var(--el-color-warning-light-5);
}

.category-danger.active {
  background: var(--el-color-danger-light-9);
  border-color: var(--el-color-danger-light-5);
}

.category-info.active {
  background: var(--el-color-info-light-9);
  border-color: var(--el-color-info-light-5);
}

/* Dark mode */
:root[class~='dark'] .category-button {
  color: var(--el-text-color-primary);
}

:root[class~='dark'] .category-button:hover {
  background: var(--el-fill-color-darker);
}

:root[class~='dark'] .category-count {
  background: var(--el-fill-color-darker);
}

:root[class~='dark'] .category-button.active {
  background: var(--el-fill-color-darker);
  border-color: var(--el-border-color);
}

/* Remove animation for cleaner look */
.category-button {
  box-shadow: 0 0 0 0 transparent;
}

.category-button:active {
  transform: scale(0.98);
}
</style> 