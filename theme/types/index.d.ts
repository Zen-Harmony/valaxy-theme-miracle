import type { DefaultTheme } from 'valaxy'

export namespace StarterTheme {
  export type Config = ThemeConfig
  export type Sidebar = any
}

/**
 * Theme Config
 */
export interface ThemeConfig extends DefaultTheme.Config {
  colors?: {
    primary?: string
  }
  footer?: {
    since?: number
    icon?: {
      enable?: boolean
      svg?: string
    }
    beian?: string
  }
  // 添加友链权重配置
  friendWeights?: Record<string, number>
  nav?: NavItem[]
}

export interface NavItem {
  text: string
  link: string
  icon?: string
}

export type ThemeUserConfig = Partial<ThemeConfig>
