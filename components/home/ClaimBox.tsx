'use client'
import { useTranslation } from 'utils/locale'
import LocaleText from '@/components/LocaleText'

export default function ClaimBox() {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center gap-2 py-2 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <div className="text-xl text-gray-600 dark:text-gray-300">{t('home.ai_notice')}</div>
    </div>
  )
}
