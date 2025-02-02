'use client'
import { ReactNode } from 'react'
import Link from './Link'
import { motion } from 'framer-motion'
import { MenuItem } from '@/types/menu'

interface DropdownMenuProps {
  items: MenuItem[]
  trigger: ReactNode
  mobile?: boolean
  onItemClick?: () => void
  className?: string
}

const DropdownMenu = ({
  items,
  trigger,
  mobile = false,
  onItemClick,
  className = '',
}: DropdownMenuProps) => {
  if (mobile) {
    return (
      <div className="ml-8 flex flex-col space-y-2 rounded-2xl bg-gray-800/95 p-2">
        {items.map((item) => (
          <Link
            key={item.titleKey}
            href={item.href}
            className="rounded-full px-6 py-2 text-lg text-gray-200
            transition-colors duration-200 hover:bg-primary-500/50 hover:text-white"
            onClick={onItemClick}
          >
            {item.title}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className={`group relative ${className}`}>
      {trigger}
      <div
        className="invisible absolute left-1/2 mt-2 -translate-x-1/2 opacity-0 
        transition-all duration-300 group-hover:visible group-hover:opacity-100"
      >
        <div className="relative top-0">
          <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-gray-800"></div>
          <div className="relative min-w-max flex flex-row items-center justify-center gap-1 rounded-full bg-gray-800/95 p-1 shadow-lg whitespace-nowrap">
            {items.map((item) => (
              <Link
                key={item.titleKey}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-lg text-gray-200
                transition-colors duration-200 hover:bg-primary-500/50 hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropdownMenu
