// 修改 valaxy.config.ts 文件
import type { ThemeConfig } from 'valaxy-theme-starter'
import { defineConfig } from 'valaxy'

export default defineConfig<ThemeConfig>({
  theme: 'starter',
  
  themeConfig: {
    // colors: {
    //   primary: 'red',
    // },

    nav: [
      { text: 'Dashboard', link: '/' },
      { 
        text: 'Articles', 
        items: [
          { text: 'Archives', link: '/archives' },
          { text: 'Moments', link: '/moments' },
        ] 
      },
      {
        text: 'Others',
        items: [
          { text: 'Friends', link: '/friends' },
          { text: 'Manager', link: '/manager' },
          { text: 'Whiteboard', link: '/whiteboard' },
        ],
      },
      {
        text: 'GitHub',
        link: 'https://github.com',
      },
    ],

    footer: {
      since: new Date().getFullYear(),
      icon: {
        name: 'i-ri-cloud-line',
        animated: true,
        color: 'var(--va-c-primary)',
        url: 'https://github.com',
        title: 'GitHub',
      },
      powered: true,
    },
  },
})
