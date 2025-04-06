'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function JumpingCat() {
  const [isJumping, setIsJumping] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left

  // jump every 2 seconds, and change direction with 25% probability
  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true)

      // 25% probability to change direction
      if (Math.random() < 0.25) {
        setDirection((prev) => prev * -1)
      }

      setTimeout(() => setIsJumping(false), 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span
      className="font-pixel inline-block text-lg"
      initial={{ y: 0, scaleX: direction }}
      animate={{
        y: isJumping ? [-5, -15, -5, 0] : 0,
        scaleX: direction,
      }}
      transition={isJumping ? { duration: 0.5, times: [0, 0.4, 0.8, 1] } : { duration: 0.2 }}
      style={{
        imageRendering: 'pixelated',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: '2rem',
        position: 'relative',
        top: '4px',
      }}
    >
      🐱
    </motion.span>
  )
}
