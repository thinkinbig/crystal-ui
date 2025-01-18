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
