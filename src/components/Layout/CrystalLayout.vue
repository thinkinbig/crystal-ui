<template>
  <div class="layout">
    <CrystalHeader />
    <div class="main-content">
      <aside class="sidebar">
        <nav>
          <ul>
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              @click="selectComponent(item.name)"
              :class="{ active: currentComponent === item.name }"
            >
              <span class="icon">{{ item.icon }}</span>
              {{ item.label }}
            </li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <slot></slot>
      </main>
    </div>
    <CrystalFooter />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CrystalHeader from './CrystalHeader.vue'
import CrystalFooter from './CrystalFooter.vue'

export default defineComponent({
  name: 'CrystalLayout',
  components: {
    CrystalHeader,
    CrystalFooter
  },
  props: {
    currentComponent: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const menuItems = [
      { name: 'Component1', label: '组件 1', icon: '📦' },
      { name: 'Component2', label: '组件 2', icon: '🎨' }
    ]

    const selectComponent = (name) => {
      emit('update:currentComponent', name)
    }

    return {
      menuItems,
      selectComponent
    }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
}

.main-content {
  display: flex;
  flex-grow: 1;
  gap: 24px;
  padding: 24px;
}

.sidebar {
  width: 240px;
  background-color: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);

  nav {
    padding: 12px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: var(--border-radius);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
    border: 1px solid transparent;

    .icon {
      margin-right: 12px;
      font-size: 18px;
    }

    &:hover {
      background-color: var(--hover-color);
      color: var(--text-primary);
    }

    &.active {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-light);
    }
  }
}

.content {
  flex-grow: 1;
  background-color: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: var(--padding);
  border: 1px solid var(--border-color);
}
</style>
