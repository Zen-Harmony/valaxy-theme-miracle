<script setup lang="ts">
import { useCardHover } from '../composables/useCardHover'

interface CardProps {
  title?: string
  url?: string
  description?: string
  category?: string
  date?: string
  image?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  url: '',
  description: '',
  category: '',
  date: '',
  image: '',
})

const { handleMouseMove, handleMouseEnter, handleMouseLeave } = useCardHover()
</script>

<template>
  <a
    :href="props.url"
    v-if="props.url"
    class="diary"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="props.image" class="img-container">
      <img :src="props.image" alt="Post image" />
    </div>
    <div class="text-place">
      <p class="title" v-if="props.title">{{ props.title }}</p>
      
      <p class="details" v-if="props.description && props.title">{{ props.description }}</p>
      <p class="details notitle" v-else-if="props.description">{{ props.description }}</p>

      <div class="meta">
        <a
          class="category"
          v-if="props.category"
          :href="`/archives?category=${props.category}`"
          >{{ props.category }}</a
        >{{ props.date }}
      </div>
    </div>
  </a>

  <div
    v-else
    class="diary"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="props.image" class="img-container">
      <img :src="props.image" alt="Post image" />
    </div>
    <div class="text-place">
      <p class="title" v-if="props.title">{{ props.title }}</p>
      
      <p class="details" v-if="props.description && props.title">{{ props.description }}</p>
      <p class="details notitle" v-else-if="props.description">{{ props.description }}</p>

      <div class="meta">
        <a
          class="category"
          v-if="props.category"
          :href="`/archives?category=${props.category}`"
          >{{ props.category }}</a
        >{{ props.date }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-container img {
  border-radius: var(--va-border-radius-1) var(--va-border-radius-1) 0 0;
  border-bottom: 1px solid var(--va-c-divider);
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.diary {
  flex: 1;
  border-radius: var(--va-border-radius-1);
  border: 1px solid var(--va-c-divider);
  display: flex;
  flex-direction: column;
  background-color: var(--va-c-bg);
  will-change: transform;
  box-shadow: var(--va-shadow);
  transition: all var(--va-transition-time);
}

.diary:hover {
  border-color: var(--va-c-brand-1);
  box-shadow: var(--va-shadow-brand);
}

.text-place {
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.meta {
  margin-top: auto;
  font-size: 13px;
  color: var(--va-c-text-3);
  opacity: 0.8;
}

.title {
  margin-bottom: 8px !important;
  color: var(--va-c-text-1);
  font-size: 20px;
  line-height: 26px;
  font-weight: 600;
  margin: 0;
  transition: all var(--va-transition-time);
}

.diary:hover .title {
  color: var(--va-c-brand-2);
}

.details {
  color: var(--va-c-text-2);
  font-size: 14px;
  line-height: 20px;
  margin: 0 0 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notitle {
  font-size: 15px;
}

.category {
  margin-right: 8px;
  color: var(--va-c-text-2);
  opacity: 0.8;
  background-color: var(--va-c-border);
  padding: 2px 8px;
  border-radius: var(--va-border-radius-1);
  font-size: 13px;
  &:hover {
    color: var(--va-c-text-1);
    opacity: 1;
  }
}
</style>