'use client'
import { motion } from 'framer-motion'
import { ImagesSlider } from '@/components/ui/images-slider'

interface GamingViewProfileProps {
  images?: string[]
}

const DEFAULT_IMAGES = [
  '/static/images/games/warhammer.webp',
  '/static/images/games/maria.jpg',
  '/static/images/games/sekiro.jpg',
  '/static/images/games/ghost-of-tsushima.jpg',
  '/static/images/games/age-of-stars.jpg',
]

export default function GamingViewProfile({ images = DEFAULT_IMAGES }: GamingViewProfileProps) {
  return (
    <div className="my-4">
      <ImagesSlider
        className="h-[24rem] rounded-3xl shadow-xl ring-1 ring-white/10"
        overlayClassName="rounded-3xl bg-black/40"
        images={images}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col items-center justify-center"
        >
          <motion.p className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-center text-xl font-bold text-transparent md:text-4xl">
            Gaming Life
          </motion.p>
          <a href="/gaming" className="group relative">
            <button className="bg-blue-purple/10 mt-4 rounded-full border border-blue-500/20 px-6 py-2.5 text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg">
              <span className="flex items-center gap-2">
                View My Gaming Profile
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-[rgba(167,139,250,0.6)] to-transparent" />
            </button>
          </a>
        </motion.div>
      </ImagesSlider>
    </div>
  )
}
