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
import { User } from '@/types/user'

const Header = () => {
  const { t } = useTranslation()
  const [navShow, setNavShow] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isScrolled, setScrolled] = useState(false)
  const triggerHeight = 100

  // user login 
  const [user, setUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  
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

  // User login status 
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => { 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  // callback function 
  const handleLoginSuccess = (userData: any) => { 
    setUser(userData)
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
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xl font-medium text-gray-900 transition duration-300 
                  hover:text-primary-400 dark:text-gray-100 dark:hover:text-primary-300"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-xl font-medium text-gray-900 transition duration-300 
                hover:text-primary-400 dark:text-gray-100 dark:hover:text-primary-300"
              >
                登录
              </button>
            )}
            
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
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} />
    </>
  )
}

export default Header
