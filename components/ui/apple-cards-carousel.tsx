// Modified from https://ui.aceternity.com/components/apple-cards-carousel
'use client'
import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import { useOutsideClick } from 'hooks/use-outside-click'
import { Steam, PSN, Xbox } from '@/components/icons/social-icons'
import { Clock, Calendar } from 'lucide-react'
import { useTranslation } from 'utils/locale'

interface CarouselProps {
  items: JSX.Element[]
  initialScroll?: number
}

type Card = {
  src: string
  fullSrc?: string
  title: string
  category: string
  content: React.ReactNode
  playTime?: string
  lastPlayed?: string
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void
  currentIndex: number
}>({
  onCardClose: () => {},
  currentIndex: 0,
})

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll
      checkScrollability()
    }
  }, [initialScroll])

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const handleCardClose = (index: number) => {
    // if (carouselRef.current) {
    //   const cardWidth = isMobile() ? 230 : 384;
    //   const gap = isMobile() ? 4 : 8;
    //   const scrollPosition = (cardWidth + gap) * (index + 1);
    //   carouselRef.current.scrollTo({
    //     left: scrollPosition,
    //     behavior: "smooth",
    //   });
    setCurrentIndex(index)
    // }
  }

  const isMobile = () => {
    return window && window.innerWidth < 768
  }

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              'absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l'
            )}
          ></div>

          <div className={cn('flex flex-row justify-start gap-4 pl-4', 'mx-auto max-w-7xl')}>
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: 'easeOut',
                    once: true,
                  },
                }}
                key={'card' + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card
  index: number
  layout?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { onCardClose, currentIndex } = useContext(CarouselContext)
  const { t } = useTranslation()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useOutsideClick(containerRef, () => handleClose())

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    // onCardClose(index);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans dark:bg-neutral-900 md:p-10"
            >
              <button
                className="sticky right-0 top-4 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.div
                layoutId={layout ? `category-${card.title}-${index}` : undefined}
                className="flex items-center text-base font-medium text-black dark:text-white"
              >
                <span className="mr-2">{renderPlatformIcon(card.category)}</span>
                {card.category}
              </motion.div>
              <motion.p
                layoutId={layout ? `title-${card.title}-${index}` : undefined}
                className="mt-4 text-2xl font-semibold text-neutral-700 dark:text-white md:text-5xl"
              >
                {card.title}
              </motion.p>

              <div className="my-6 w-full overflow-hidden rounded-lg">
                <div className="relative aspect-[3/2] w-full">
                  <BlurImage
                    src={card.fullSrc || card.src}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="py-6">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900 md:h-[30rem] md:w-72"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-black/50" />

        <div className="relative z-40 w-full p-6">
          <motion.div
            layoutId={layout ? `category-${card.title}-${index}` : undefined}
            className="flex items-center text-left font-sans text-base font-medium text-white md:text-lg"
          >
            <span className="mr-2 text-white">{renderPlatformIcon(card.category)}</span>
            {card.category}
          </motion.div>
        </div>

        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-10 object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/90 to-transparent p-6">
          <div className="space-y-2">
            <motion.h3
              layoutId={layout ? `title-${card.title}-${index}` : undefined}
              className="text-left font-sans text-lg font-semibold text-white [text-wrap:balance] md:text-2xl"
            >
              {card.title}
            </motion.h3>

            {card.playTime && (
              <div className="flex items-center gap-1 text-gray-300">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{card.playTime}</span>
              </div>
            )}

            {card.lastPlayed && (
              <div className="flex items-center gap-1 text-gray-300">
                <Calendar className="h-3 w-3" />
                <span className="text-xs">{card.lastPlayed}</span>
              </div>
            )}
          </div>
        </div>
      </motion.button>
    </>
  )
}

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const defaultImage = '/static/gallery/bannersAIGC/00073-441946684.png'

  return (
    <img
      className={cn(
        'h-full w-full transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className
      )}
      onLoad={() => setLoading(false)}
      onError={() => {
        setError(true)
        setLoading(false)
      }}
      src={error ? defaultImage : (src as string)}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt ? alt : 'Background of a beautiful view'}
      {...rest}
    />
  )
}

function renderPlatformIcon(platform: string) {
  const steamId = process.env.STEAM_ID || ''
  const psnId = process.env.PSN_ID || ''
  const steamURL = 'https://steamcommunity.com/profiles/' + steamId
  const psnURL = 'https://psnprofiles.com/' + psnId

  const iconProps = { className: 'h-5 w-5' }

  switch (platform.toLowerCase()) {
    case 'steam':
      return <Steam {...iconProps} />
    case 'playstation':
    case 'psn':
      return <PSN {...iconProps} />
    case 'xbox':
      return <Xbox {...iconProps} />
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M17.5 12a1.5 1.5 0 01-1.5-1.5A1.5 1.5 0 0117.5 9a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m-3-4A1.5 1.5 0 0113 6.5 1.5 1.5 0 0114.5 5 1.5 1.5 0 0116 6.5 1.5 1.5 0 0114.5 8m-5 0A1.5 1.5 0 018 6.5 1.5 1.5 0 019.5 5 1.5 1.5 0 0111 6.5 1.5 1.5 0 019.5 8m-3 4A1.5 1.5 0 015 10.5 1.5 1.5 0 016.5 9 1.5 1.5 0 018 10.5 1.5 1.5 0 016.5 12M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9m0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
        </svg>
      )
  }
}
