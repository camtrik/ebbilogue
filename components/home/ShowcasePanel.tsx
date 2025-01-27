'use client'
import Link from '@/components/Link'
import { slug } from 'github-slugger'
import { useTranslation } from 'utils/locale'
import tagData from 'app/tag-data.json'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { allBlogs } from 'contentlayer/generated'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const COLORS = ['text-blue-700', 'text-indigo-700', 'text-purple-700', 'text-violet-700']

const SHOWCASE_IMAGES = [
  'https://res.cloudinary.com/camtrik/image/upload/v1737910275/00154-320790827_neorft.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991653/00181-3663116070_rbsjfe.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991589/00192-3141175425_oie8yc.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737901033/00103-736225594_eqhwzm.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991713/00240-2547697752_irljwa.png',
  'https://res.cloudinary.com/camtrik/image/upload/v1737991768/00259-3107429704_tjlnkp.png',
]

// 创建扩展数组实现无缝滚动
const EXTENDED_IMAGES = [
  SHOWCASE_IMAGES[SHOWCASE_IMAGES.length - 1], // 最后一张副本
  ...SHOWCASE_IMAGES, // 原始图片
  SHOWCASE_IMAGES[0], // 第一张副本
]

export default function ShowcasePanel() {
  const { t } = useTranslation()
  const sortedTags = Object.keys(tagData).sort((a, b) => tagData[b] - tagData[a])
  const totalPosts = allBlogs.length
  const timerRef = useRef<NodeJS.Timeout>()
  const [currentIndex, setCurrentIndex] = useState(1) // Start from the original first image
  const [carouselKey, setCarouselKey] = useState(0) // For forcing re-render
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto play
  const startAutoPlay = () => {
    timerRef.current = setInterval(() => {
      handleNext(true)
    }, 5000)
  }

  // Reset timer
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    startAutoPlay()
  }

  // Switch to next
  const handleNext = (auto = false) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => {
      const newIndex = prev + 1
      // 预判边界情况
      if (newIndex === EXTENDED_IMAGES.length - 1 && !auto) {
        resetTimer()
      }
      return newIndex
    })
    if (!auto) resetTimer()
  }

  // 切换到上一张
  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => prev - 1)
    resetTimer()
  }

  // 处理动画完成
  const handleAnimationComplete = () => {
    setIsAnimating(false)

    // 检查是否需要跳转
    if (currentIndex === 0) {
      // 静默跳转到倒数第二张（原始最后一张）
      setCarouselKey((prev) => prev + 1)
      setCurrentIndex(EXTENDED_IMAGES.length - 2)
    } else if (currentIndex === EXTENDED_IMAGES.length - 1) {
      // 静默跳转到第二张（原始第一张）
      setCarouselKey((prev) => prev + 1)
      setCurrentIndex(1)
    }
  }

  // 计算真实索引
  const realIndex = (currentIndex - 1 + SHOWCASE_IMAGES.length) % SHOWCASE_IMAGES.length

  // 初始化自动播放
  useEffect(() => {
    startAutoPlay()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const getTagStyle = (count: number, index: number) => {
    const size = Math.floor((count / Math.max(...Object.values(tagData))) * 3)
    return {
      className: `relative font-bold ${COLORS[index % COLORS.length]} hover:text-white/90 transition-colors duration-200`,
      fontSize: `${1.1 + size * 0.2}rem`,
    }
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Carousel area */}
      <div className="relative w-full overflow-hidden rounded-2xl md:w-2/3">
        <motion.div
          key={carouselKey} // 关键：强制重新挂载
          className="flex"
          initial={false}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
            restDelta: 0.1,
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          {EXTENDED_IMAGES.map((img, index) => (
            <div key={index} className="relative h-96 w-full flex-shrink-0">
              <Image
                src={img}
                alt={`Showcase ${index + 1}`}
                fill
                className="object-cover"
                priority={index === currentIndex}
              />
            </div>
          ))}
        </motion.div>

        {/* 导航按钮 */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition hover:bg-white/50"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleNext(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition hover:bg-white/50"
        >
          <ChevronRight size={24} />
        </button>

        {/* 分页指示器 */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {SHOWCASE_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnimating) return
                setCurrentIndex(index + 1)
                resetTimer()
              }}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === realIndex ? 'bg-black' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 右侧标签云和统计 */}
      <div className="flex w-full flex-col gap-4 md:w-1/3">
        <div className="card bg-blue-purple flex-1 overflow-hidden rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-start gap-4">
            {sortedTags.map((tag, index) => {
              const style = getTagStyle(tagData[tag], index)
              return (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Link
                    href={`/tags/${slug(tag)}`}
                    className={style.className}
                    style={{ fontSize: style.fontSize }}
                  >
                    {tag}
                    <span className="absolute -right-4 -top-2.5 text-xs font-normal text-gray-600">
                      {tagData[tag]}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="card bg-blue-purple-animated flex h-24 items-center justify-around overflow-hidden rounded-2xl p-4">
          <div className="text-center">
            <p className="text-lg text-gray-800">Total Posts</p>
            <p className="text-2xl font-bold text-gray-800">{totalPosts}</p>
          </div>
          <div className="h-12 w-px bg-gray-400" />
          <div className="text-center">
            <p className="text-lg text-gray-800">Total Tags</p>
            <p className="text-2xl font-bold text-gray-800">{sortedTags.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
