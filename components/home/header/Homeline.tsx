'use client'
import { useTranslation } from 'utils/locale'
import siteMetadata from '@/data/siteMetadata'
import HomeTitle from './HomeTitle'
import HomeIntro from './HomeIntro'

export default function Homeline() {
  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
      {/* Title and Description */}
      <HomeTitle />

      <HomeIntro />
    </div>
  )
}
