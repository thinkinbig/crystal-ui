<template>
  <div class="tag-list">
    <div v-if="editable" class="tag-input">
      <el-input
        v-model="newTag"
        placeholder="输入 # 添加标签..."
        @keyup.enter="addTag"
        @input="handleInput"
        size="small"
      >
        <template #prefix>
          <span class="hash-prefix">#</span>
        </template>
        <template #append>
          <el-button @click="addTag">添加</el-button>
        </template>
      </el-input>
      <div v-if="suggestions.length" class="tag-suggestions">
        <div
          v-for="suggestion in suggestions"
          :key="suggestion"
          class="suggestion-item"
          @click="selectSuggestion(suggestion)"
        >
          #{{ suggestion }}
        </div>
      </div>
    </div>
    <div class="tags">
      <el-tag
        v-for="tag in formattedTags"
        :key="tag"
        :class="{ active: selectedTags.includes(tag) }"
        :closable="editable"
        :disable-transitions="false"
        @close="removeTag(tag)"
        @click="toggleTag(tag)"
      >
        #{{ tag }}
      </el-tag>
      <el-empty v-if="!tags.length" :image-size="60" description="暂无标签" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue?: string[]
  tags?: string[]
  editable?: boolean
  maxTags?: number
  selectable?: boolean
  suggestions?: string[] // 标签建议
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  tags: () => [],
  editable: false,
  maxTags: 10,
  selectable: false,
  suggestions: () => []
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'add', tag: string): void
  (e: 'remove', tag: string): void
}>()

const newTag = ref('')
const suggestions = ref<string[]>([])

const selectedTags = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 格式化标签，移除 # 前缀
const formattedTags = computed(() => 
  props.tags.map(tag => tag.startsWith('#') ? tag.slice(1) : tag)
)

const handleInput = (value: string) => {
  // 如果输入以 # 开头，自动移除
  if (value.startsWith('#')) {
    newTag.value = value.slice(1)
  }
  
  // 更新建议列表
  if (newTag.value) {
    suggestions.value = props.suggestions.filter(tag => 
      tag.toLowerCase().includes(newTag.value.toLowerCase()) &&
      !props.tags.includes(tag)
    )
  } else {
    suggestions.value = []
  }
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (!tag) return
  
  // 移除可能的 # 前缀
  const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag
  
  if (props.tags.includes(cleanTag)) {
    ElMessage.warning('标签已存在')
    return
  }
  
  if (props.tags.length >= props.maxTags) {
    ElMessage.warning(`最多只能添加 ${props.maxTags} 个标签`)
    return
  }

  emit('add', cleanTag)
  newTag.value = ''
  suggestions.value = []
}

const selectSuggestion = (tag: string) => {
  newTag.value = tag
  suggestions.value = []
  addTag()
}

const removeTag = (tag: string) => {
  emit('remove', tag)
}

const toggleTag = (tag: string) => {
  if (!props.selectable) return
  
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value = [...selectedTags.value, tag]
  }
}
</script>

<style scoped>
.tag-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tag-input {
  max-width: 300px;
  position: relative;
}

.hash-prefix {
  color: var(--el-text-color-secondary);
  margin-right: 4px;
}

.tag-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.suggestion-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suggestion-item:hover {
  background: var(--el-fill-color-light);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.el-tag {
  cursor: pointer;
  transition: all 0.2s ease;
}

.el-tag:hover {
  transform: translateY(-1px);
}

.el-tag.active {
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
  color: white;
}

:root[class~='dark'] .el-tag {
  border-color: var(--el-border-color-darker);
  background-color: var(--el-fill-color-dark);
  color: var(--el-text-color-primary);
}

:root[class~='dark'] .el-tag.active {
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
  color: white;
}

:root[class~='dark'] .tag-suggestions {
  background: var(--el-bg-color-dark);
  border-color: var(--el-border-color-darker);
}

:root[class~='dark'] .suggestion-item:hover {
  background: var(--el-fill-color-dark);
}
</style> 