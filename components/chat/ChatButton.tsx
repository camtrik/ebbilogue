'use client'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import ChatDialog from './ChatDialog'

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
        aria-label="打开聊天"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <ChatDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
