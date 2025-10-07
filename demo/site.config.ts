import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  lang: 'en',
  title: 'Your Blog Title',
  url: 'https://example.com',
  author: {
    avatar: 'https://via.placeholder.com/200',
    name: 'Your Name',
  },
  description: 'Your blog description',
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
  ],
  // 配置页脚信息
  footer: {
    since: new Date().getFullYear(),
    message: 'Released under the MIT license.',
  },
})
