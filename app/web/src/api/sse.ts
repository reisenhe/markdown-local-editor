import { fetchEventSource } from '@microsoft/fetch-event-source'

interface SSEOptions {
  onopen?: (response: Response) => Promise<void>
  onmessage?: (data: any) => void
  onerror?: (error: any) => void
  onclose?: () => void
  signal?: AbortSignal
  headers?: Record<string, string>
  body?: string
}

class SSEService {
  private controller: AbortController | null = null

  connect(url: string, options: SSEOptions) {
    this.controller = new AbortController()

    return fetchEventSource(url, {
      signal: this.controller.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'your-secret-api-key-here',
        ...options.headers,
      },
      body: options.body,
      async onopen(response) {
        if (options.onopen) {
          await options.onopen(response)
        }
      },
      onmessage: (event) => {
        if (event.data === '[DONE]') {
          options.onclose?.()
          return
        }
        try {
          const data = JSON.parse(event.data)
          options.onmessage?.(data)
        } catch (error) {
          options.onmessage?.(event.data)
        }
      },
      onerror: options.onerror,
      onclose: options.onclose,
    })
  }

  disconnect() {
    if (this.controller) {
      this.controller.abort()
      this.controller = null
    }
  }
}

const sseService = new SSEService()

export default sseService
