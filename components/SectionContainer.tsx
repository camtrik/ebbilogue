'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface Props {
  children: ReactNode
  maxWidth?: string
}

export default function SectionContainer({ children }: Props) {
  const pathname = usePathname()
  const maxWidth =
    pathname === '/album' ? 'max-w-5xl xl:max-w-6xl 2xl:max-w-[1400px]' : 'max-w-3xl xl:max-w-5xl'

  return <section className={`mx-auto ${maxWidth} px-4 sm:px-6 xl:px-0`}>{children}</section>
}
