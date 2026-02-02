<template>
  <div class="h-full overflow-y-auto">
    <!-- 提示信息 -->
    <div class="p-8 text-center text-gray-500">
      <div class="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <p class="mb-2 font-medium">开始编辑 Markdown 文档</p>
      <p class="text-sm">选中内容后输入修改指令</p>
    </div>
    
    <!-- 历史记录示例 -->
    <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
      <div class="flex justify-between items-start">
        <div class="text-xs text-gray-500">2026-02-02 17:00</div>
        <div class="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">AI 回复</div>
      </div>
      <div class="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
        改写为更口语化的表达
      </div>
      <div class="mt-1 text-xs text-gray-600 line-clamp-2">
        在长文写作或技术文档场景中，用户经常希望对已有 Markdown 文档中的某一小段内容进行精细修改，而不是让 LLM 重写整篇文档。
      </div>
    </div>
    
    <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
      <div class="flex justify-between items-start">
        <div class="text-xs text-gray-500">2026-02-02 16:30</div>
        <div class="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">用户</div>
      </div>
      <div class="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
        修正事实错误，并保持客观语气
      </div>
      <div class="mt-1 text-xs text-gray-600 line-clamp-2">
        现有多数产品要么只能整体改写，要么局部编辑体验较差（需要手动复制粘贴、容易破坏原有格式）。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 对话历史组件
</script>

<style scoped>
/* 对话历史样式 */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>