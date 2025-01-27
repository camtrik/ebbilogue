'use client'
import ParallaxText from '../scroll/ParallaxText'
import { useTranslation } from 'utils/locale'

export function Headline() {
  const { t } = useTranslation()

  return (
    <div className="card bg-blue-purple-animated relative max-w-5xl overflow-hidden">
      <ParallaxText
        baseVelocity={0}
        className="-translate-y-[2rem] translate-x-[2rem] rotate-[20deg] transform"
      >
        <span className="font-dragon text-3xl text-white">WelcomToEbbiLogue</span>
      </ParallaxText>
      <div className="space-y-2 p-4 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('home_title')}
        </h1>
        <p className="text-xl font-bold leading-7 text-white">{t('home_desc')}</p>
      </div>
    </div>
  )
}
