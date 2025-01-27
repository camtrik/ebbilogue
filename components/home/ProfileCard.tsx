'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'

export default function ProfileCard() {
  return (
    <motion.div
      className="card bg-blue-purple flex w-72 flex-col items-center rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Avatar Area */}
      <Link href="/about" className="group relative">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur transition duration-200 group-hover:opacity-100"></div>
        <div className="relative">
          <Image
            src="/static/images/avatar.png"
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
      </Link>

      <div className="mt-4 text-center">
        <Link href="/about">
          <h2 className="text-2xl font-bold text-gray-800 transition duration-200 hover:text-blue-600">
            {siteMetadata.author}
          </h2>
        </Link>
      </div>

      {/* Social Links */}
      {/* <div className="mt-4 flex space-x-4">
        <Link href="https://github.com/camtrik" className="text-gray-600 hover:text-blue-600 transition duration-200">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
          </svg>
        </Link>
      </div> */}
    </motion.div>
  )
}
