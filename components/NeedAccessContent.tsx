'use client'

import React, { ReactNode } from 'react'
import { useAuth } from 'contexts/AuthContext'
import { useTranslation } from 'utils/locale'

interface NeedAccessContentProps {
  needAccess?: boolean
  children: ReactNode
  displayMode?: 'page' | 'hover' | 'none'
  renderLock?: (showLock: boolean) => ReactNode
}

export default function NeedAccessContent({
  needAccess = false,
  children,
  displayMode = 'page',
  renderLock,
}: NeedAccessContentProps) {
  const { haveAccess } = useAuth()
  const { t } = useTranslation()
  const isRestricted = needAccess === true && !haveAccess

  // 如果用户有权限访问，或者内容不需要特殊权限，直接显示内容
  if (!isRestricted) {
    return <>{children}</>
  }

  // 如果使用hover模式，不阻止内容显示，但会通过renderLock回调提供锁图标渲染
  if (displayMode === 'hover' && renderLock) {
    return renderLock(true)
  }

  // 如果不显示任何替代内容，则返回null
  if (displayMode === 'none') {
    return null
  }

  // 默认显示页面级别的访问限制提示
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-24 w-24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </div>
      <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">
        {t('auth.restricted_content')}
      </h2>
      <p className="mb-8 max-w-md text-lg text-gray-600 dark:text-gray-400">
        {t('auth.need_access')}
      </p>
      <div className="text-gray-500 dark:text-gray-400">
        <p>{t('auth.admin_contact')}</p>
      </div>
    </div>
  )
}
