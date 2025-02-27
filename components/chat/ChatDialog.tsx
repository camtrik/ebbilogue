// ChatDialog.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatDialogProps {
  open: boolean
  onClose: () => void
}

export default function ChatDialog({ open, onClose }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [provider, setProvider] = useState('anthropic') // 默认使用anthropic
  const [sessionId, setSessionId] = useState('') // 保存会话ID
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  // 重置会话
  const resetSession = () => {
    setSessionId('')
    setMessages([])
  }

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: provider,
          message: input,
          session_id: sessionId, // 发送会话ID，如果是新会话则为空字符串
        }),
      })

      if (!response.ok) {
        throw new Error('API 请求失败')
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])

      // 保存会话ID用于后续对话
      if (data.session_id) {
        setSessionId(data.session_id)
      }
    } catch (error) {
      console.error('发送消息失败:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '抱歉，发生了错误。请稍后重试。' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 m-4 flex h-[600px] w-[400px] flex-col rounded-lg bg-white shadow-xl dark:bg-gray-800">
      {/* 头部 */}
      <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI 助手</h3>
        <div className="flex items-center space-x-2">
          {/* 提供者选择 */}
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="anthropic">Claude</option>
            <option value="tencent">Tencent-Deepseek</option>
          </select>

          {/* 新会话按钮 */}
          <button
            onClick={resetSession}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            新会话
          </button>

          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="关闭对话"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                } max-w-[80%]`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
                <div className="animate-pulse">正在输入...</div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="border-t p-4 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息..."
            className="flex-1 rounded-lg border bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
