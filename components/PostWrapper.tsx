'use client'

import React, { ReactNode } from 'react'
import NeedAccessContent from '@/components/NeedAccessContent'

interface PostWrapperProps {
  needAccess?: boolean
  children: ReactNode
}

export default function PostWrapper({ needAccess = false, children }: PostWrapperProps) {
  return (
    <NeedAccessContent needAccess={needAccess} displayMode="page">
      {children}
    </NeedAccessContent>
  )
} 