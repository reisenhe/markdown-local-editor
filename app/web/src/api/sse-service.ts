import sseService from './sse'
import type { MarkdownEditRequest } from '../types/service'

interface MarkdownEditStreamResponse {
  type: 'start' | 'chunk' | 'done' | 'error'
  message?: string
  content?: string
  full_content?: string
  error?: string
  success?: boolean
}

export const markdownStreamService = {
  edit: (
    params: Omit<MarkdownEditRequest, 'stream'>,
    options: {
      onmessage?: (data: MarkdownEditStreamResponse) => void
      onerror?: (error: any) => void
      onclose?: () => void
    },
  ) => {
    const streamParams = {
      ...params,
      stream: true,
    }
    return sseService.connect('/proxyApi/api/markdown/edit/stream', {
      body: JSON.stringify(streamParams),
      onmessage: (data) => {
        options.onmessage?.(data)
      },
      onerror: (error) => {
        options.onerror?.(error)
      },
      onclose: () => {
        options.onclose?.()
      },
    })
  },
  disconnect: () => {
    sseService.disconnect()
  },
}
