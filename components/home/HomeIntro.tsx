'use client'
import { motion } from 'framer-motion'
import { useTranslation } from 'utils/locale'
import Image from 'next/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'

export default function HomeIntro() {
  const { t } = useTranslation()
  const linkedinUrl = siteMetadata.linkedin || ''
  const githubUrl = siteMetadata.github || ''
  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
      {/* Title and Description */}
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

      {/* Avatar and Content Container */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Radial glow effect (always visible) */}
        <div className="absolute left-1/2 top-1/2 h-[100%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-100 blur-xl transition-opacity duration-300"></div>

        {/* Content container */}
        <div className="relative flex items-center gap-6">
          {/* Avatar with its own glow and hover text */}
          <Link href="/about" className="group relative block">
            {/* Glow effect (always visible) */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 opacity-75 blur-md transition duration-300"></div>

            {/* Avatar image */}
            <div className="relative rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 p-1">
              <Image
                src="/static/images/avatar.png"
                alt="Avatar"
                width={140}
                height={140}
                className="rounded-full"
              />
            </div>

            {/* Hover text */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-lg font-semibold text-white">About Me</span>
            </div>
          </Link>

          {/* Name and Social Links */}
          <div className="space-y-6">
            {/* Name with hover effect */}
            <Link href="/about" className="group">
              <h2 className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-3xl font-bold text-transparent text-white/60 transition-colors group-hover:text-blue-300">
                {t('home_name')}
              </h2>
            </Link>

            {/* Social Links (no hover effects for these) */}
            <div className="flex gap-4">
              <Link
                href={githubUrl}
                target="_blank"
                className="text-white/60 transition-colors hover:text-white"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                  />
                </svg>
              </Link>
              <Link
                href={linkedinUrl}
                target="_blank"
                className="text-white/60 transition-colors hover:text-white"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
