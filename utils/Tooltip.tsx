'use client'
import { useState, ReactNode, cloneElement, isValidElement } from 'react'

interface TooltipProps {
  children: ReactNode
  title: string | ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  distance?: number
  minWidth?: string
  className?: string
}

export default function Tooltip({
  children,
  title,
  placement = 'right',
  distance = 10,
  minWidth = '250px',
  className = '',
}: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getPositionStyles = () => {
    switch (placement) {
      case 'top':
        return {
          position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full',
          spacing: { marginTop: -distance },
          transform: isHovered
            ? 'translate(-50%, -100%)'
            : `translate(-50%, calc(-100% + ${distance}px))`,
          arrow:
            'bottom-0 left-1/2 translate-y-full -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-200 dark:border-t-gray-700',
        }
      case 'bottom':
        return {
          position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full',
          spacing: { marginBottom: -distance },
          transform: isHovered
            ? 'translate(-50%, 100%)'
            : `translate(-50%, calc(100% - ${distance}px))`,
          arrow:
            'top-0 left-1/2 -translate-y-full -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-200 dark:border-b-gray-700',
        }
      case 'left':
        return {
          position: 'left-0 top-1/2 -translate-x-full -translate-y-1/2',
          spacing: { marginLeft: -distance },
          transform: isHovered
            ? 'translate(-100%, -50%)'
            : `translate(calc(-100% + ${distance}px), -50%)`,
          arrow:
            'right-0 top-1/2 translate-x-full -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-transparent border-l-gray-200 dark:border-l-gray-700',
        }
      case 'right':
        return {
          position: 'right-0 top-1/2 translate-x-full -translate-y-1/2',
          spacing: { marginRight: -distance },
          transform: isHovered
            ? 'translate(100%, -50%)'
            : `translate(calc(100% - ${distance}px), -50%)`,
          arrow:
            'left-0 top-1/2 -translate-x-full -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200 dark:border-r-gray-700',
        }
      default:
        return {
          position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full',
          spacing: { marginTop: -distance },
          transform: isHovered
            ? 'translate(-50%, -100%)'
            : `translate(-50%, calc(-100% + ${distance}px))`,
          arrow:
            'bottom-0 left-1/2 translate-y-full -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-200 dark:border-t-gray-700',
        }
    }
  }

  const { position, transform, arrow, spacing } = getPositionStyles()

  // 处理鼠标事件
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  // 渲染子元素
  const renderChildren = () => {
    // 如果是字符串，使用 blockquote
    if (typeof children === 'string') {
      return (
        <blockquote
          className="cursor-help italic"
          style={{
            margin: '0',
            padding: '0 0 0 1rem',
          }}
        >
          {children}
        </blockquote>
      )
    }

    // 如果是有效的 React 元素，复制它并添加事件处理程序
    if (isValidElement(children)) {
      // 不再尝试包装元素，直接返回
      return children
    }

    // 其他情况
    return children
  }

  return (
    <div className={`${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {renderChildren()}

      <div
        className={`
          absolute ${position} max-w-md rounded-lg border border-gray-200 
          bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800
          ${isHovered ? 'opacity-100' : 'opacity-0'} 
          z-10 transition-all duration-300 ease-in-out
        `}
        style={{
          minWidth: minWidth,
          transform: transform,
          ...spacing,
        }}
      >
        <div className={`absolute ${arrow} h-0 w-0`}></div>
        <p className="text-sm">
          <span className="font-semibold text-gray-500 dark:text-gray-400"></span> {title}
        </p>
      </div>
    </div>
  )
}
