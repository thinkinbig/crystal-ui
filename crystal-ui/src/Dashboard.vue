<template>
    <div class="dashboard">
      <Header />
      <div class="main-content">
        <aside class="sidebar">
          <nav>
            <ul>
              <li 
                @click="selectComponent('Component1')" 
                :class="{ active: currentComponent === 'Component1' }"
              >
                <span class="icon">📦</span>
                组件 1
              </li>
              <li 
                @click="selectComponent('Component2')"
                :class="{ active: currentComponent === 'Component2' }"
              >
                <span class="icon">🎨</span>
                组件 2
              </li>
            </ul>
          </nav>
        </aside>
        <main class="content">
          <component :is="currentComponent" />
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  import Header from './components/Header.vue'
  import Component1 from './components/Component1.vue'
  import Component2 from './components/Component2.vue'
  
  export default defineComponent({
    name: 'Dashboard',
    components: {
      Header,
      Component1,
      Component2
    },
    setup() {
      const currentComponent = ref('Component1')
  
      const selectComponent = (componentName) => {
        currentComponent.value = componentName
      }
  
      return {
        currentComponent,
        selectComponent
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    height: 100vh;
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