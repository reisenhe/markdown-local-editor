// Markdown 编辑请求接口
export interface MarkdownEditRequest {
  selected_text?: string // 选中的文本
  markdown: string // 包含选中文本的完整块
  instructions: string // 修改指令
  edit_mode: 'replace'
  stream: boolean
}

// Markdown 编辑响应接口
export interface MarkdownEditResponse {
  success: boolean // 是否成功
  updated_block: string // 更新后的块（成功时）
  error: string // 错误信息（失败时）
}
