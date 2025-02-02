import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import ComingSoon from '@/components/ComingSoon'

export const metadata: Metadata = genPageMetadata({ title: 'Anime' })

export default function AnimePage() {
  return (
    <div>
      <ComingSoon />
    </div>
  )
}
