'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Link from './Link'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuItem } from '@/types/menu'
import { ChevronDown } from 'lucide-react'

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
  const [isOpen, setIsOpen] = useState(false)
  const dropDownRef = useRef<HTMLDivElement>(null)

  // if the user clicks outside the dropdown, close it, use the ref to check if the click is outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

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
    <div className={`group relative ${className}`} ref={dropDownRef}>
      <div
        className="flex cursor-pointer items-center"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggle()
          }
        }}
      >
        {trigger}
        <ChevronDown
          size={16}
          className={`${isOpen ? 'rotate-180' : ''} transition-transform duration-300`}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative top-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="absolute left-1/2 mt-2 -translate-x-1/2 transition-all duration-300">
              <div className="relative top-0">
                <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-gray-800"></div>
                <div className="relative flex min-w-max flex-col items-start justify-center gap-1 whitespace-nowrap rounded-lg bg-gray-800/95 p-1 shadow-lg">
                  {items.map((item) => (
                    <Link
                      key={item.titleKey}
                      href={item.href}
                      className="rounded-lg px-4 py-1.5 text-lg text-gray-200
                      transition-colors duration-200 hover:bg-primary-500/50 hover:text-white"
                      onClick={() => {
                        setIsOpen(false)
                        onItemClick && onItemClick()
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleToggle()
                        }
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownMenu
