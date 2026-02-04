<template>
  <div class="overflow-y-auto">
    <div class="p-8 text-center text-gray-500">
      <div class="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <p class="mb-2 font-medium">开始编辑 Markdown 文档</p>
      <p class="text-sm">选中内容后输入修改指令</p>
    </div>

    <HistoryBubble
      v-for="item in historyList"
      :key="item.id"
      :type="item.type"
      :timestamp="item.timestamp"
      :title="item.title"
      :content="item.content"
      @click="handleHistoryClick(item)"
      @restore="handleRestore(item)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HistoryBubble from './HistoryBubble.vue'

interface HistoryItem {
  id: number
  type: 'user' | 'ai'
  timestamp: string
  title: string
  content: string
}

const historyList = ref<HistoryItem[]>([])

const handleHistoryClick = (item: HistoryItem) => {
  console.log('点击历史记录:', item)
}

const handleRestore = (item: HistoryItem) => {
  console.log('恢复历史记录:', item)
  emit('restore', item)
}

const addHistoryItem = (type: 'user' | 'ai', title: string, content: string) => {
  const now = new Date()
  const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  const newItem: HistoryItem = {
    id: Date.now(),
    type,
    timestamp,
    title,
    content,
  }

  historyList.value.unshift(newItem)
}

const emit = defineEmits<{
  restore: [item: HistoryItem]
}>()

defineExpose({
  addHistoryItem,
})
</script>

<style scoped></style>
