'use client'
import { motion } from 'framer-motion'
import { ImagesSlider } from '@/components/ui/images-slider'
import { useTranslation } from 'utils/locale'
import SocialIcon from '@/components/icons'

interface GamingProfileProps {
  steamURL?: string
  psnURL?: string
  images: string[]
}

export default function GamingProfile({ steamURL, psnURL, images }: GamingProfileProps) {
  const { t } = useTranslation()
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
            {t('gaming_title')}
          </motion.p>
          <div className="mb-4 flex justify-center space-x-8">
            {steamURL && (
              <a
                href={steamURL}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-neutral-200 transition-colors hover:!text-white"
              >
                <span className="sr-only">Steam</span>
                <SocialIcon
                  kind="steam"
                  href={steamURL}
                  className="h-8 w-8 text-neutral-200 hover:text-white"
                />
              </a>
            )}
            {psnURL && (
              <a
                href={psnURL}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-neutral-200 transition-colors hover:!text-white"
              >
                <span className="sr-only">PlayStation Network</span>
                <SocialIcon
                  kind="psn"
                  href={psnURL}
                  className="h-8 w-8 text-neutral-200 hover:text-white"
                />
              </a>
            )}
          </div>
        </motion.div>
      </ImagesSlider>
    </div>
  )
}
