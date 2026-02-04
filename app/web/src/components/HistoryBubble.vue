<template>
  <div
    class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
    @click="$emit('click')"
  >
    <div class="flex justify-between items-start">
      <div class="text-xs text-gray-500">{{ timestamp }}</div>
      <div class="flex items-center space-x-2">
        <a-popconfirm
          v-if="type === 'ai'"
          title="确定要使用这条记录的内容吗？"
          @confirm="$emit('restore')"
        >
          <template #icon>
            <rollback-outlined />
          </template>
          <button
            class="p-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            title="使用这条记录的内容"
            style="font-size: 12px;"
          >
            <rollback-outlined />
          </button>
        </a-popconfirm>
        <div
          class="text-xs px-2 py-0.5 rounded-full"
          :class="type === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'"
        >
          {{ type === 'user' ? '用户' : 'AI 回复' }}
        </div>
      </div>
    </div>
    <div class="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
      {{ title }}
    </div>
    <div class="mt-1 text-xs text-gray-600 line-clamp-2">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { RollbackOutlined } from '@ant-design/icons-vue'
import { Popconfirm as APopconfirm } from 'ant-design-vue'

interface Props {
  type: 'user' | 'ai'
  timestamp: string
  title: string
  content: string
}

defineProps<Props>()

defineEmits<{
  click: []
  restore: []
}>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
