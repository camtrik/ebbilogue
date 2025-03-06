// app/api/chat/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message, provider, session_id } = await request.json()
    const charBaseUrl = process.env.CHAT_BASE_URL
    console.log('charBaseUrl: ', charBaseUrl)
    const response = await fetch(`${charBaseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: provider || 'tencent',
        message: message,
        session_id: session_id || '', // 如果没有提供则为空
      }),
    })

    if (!response.ok) {
      throw new Error('API 请求失败')
    }

    const data = await response.json()
    return NextResponse.json({
      role: 'assistant',
      content: data.response,
      session_id: data.session_id, // 返回会话ID给前端
    })
  } catch (error) {
    console.error('API 错误:', error)
    return NextResponse.json({ error: '处理请求时发生错误' }, { status: 500 })
  }
}
