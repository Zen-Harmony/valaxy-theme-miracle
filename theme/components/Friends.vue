<script setup lang="ts">
import { computed } from 'vue'
import { useCardHover } from '../composables/useCardHover'
import { generateGrid } from '../composables/generateGrid'
import type { ThemeConfig } from '../types'
import { useThemeConfig } from 'valaxy'

const { handleMouseMove, handleMouseEnter, handleMouseLeave } = useCardHover()
const themeConfig = useThemeConfig<ThemeConfig>()

// 模拟friends数据 - 已更新为更真实的数据结构
const friends = computed(() => {
  // 实际项目中这些数据应该从配置或API获取
  return [
    {
      title: 'Example Blog',
      link: 'https://example.com',
      desc: 'A wonderful blog about technology and life',
      img: 'https://via.placeholder.com/100',
      folder: 'tech'
    },
    {
      title: 'Design Studio',
      link: 'https://design.example.com',
      desc: 'Creative design works and inspiration',
      img: 'https://via.placeholder.com/100',
      folder: 'design'
    },
    {
      title: 'Tech Forum',
      link: 'https://forum.example.com',
      desc: 'Discussions about latest technologies',
      img: 'https://via.placeholder.com/100',
      folder: 'tech'
    },
    {
      title: 'Photography Blog',
      link: 'https://photo.example.com',
      desc: 'Capturing beautiful moments',
      img: 'https://via.placeholder.com/100',
      folder: 'hobby'
    },
    {
      title: 'Cooking Recipes',
      link: 'https://food.example.com',
      desc: 'Delicious food recipes from around the world',
      img: 'https://via.placeholder.com/100',
      folder: 'hobby'
    },
    {
      title: 'Travel Journal',
      link: 'https://travel.example.com',
      desc: 'Travel experiences and guides',
      img: 'https://via.placeholder.com/100',
      folder: 'hobby'
    }
  ]
})

// 添加分组权重支持
const friendWeights = computed(() => ({
  tech: -20,
  design: -10,
  hobby: 0
}))

// 响应式获取列数
const columnCount = computed(() => {
  if (typeof window === 'undefined') return 3;
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 3;
})

// 处理窗口大小变化
const updateColumns = () => {
  // 触发重新渲染
  columnCount.value = columnCount.value;
}

import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  updateColumns();
  window.addEventListener('resize', updateColumns);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumns);
})

// 分组并排序友链
const groupedFriends = computed(() => {
  const raw = generateGrid(
    friends.value,
    undefined,
    // 以 folder（分类）为分组键，若无则归为 "friends"
    (friend: any) => friend.folder ?? "friends",
    columnCount.value
  )

  // 统一按 friendWeights 排序
  return raw.sort((a: any, b: any) => {
    const wa = friendWeights.value[a.key] ?? 0;
    const wb = friendWeights.value[b.key] ?? 0;
    if (wa === wb) return a.key.localeCompare(b.key);
    return wa - wb;
  })
})
</script>

<template>
  <div class="allFriend">
    <div v-for="group in groupedFriends" :key="group.key" style="margin-bottom: 32px;">
      <h1 class="year">{{ group.key }}</h1>
      <div class="friends-grid">
        <div
          v-for="(col, colIndex) in group.columns"
          :key="colIndex"
          class="column"
        >
          <div v-for="friend in col" :key="friend.title" class="friend-card">
            <a 
              :href="friend.link" 
              target="_blank" 
              class="friend-inner" 
              rel="noopener noreferrer"
              @mouseenter="handleMouseEnter"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
            >
              <img :src="friend.img" :alt="friend.title" class="friend-icon" />
              <div class="friend-info">
                <p class="friend-title">{{ friend.title }}</p>
                <p class="friend-desc">{{ friend.desc }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friend-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--va-gap);
}

.friends-grid {
  display: flex;
  gap: var(--va-gap);
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--va-gap);
}

.year {
  margin-top: 30px;
  line-height: 110px;
  font-size: 100px;
  position: relative;
  top: 40px;
  font-weight: bold;
  color: var(--va-c-gutter);
  opacity: 0.7;
  z-index: -1;
  mask-image: linear-gradient(var(--va-c-gutter) 20%, transparent);
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.friend-card {
  perspective: 1000px;
  border-radius: var(--va-border-radius-1);
  transition: all var(--va-transition-time);
}

.friend-inner {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: var(--va-border-radius-1);
  background-color: var(--va-c-card);
  transition: all var(--va-transition-time);
  text-decoration: none;
  color: var(--va-c-text);
}

.friend-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}

.friend-info {
  flex: 1;
  min-width: 0;
}

.friend-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.friend-desc {
  margin: 0;
  font-size: 14px;
  color: var(--va-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>