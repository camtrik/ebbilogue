'use client'
import { useState, ReactNode, useRef, useEffect } from 'react'

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
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  // 计算tooltip的位置样式
  const getTooltipStyle = () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      minWidth,
      opacity: isHovered ? 1 : 0,
      pointerEvents: 'none',
      zIndex: 10,
    }

    switch (placement) {
      case 'top':
        style.bottom = '100%'
        style.left = '50%'
        style.transform = 'translateX(-50%)'
        style.marginBottom = distance
        break
      case 'bottom':
        style.top = '100%'
        style.left = '50%'
        style.transform = 'translateX(-50%)'
        style.marginTop = distance
        break
      case 'left':
        style.right = '100%'
        style.top = '50%'
        style.transform = 'translateY(-50%)'
        style.marginRight = distance
        break
      case 'right':
      default:
        style.left = '100%'
        style.top = '50%'
        style.transform = 'translateY(-50%)'
        style.marginLeft = distance
        break
    }

    return style
  }

  // 计算箭头的位置样式
  const getArrowStyle = () => {
    const style: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
    }

    switch (placement) {
      case 'top':
        style.bottom = -8
        style.left = '50%'
        style.transform = 'translateX(-50%)'
        style.borderLeft = '8px solid transparent'
        style.borderRight = '8px solid transparent'
        style.borderTop = '8px solid'
        style.borderTopColor = 'var(--tooltip-bg-color)'
        break
      case 'bottom':
        style.top = -8
        style.left = '50%'
        style.transform = 'translateX(-50%)'
        style.borderLeft = '8px solid transparent'
        style.borderRight = '8px solid transparent'
        style.borderBottom = '8px solid'
        style.borderBottomColor = 'var(--tooltip-bg-color)'
        break
      case 'left':
        style.right = -8
        style.top = '50%'
        style.transform = 'translateY(-50%)'
        style.borderTop = '8px solid transparent'
        style.borderBottom = '8px solid transparent'
        style.borderLeft = '8px solid'
        style.borderLeftColor = 'var(--tooltip-bg-color)'
        break
      case 'right':
      default:
        style.left = -8
        style.top = '50%'
        style.transform = 'translateY(-50%)'
        style.borderTop = '8px solid transparent'
        style.borderBottom = '8px solid transparent'
        style.borderRight = '8px solid'
        style.borderRightColor = 'var(--tooltip-bg-color)'
        break
    }

    return style
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <div
        ref={tooltipRef}
        className="absolute rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-opacity duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800"
        style={{
          ...getTooltipStyle(),
          position: 'absolute',
          visibility: isHovered ? 'visible' : 'hidden',
        }}
      >
        <style jsx>{`
          :root {
            --tooltip-bg-color: white;
          }
          .dark :root {
            --tooltip-bg-color: #1f2937;
          }
        `}</style>
        <div style={getArrowStyle()}></div>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  )
}
