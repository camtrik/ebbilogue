'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'utils/locale'

export interface TOCItem {
  value: string
  depth: number
  url: string
}

interface TOCProps {
  toc: TOCItem[]
  activeSection?: string
}

export default function TOC({ toc, activeSection }: TOCProps) {
  const { t } = useTranslation()
  const [currentSection, setCurrentSection] = useState(activeSection)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headers.forEach((header) => observer.observe(header))

    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      headers.forEach((header) => observer.unobserve(header))
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault()
    const element = document.getElementById(url.slice(1))
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // 计算缩进大小的辅助函数
  const getIndentClass = (depth: number) => {
    switch (depth) {
      case 1:
        return ''
      case 2:
        return 'pl-3'
      case 3:
        return 'pl-6'
      case 4:
        return 'pl-9'
      default:
        return 'pl-9'
    }
  }

  return (
    <div className="hidden xl:block">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="sticky top-24 w-[250px]"
          >
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h3 className="mb-2 text-lg font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t('toc')}
              </h3>
              <nav>
                <ul className="space-y-5">
                  {toc.map((item) => {
                    const isActive = currentSection === item.url.slice(1)
                    return (
                      <li key={item.value} className={getIndentClass(item.depth)}>
                        <a
                          href={item.url}
                          onClick={(e) => handleClick(e, item.url)}
                          className={`
                            block max-w-[220px] truncate border-l-2 pl-2 text-[16px] leading-5
                            transition-all hover:text-primary-500
                            ${
                              isActive
                                ? 'border-primary-500 text-primary-500 dark:text-primary-400'
                                : 'border-transparent text-gray-600 hover:border-gray-300 dark:text-gray-400'
                            }
                          `}
                          title={item.value}
                        >
                          {item.value}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
