<template>
  <div class="flex h-screen bg-gray-50 text-gray-900">
    <!-- 左侧对话历史 -->
    <div class="w-96 border-r border-gray-200 bg-white shadow-sm flex flex-col">
      <div class="p-4 border-b border-gray-200 bg-gray-50">
        <h2 class="text-lg font-semibold text-gray-800">对话历史</h2>
      </div>
      <ChatHistory class="flex-1" ref="chatHistoryRef" @restore="handleRestoreHistory" />

      <!-- 底部输入框 -->
      <div class="border-t border-gray-200 bg-white p-4">
        <div class="flex items-center space-x-3 gap-5">
          <input
            v-model="inputValue"
            type="text"
            placeholder="输入修改指令..."
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keydown.enter="handleSubmit"
            :disabled="isLoading"
          />
          <button
            class="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-md hover:bg-blue-700 transition-colors font-medium"
            @click="handleSubmit"
            :disabled="isLoading"
          >
            {{ isLoading ? '处理中...' : '提交' }}
          </button>
        </div>
      </div>
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
        <MarkdownEditor ref="markdownEditorRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatHistory from './ChatHistory.vue'
import MarkdownEditor from './MarkdownEditor.vue'
import { markdownStreamService } from '../api/sse-service'
import { message } from 'ant-design-vue'

const chatHistoryRef = ref<InstanceType<typeof ChatHistory>>()
const markdownEditorRef = ref<InstanceType<typeof MarkdownEditor>>()
const inputValue = ref('')
const isLoading = ref(false)

const handleSubmit = () => {
  if (!inputValue.value.trim() || isLoading.value) return

  const content = inputValue.value
  isLoading.value = true

  chatHistoryRef.value?.addHistoryItem('user', content, content)

  inputValue.value = ''

  markdownStreamService.edit(
    {
      selected_text: '', // 这里需要根据实际选中的文本获取
      markdown: '无关紧要的占位内容',
      instructions: content,
      edit_mode: 'replace',
    },
    {
      onmessage: (data) => {
        console.log('onmessage ==>', data)
        switch (data.type) {
          case 'start':
            console.log('Starting markdown edit process...')
            break
          case 'chunk':
            if (data.content) {
              // 实时更新编辑器内容
              markdownEditorRef.value?.updateContent(data.content)
            }
            break
          case 'done':
            if (data.full_content) {
              const aiResponse = 'AI 已处理您的请求：' + content
              chatHistoryRef.value?.addHistoryItem('ai', aiResponse, data.full_content)
              // 最终更新编辑器内容
              markdownEditorRef.value?.updateContent(data.full_content)
            }
            isLoading.value = false
            break
          case 'error':
            const errorResponse = 'AI 处理失败：' + (data.error || 'Unknown error')
            chatHistoryRef.value?.addHistoryItem('ai', errorResponse, data.error || 'Unknown error')
            isLoading.value = false
            break
        }
      },
      onerror: (error) => {
        console.error('API 调用失败:', error)
        const errorResponse = 'API 调用失败，请稍后重试'
        chatHistoryRef.value?.addHistoryItem('ai', errorResponse, 'API 调用失败')
        isLoading.value = false
      },
      onclose: () => {
        isLoading.value = false
      },
    },
  )
}

const handleRestoreHistory = (item: any) => {
  console.log('恢复历史记录:', item)
  // 更新编辑器内容
  markdownEditorRef.value?.updateContent(item.content)
  // 显示成功提示
  message.success('已成功恢复历史内容')
}
</script>

<style scoped>
/* 布局样式 */
</style>
