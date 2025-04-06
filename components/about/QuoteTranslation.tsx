'use client'
import { useState } from 'react'

interface QuoteTranslationProps {
  children: string
  en?: string
  ja?: string
}

export default function QuoteTranslation({ children, en, ja }: QuoteTranslationProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative inline-block">
      <blockquote
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-help border-l-4 border-gray-300 pl-4 italic"
      >
        {children}
      </blockquote>
      <div
        className={`
          absolute left-full top-0 ml-4 max-w-md transform rounded-lg border border-gray-200 
          bg-white p-4 shadow-lg dark:border-gray-700 
          dark:bg-gray-800 ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'} 
          z-10 transition-all duration-300 ease-in-out
        `}
        style={{ minWidth: '250px' }}
      >
        {ja && (
          <p className="mb-2 text-sm">
            <span className="font-semibold text-gray-500 dark:text-gray-400"></span> {ja}
          </p>
        )}
        {en && (
          <p className="text-sm">
            <span className="font-semibold text-gray-500 dark:text-gray-400"></span> {en}
          </p>
        )}
      </div>
    </div>
  )
}
