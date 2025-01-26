'use client'
import { useContext } from 'react'
import { LanguageContext } from 'utils/locale'

interface LocaleTextProps {
  children: React.ReactNode
  className?: string
}

export default function LocaleText({ children, className = '' }: LocaleTextProps) {
  const { currentLang } = useContext(LanguageContext)

  const textClass =
    currentLang === 'zh' ? 'chinese-text' : currentLang === 'ja' ? 'japanese-text' : ''

  return <span className={`${textClass} ${className}`}>{children}</span>
}
