'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'
import useHeaderNavLinks from 'data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './mobile-nav/MobileNav'
import MobileNavToggle from './mobile-nav/MobileNavToggle'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from '@/components/SearchButton'
import LocaleSwitch from './LocaleSwitch'
import { useTranslation } from 'utils/locale'
import DropdownMenu from './DropdownMenu'
import { MenuItem } from '@/types/menu'
import AuthModal from './auth/AuthModal'
import { useAuth } from '@/components/auth/AuthContext'
import UserProfileModal from '@/components/auth/UserProfileModal'
import { UserIcon } from '@/components/icons/icons'
import { getInitialAvatar } from '@/utils/initialAvatar'

const Header = () => {
  const { t } = useTranslation()
  const [navShow, setNavShow] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isScrolled, setScrolled] = useState(false)
  const triggerHeight = 100

  // user login
  const { user, logout, login } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // mount initial scroll position
  useEffect(() => {
    const initialScrollTop = window.scrollY || document.documentElement.scrollTop
    setScrolled(initialScrollTop > triggerHeight)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      if (scrollTop > lastScrollTop) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop)
      setScrolled(scrollTop > triggerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollTop])

  function isVisible() {
    return !isScrolled || headerVisible
  }

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-2 z-50 mx-auto
        rounded-md bg-white/30 py-2 pl-2
        pr-4 ${isScrolled ? 'shadow-md' : ''} backdrop-blur dark:bg-black/30 dark:shadow-gray-800`}
        initial={{ width: '100vw' }}
        animate={{
          width: isScrolled ? '80vw' : '100vw',
          top: isVisible() ? '' : '-60px',
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between px-3">
          <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
            <div className="flex items-center justify-between">
              <div className="mr-3 hidden md:block">
                <Image src="/static/images/logo.png" width="200" height="21" alt="logo" priority />
              </div>
              <div className="mr-3 block md:hidden">
                <Image src="/static/favicons/icon.png" width="44" height="44" alt="logo" priority />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>

          <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
            {/* {user ? (
              <div className="flex items-center">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.username}
                    width={40}
                    height={40}
                    className="cursor-pointer rounded-md"
                    onClick={() => setIsProfileModalOpen(true)}
                  />
                ) : (
                  getInitialAvatar({
                    username: user.username,
                    size: 40,
                    shape: 'square',
                    onClick: () => setIsProfileModalOpen(true),
                    className: 'cursor-pointer',
                  })
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-2 rounded-md bg-secondary-500 px-3 py-1.5 text-white transition-colors hover:bg-secondary-600"
              >
                <UserIcon className="h-5 w-5" fill="currentColor" />
                <span>{t('auth.login')}</span>
              </button>
            )} */}

            <SearchButton />
            {useHeaderNavLinks(t)
              .filter((link) => link.href !== '/')
              .map((link) =>
                link.items ? (
                  <DropdownMenu
                    key={link.key}
                    items={link.items as MenuItem[]}
                    trigger={
                      <button
                        className="hidden text-xl font-medium text-gray-900 transition duration-300 
                        hover:text-primary-400 dark:text-gray-100 dark:hover:text-primary-300 sm:block"
                      >
                        {link.title}
                      </button>
                    }
                  />
                ) : (
                  <Link
                    key={link.key}
                    href={link.href ?? ''}
                    className="hidden text-xl font-medium text-gray-900 transition duration-300 
                    hover:text-primary-400 dark:text-gray-100 dark:hover:text-primary-300 sm:block"
                  >
                    {link.title}
                  </Link>
                )
              )}
            <LocaleSwitch />
            <MobileNavToggle onToggleNav={onToggleNav} />
          </div>
        </div>
      </motion.header>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} login={login} />
      {user && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          logout={logout}
          onUpdateProfile={(updatedUser) => {
            // 更新本地存储的用户信息
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
            const updatedUserData = {
              ...currentUser,
              ...updatedUser,
            }
            localStorage.setItem('user', JSON.stringify(updatedUserData))

            // 更新全局状态
            login(updatedUser, localStorage.getItem('token') || '')
          }}
        />
      )}
    </>
  )
}

export default Header
