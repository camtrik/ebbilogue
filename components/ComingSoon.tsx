'use client'
import { motion } from 'framer-motion'
import { ImagesSlider } from '@/components/ui/images-slider'
import { useTranslation } from 'utils/locale'

interface GamingViewProfileProps {
  images?: string[]
}

const DEFAULT_IMAGES = [
  '/static/gallery/bannersAIGC/00073-441946684.png',
  '/static/gallery/bannersAIGC/00073-2537020977.png',
  '/static/gallery/bannersAIGC/00116-2811950234.png',
  '/static/gallery/bannersAIGC/00109-543789916.png',
  '/static/gallery/bannersAIGC/00092-3755665998.png',
]

export default function GamingViewProfile({ images = DEFAULT_IMAGES }: GamingViewProfileProps) {
  const { t } = useTranslation()
  return (
    <div className="my-4">
      <ImagesSlider
        className="h-[30rem] rounded-3xl shadow-xl ring-1 ring-white/10"
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
          <motion.p className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-center text-xl font-bold text-transparent md:text-6xl">
            {t('coming_soon')}
          </motion.p>
        </motion.div>
      </ImagesSlider>
    </div>
  )
}
