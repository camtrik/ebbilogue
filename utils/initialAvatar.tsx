import React from 'react'

interface InitialAvatarProps {
  username: string
  size?: number
  shape?: 'square' | 'circle'
  className?: string
  onClick?: () => void
}

export const getInitialAvatar = ({
  username,
  size = 64, // 默认64px
  shape = 'square',
  className = '',
  onClick,
}: InitialAvatarProps) => {
  if (!username) return null

  const shapeClasses = {
    square: 'rounded-lg',
    circle: 'rounded-full',
  }

  const baseClasses = 'flex items-center justify-center bg-indigo-500 font-bold text-white'

  // 根据size动态计算文字大小
  const fontSize = Math.max(size * 0.4, 16) // 文字大小至少16px，最大不超过size的40%

  const Element = onClick ? 'button' : 'div'

  return (
    <Element
      className={`${baseClasses} ${shapeClasses[shape]} ${className}`}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        fontSize: `${fontSize}px`,
      }}
    >
      {username.charAt(0).toUpperCase()}
    </Element>
  )
} 