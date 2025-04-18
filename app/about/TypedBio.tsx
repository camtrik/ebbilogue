'use client'

import React from 'react'
import Typed from 'typed.js'
import { useTranslation, LanguageContext } from 'utils/locale'

const TypedBios = () => {
  const el = React.useRef(null)
  const typed = React.useRef<Typed | null>(null)
  const { currentLang } = React.useContext(LanguageContext)
  const { t } = useTranslation('about-me')

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    })
    return () => typed.current?.destroy()
  }, [currentLang])
  console.log(currentLang)
  return (
    <div>
      <span>🎯 </span>
      <ul id="bios" className="hidden">
        <li key="1">
          {currentLang === 'ja' ? (
            <>
              {t('typed.name')}
              <b className="text-primary-300">{t('typed.desu')}</b>
            </>
          ) : (
            <>
              {t('typed.Iam')} <b className="text-primary-300">{t('typed.name')}</b>
            </>
          )}
        </li>
        <li key="2">
          {currentLang === 'ja' ? (
            <>
              <b className="text-primary-300">{t('typed.swe')}</b>
              {t('typed.doing')}
            </>
          ) : (
            <>
              {t('typed.Iam-a')} <b className="text-primary-300">{t('typed.swe')}</b>.
            </>
          )}
        </li>
        <li key="3">
          {currentLang === 'ja' ? (
            <>
              <b className="text-primary-300">{t('typed.gamer')}</b>
              {t('typed.doing')}
            </>
          ) : (
            <>
              {t('typed.Iam-a')} <b className="text-primary-300">{t('typed.gamer')}</b>.
            </>
          )}
        </li>
        <li key="4">
          {currentLang === 'ja' ? (
            <>
              <b className="text-primary-300">{t('typed.anime')}</b>
              {t('typed.doing')}
            </>
          ) : (
            <>
              {t('typed.Iam-a')} <b className="text-primary-300">{t('typed.anime')}</b>.
            </>
          )}
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}

export default TypedBios
