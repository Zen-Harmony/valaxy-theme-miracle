<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { usePostList } from 'valaxy'
import { generateGrid } from '../composables/generateGrid'
import PostCard from './PostCard.vue'

const posts = usePostList()

// 模拟moments数据 - 已更新为更真实的数据结构
const moments = computed(() => {
  // 实际项目中这些数据应该从配置或API获取
  return [
    {
      date: '2024-01-15',
      time: '10:30',
      content: 'Working on a new feature for the blog theme. Excited to share it soon!',
      image: 'https://via.placeholder.com/300'
    },
    {
      date: '2024-01-12',
      time: '14:45',
      content: 'Reading a great book about web development best practices.',
      image: ''
    },
    {
      date: '2024-01-10',
      time: '18:20',
      content: 'Enjoying a cup of coffee while coding late into the night.',
      image: 'https://via.placeholder.com/300'
    },
    {
      date: '2024-01-08',
      time: '09:15',
      content: 'Just finished a major update to the theme. Check it out!',
      image: 'https://via.placeholder.com/300'
    },
    {
      date: '2024-01-05',
      time: '16:30',
      content: 'Learning Vue 3 composition API in depth.',
      image: ''
    },
    {
      date: '2024-01-01',
      time: '12:00',
      content: 'Happy New Year! Looking forward to new opportunities and challenges.',
      image: 'https://via.placeholder.com/300'
    }
  ]
})

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

onMounted(() => {
  updateColumns();
  window.addEventListener('resize', updateColumns);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumns);
})

// 格式化相对日期
function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  
  const months = Math.floor(diffDays / 30);
  if (months === 1) return '1 month ago';
  if (months < 12) return `${months} months ago`;
  
  const years = Math.floor(months / 12);
  if (years === 1) return '1 year ago';
  return `${years} years ago`;
}

// 瀑布流数据，按年份分组，动态列数
const groupedMoments = computed(() =>
  generateGrid(
    moments.value, // 修复变量名称，从 momentsData 改为 moments.value
    undefined,
    (item: any) =>
      item.date ? new Date(item.date).getFullYear().toString() : 'all',
    columnCount.value
  )
)
</script>

<template>
  <div v-for="group in groupedMoments" :key="group.key">
    <h1 class="year">{{ group.key }}</h1>
    <div class="posts-grid">
      <div
        v-for="(col, colIndex) in group.columns"
        :key="colIndex"
        class="column"
      >
        <div v-for="moment in col">
          <PostCard
            :key="moment.fileName"
            :description="moment.content"
            :date="formatRelativeDate(moment.date)"
            :image="moment.image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.posts-grid {
  display: flex;
  gap: var(--va-gap);
  margin-bottom: 24px;
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
  top: 30px;
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

span.at {
  opacity: 0.5;
}
</style>