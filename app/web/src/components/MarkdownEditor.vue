<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
    <div class="border-b border-gray-200 px-4 py-3 bg-gray-50">
      <div class="flex items-center space-x-3">
        <button
          class="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
        >
          编辑
        </button>
        <button
          class="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
        >
          预览
        </button>
        <div class="ml-auto flex items-center space-x-2">
          <button class="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </button>
          <button class="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div ref="editorContainer" class="p-6">
      <EditorContent :editor="editor" />
      <SelectionPopover :editor-element="editorElement" :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import markdownit from 'markdown-it'
import SelectionPopover from './SelectionPopover.vue'

// 初始化markdown-it实例
const md = new markdownit()

// 编辑器容器引用
const editorContainer = ref<HTMLElement>()
const editorElement = ref<HTMLElement | null>(null)

const editor = useEditor({
  extensions: [StarterKit],
})

const updateContent = (newContent: string) => {
  if (editor.value) {
    const blockContent = md.render(newContent)
    editor.value.commands.setContent(blockContent)
  }
}

defineExpose({
  updateContent,
})

// 获取编辑器的 DOM 元素
onMounted(() => {
  if (editorContainer.value) {
    // 查找 .tiptap 编辑器元素
    editorElement.value = editorContainer.value.querySelector('.tiptap')
  }
})
</script>

<style>
/* 编辑器样式 */
.tiptap {
  min-height: 500px;
  outline: none;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 确保编辑器内的标题样式不受 Tailwind 影响 */
.tiptap h1 {
  font-size: 2rem !important;
  font-weight: 700 !important;
  margin-bottom: 1.5rem !important;
  margin-top: 0 !important;
  color: #1a202c !important;
}

.tiptap h2 {
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  margin-bottom: 1rem !important;
  margin-top: 2rem !important;
  color: #2d3748 !important;
}

.tiptap h3 {
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  margin-bottom: 0.75rem !important;
  margin-top: 1.5rem !important;
  color: #2d3748 !important;
}

.tiptap h4 {
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  margin-bottom: 0.5rem !important;
  margin-top: 1.25rem !important;
  color: #2d3748 !important;
}

.tiptap h5 {
  font-size: 1rem !important;
  font-weight: 600 !important;
  margin-bottom: 0.5rem !important;
  margin-top: 1rem !important;
  color: #2d3748 !important;
}

.tiptap h6 {
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  margin-bottom: 0.5rem !important;
  margin-top: 1rem !important;
  color: #4a5568 !important;
}

/* 确保编辑器内的段落样式不受 Tailwind 影响 */
.tiptap p {
  line-height: 1.75 !important;
  color: #4a5568 !important;
}

/* 确保编辑器内的列表样式不受 Tailwind 影响 */
.tiptap ul {
  margin-bottom: 1.25rem !important;
  padding-left: 1.5rem !important;
  color: #4a5568 !important;
  list-style-type: disc !important;
}

.tiptap ol {
  margin-bottom: 1.25rem !important;
  padding-left: 1.5rem !important;
  color: #4a5568 !important;
  list-style-type: decimal !important;
}

.tiptap li {
  margin-bottom: 0.5rem !important;
  line-height: 1.75 !important;
}

/* 确保编辑器内的强调样式不受 Tailwind 影响 */
.tiptap strong {
  font-weight: 600 !important;
  color: #1a202c !important;
}

.tiptap em {
  font-style: italic !important;
  color: #4a5568 !important;
}

/* 确保编辑器内的代码样式不受 Tailwind 影响 */
.tiptap code {
  background-color: #f7fafc !important;
  padding: 0.2em 0.4em !important;
  border-radius: 0.375rem !important;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
  font-size: 0.875rem !important;
  color: #e53e3e !important;
}

.tiptap pre {
  background-color: #f7fafc !important;
  padding: 1rem !important;
  border-radius: 0.375rem !important;
  overflow-x: auto !important;
  margin-bottom: 1.25rem !important;
}

.tiptap pre code {
  background-color: transparent !important;
  padding: 0 !important;
  color: #2d3748 !important;
}

/* 确保编辑器内的引用样式不受 Tailwind 影响 */
.tiptap blockquote {
  border-left: 4px solid #e2e8f0 !important;
  padding-left: 1rem !important;
  margin-bottom: 1.25rem !important;
  font-style: italic !important;
  color: #718096 !important;
}
</style>
