declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Theme related types
export interface Theme {
  primary: string
  secondary: string
  background: string
  text: string
}

// Post related types
export interface Post {
  id: number
  title: string
  excerpt: string
  content?: string
  date: string
  author: string
  image: string
  category?: Category
  views: number
  likes: number
  tags: string[]
}

export interface Category {
  id: number
  name: string
  icon?: string
  description?: string
}

// User related types
export interface User {
  id: number
  name: string
  avatar?: string
  email?: string
  role: 'user' | 'admin'
}

// Comment related types
export interface Comment {
  id: number
  content: string
  author: User
  date: string
  likes?: number
  replies?: Comment[]
}
