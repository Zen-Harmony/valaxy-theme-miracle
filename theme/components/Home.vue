<script setup lang="ts">
import { useSiteConfig } from 'valaxy'
import { useCardHover } from '../composables/useCardHover'

const siteConfig = useSiteConfig()
const { handleMouseMove, handleMouseEnter, handleMouseLeave } = useCardHover()

// 模拟数据 - 实际使用时应该从配置或 API 获取
const homePageData = {
  avatar: 'https://via.placeholder.com/200',
  author: 'Your Name',
  city: 'Your City',
  introduce: 'Welcome to your Valaxy blog!',
  github: '',
  modules: {
    banner: 'avatar'
  }
}
</script>

<template>
  <div
    class="first-page"
    v-if="homePageData.modules.banner === 'avatar'"
  >
    <img :src="homePageData.avatar" class="avatar" alt="Avatar" />
    <div class="self">
      <h1 class="author">{{ homePageData.author }}</h1>
      <p class="introduce">{{ homePageData.introduce }}</p>
      <div class="btns">
        <div class="location btn">
          <i class="i-fluent:location-16-regular"></i>
          {{ homePageData.city }}
        </div>
        <a
          :href="`https://github.com/${homePageData.github}`"
          class="github btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="i-lucide:github"></i> GitHub
        </a>
      </div>
    </div>
  </div>
  <div
    class="image-page"
    v-else
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <img :src="homePageData.modules.banner" alt="Banner" />
  </div>
</template>

<style scoped>
.first-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin: 125px 0px;
}

.avatar {
  height: 112px;
  width: 112px;
  aspect-ratio: 1;
  border-radius: 100%;
  border: 1px solid var(--va-c-divider);
  padding: 4px;
}

.self {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.btns {
  display: flex;
  gap: 28px;
}

.btn {
  color: var(--va-c-text-1);
  font-weight: 500;
}

.image-page {
  width: 100% !important;
  margin: 20px 0px;
  height: calc(65vh - var(--va-nav-height));
  transition: all var(--va-transition-time);
  border-radius: var(--va-border-radius-1);
  box-shadow: var(--va-shadow);
  border: 1px solid var(--va-c-divider);
  background-repeat: no-repeat;
  padding: 12px;
  &:hover {
    box-shadow: var(--va-shadow-brand);
    border-color: var(--va-c-brand);
  }
}

.image-page img {
  height: 100%;
  width: 100%;
  border-radius: var(--va-border-radius-2);
  object-fit: cover;
  transition: all var(--va-transition-time);
  object-position: center;
}
</style>