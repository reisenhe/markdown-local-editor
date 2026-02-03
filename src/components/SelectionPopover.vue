<template>
  <a-popover
    v-model:open="visible"
    placement="top"
    trigger="manual"
    :get-popup-container="(triggerNode: HTMLElement) => triggerNode.parentElement"
  >
    <template #content>
      <div class="selection-popover-content">
        <a-input
          ref="inputRef"
          v-model:value="userInput"
          placeholder="问问 AI"
          class="ai-input"
          @keydown="handleKeydown"
        />
      </div>
    </template>
    <!-- 使用一个隐藏的 span 作为定位锚点 -->
    <span
      ref="anchorRef"
      class="selection-anchor"
      :style="{
        position: 'absolute',
        left: anchorPosition.x + 'px',
        top: anchorPosition.y + 'px',
        width: '1px',
        height: '1px',
        pointerEvents: 'none',
      }"
    ></span>
  </a-popover>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  editorElement?: HTMLElement | null
}>()

const visible = ref(false)
const userInput = ref('')
const selectedText = ref('')
const anchorRef = ref<HTMLElement>()
const inputRef = ref()
const anchorPosition = ref({ x: 0, y: 0 })

// 组件挂载时添加全局鼠标松开事件监听
import { onMounted } from 'vue'

onMounted(() => {
  console.log('SelectionPopover 组件挂载，添加全局 mouseup 事件监听')
  document.addEventListener('mouseup', handleMouseUp)
})

// 处理鼠标松开事件
const handleMouseUp = (e: MouseEvent) => {
  console.log('鼠标松开事件触发')
  const target = e.target as HTMLElement

  // 检查点击是否在弹窗内部
  if (target.closest('.ant-popover')) {
    console.log('点击在弹窗内部，不处理')
    return
  }

  // 检查点击是否在输入框内部
  if (target.closest('.ai-input')) {
    console.log('点击在输入框内部，不处理')
    return
  }

  // 延迟一小段时间，确保选区已经稳定
  setTimeout(() => {
    const selection = window.getSelection()
    console.log('选区信息:', {
      selection,
      hasSelection: !!selection,
      isCollapsed: selection?.isCollapsed,
    })

    if (!selection || selection.isCollapsed) {
      // 没有选中内容，隐藏弹窗
      console.log('没有选中内容或选区已折叠')
      visible.value = false
      return
    }

    const text = selection.toString().trim()
    console.log('选中的文本:', text)

    if (!text) {
      console.log('选中的文本为空')
      visible.value = false
      return
    }

    // 检查选中的文本是否在编辑器元素内
    if (props.editorElement) {
      const range = selection.getRangeAt(0)
      const commonAncestor = range.commonAncestorContainer
      const isInEditor = props.editorElement.contains(commonAncestor)
      console.log('选中的文本是否在编辑器内:', isInEditor)
      if (!isInEditor) {
        console.log('选中的文本不在编辑器内')
        visible.value = false
        return
      }
    }

    // 保存选中的文本
    selectedText.value = text

    // 获取选区的位置
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    console.log('选区位置:', rect)

    // 计算弹窗的锚点位置（选区中心点的上方）
    anchorPosition.value = {
      x: rect.left + rect.width / 2,
      y: rect.top - 10, // 在选区上方 10px
    }
    console.log('锚点位置:', anchorPosition.value)

    // 显示弹窗
    console.log('显示弹窗')
    visible.value = true

    // 聚焦输入框
    nextTick(() => {
      inputRef.value?.focus()
    })
  }, 10)
}

// 处理提交
const handleSubmit = () => {
  if (!userInput.value.trim()) {
    return
  }

  console.log('用户输入:', userInput.value)
  console.log('选中文本:', selectedText.value)

  // 重置状态
  userInput.value = ''
  visible.value = false
}

// 处理取消
const handleCancel = () => {
  userInput.value = ''
  visible.value = false
}

// 处理键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSubmit()
  } else if (e.key === 'Escape') {
    handleCancel()
  }
}

// 监听点击其他区域关闭弹窗
watch(visible, (newVisible) => {
  if (newVisible) {
    // 延迟添加全局点击监听，避免立即触发
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)
  } else {
    document.removeEventListener('mousedown', handleClickOutside)
  }
})

// 处理点击外部区域
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement

  // 检查点击是否在弹窗内部
  if (target.closest('.ant-popover')) {
    return
  }

  // 检查点击是否在输入框内部
  if (target.closest('.ai-input')) {
    return
  }

  // 关闭弹窗
  visible.value = false
}

// 组件卸载时清理事件监听
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  console.log('SelectionPopover 组件卸载，移除全局 mouseup 事件监听')
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.selection-anchor {
  z-index: 1000;
}

.selection-popover-content {
  min-width: 300px;
  padding: 8px;
}

.ai-input {
  width: 100%;
}
</style>
