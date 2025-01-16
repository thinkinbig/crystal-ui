declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 主题相关类型
interface Theme {
  primary: string
  secondary: string
  background: string
  text: string
}

// 组件相关类型
interface MenuItem {
  name: string
  label: string
  icon: string
} 