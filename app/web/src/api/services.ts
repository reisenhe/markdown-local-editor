import axiosService from './axios'
import type { MarkdownEditRequest, MarkdownEditResponse } from '../types/service'

export const markdownService = {
  edit: async (params: MarkdownEditRequest): Promise<MarkdownEditResponse> => {
    return axiosService.post('/api/markdown/edit', params)
  },
}
