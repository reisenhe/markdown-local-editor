<template>
  <div class="flex h-screen bg-gray-50 text-gray-900">
    <!-- 左侧对话历史 -->
    <div class="w-96 border-r border-gray-200 bg-white shadow-sm">
      <div class="p-4 border-b border-gray-200 bg-gray-50">
        <h2 class="text-lg font-semibold text-gray-800">对话历史</h2>
      </div>
      <ChatHistory />
    </div>

    <!-- 右侧编辑器 -->
    <div class="flex-1 flex flex-col">
      <div
        class="p-4 border-b border-gray-200 bg-white shadow-sm flex justify-between items-center"
      >
        <h2 class="text-lg font-semibold text-gray-800">Markdown 编辑器</h2>
        <div class="flex items-center space-x-3">
          <div class="text-sm text-gray-500">版本: 1/1</div>
          <div class="flex space-x-2">
            <button
              class="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <span class="mr-1">←</span> 上一版
            </button>
            <button
              class="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              下一版 <span class="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 p-6 overflow-auto bg-gray-50">
        <MarkdownEditor />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatHistory from './ChatHistory.vue'
import MarkdownEditor from './MarkdownEditor.vue'
</script>

<style scoped>
/* 布局样式 */
</style>
