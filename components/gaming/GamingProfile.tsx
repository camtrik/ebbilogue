'use client'
import { motion } from 'framer-motion'
import { ImagesSlider } from '@/components/ui/images-slider'
import { useTranslation } from 'utils/locale'

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
                <svg
                  className="h-8 w-8 [&>path]:!fill-current"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
                </svg>
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
                <svg
                  className="h-8 w-8 [&>path]:!fill-current"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.193 4.362-.002 4.362-3.153 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.391-1.502h-.002zm4.656 16.242l6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.499v-2.385l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.029 5.437.661 1.848.601 2.041 1.472 1.576 2.072s-1.622 1.036-1.622 1.036l-8.544 3.107v-2.297l.02-.023zM1.124 19.066c-1.621-.599-1.909-1.841-.82-2.465 1.089-.624 2.935-1.086 2.935-1.086l4.993-1.789v2.312l-3.731 1.338c-.719.258-.83.625-.25.818.589.192 1.637.138 2.36-.123l1.621-.58v2.156c-.11.034-.219.066-.331.096-1.892.43-4.155.21-6.777-.677z" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </ImagesSlider>
    </div>
  )
}
