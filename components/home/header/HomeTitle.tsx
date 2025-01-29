'use client'
import { motion } from 'framer-motion'
import { useTranslation } from 'utils/locale'

export default function HomeTitle() {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl space-y-4 text-center md:text-left"
    >
      <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
        {t('home_title')}
      </h1>
      <p className="text-lg text-white/80 sm:text-xl md:text-2xl">{t('home_desc')}</p>
    </motion.div>
  )
}
