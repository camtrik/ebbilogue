'use client'
import { useContext, useState } from 'react'
// import { useEffect, useState } from 'react'
import { LanguageContext } from 'utils/locale'

const LocaleSwitch = () => {
  const { currentLang, setCurrentLang } = useContext(LanguageContext)
  const [isOpen, setIsOpen] = useState(false)

  const languages = {
    zh: '中文',
    ja: '日本語',
    en: 'English',
  }
  // When mounted on client, now we can show the UI
  //   useEffect(() => setMounted(true), [])

  return (
    <div className="relative">
      <button
        aria-label="Toggle Language"
        className={`flex items-center gap-1 rounded-md border px-3 py-2 
          hover:bg-gray-100 dark:hover:bg-gray-800
          ${currentLang !== 'en' ? 'border-gray-300' : 'border-gray-300'}
          transform duration-200`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 text-gray-600 dark:text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span className="text-sm text-gray-700 dark:text-gray-300">{languages[currentLang]}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="ml-1 h-3 w-3 text-gray-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-32 transform rounded-md bg-white shadow-lg
          transition-all duration-200 ease-in-out dark:bg-gray-800
          ${isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
      >
        <div className="py-1">
          {Object.entries(languages).map(([code, label]) => (
            <button
              key={code}
              className={`block w-full px-4 py-2 text-left text-sm 
                transition-colors duration-200 ease-in-out
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${currentLang === code ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              onClick={() => {
                setCurrentLang(code)
                setIsOpen(false)
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocaleSwitch
