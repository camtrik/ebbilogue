import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from 'contexts/AuthContext'
import { useTranslation } from '@/utils/locale'
import { User } from '@/types/user'
import Cookies from 'js-cookie'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  login: (userData: User, token: string) => void
}

const AuthModal = ({ isOpen, onClose, login }: AuthModalProps) => {
  const { t } = useTranslation()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const USER_BASE_URL = process.env.NEXT_PUBLIC_USER_BASE_URL

  // ESC close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/signin' : '/api/auth/signup'
      const response = await fetch(`${USER_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed')
      }

      if (isLogin) {

        const userData = {
          id: data.id,
          username: data.username,
          email: data.email,
          roles: data.roles,
        }
        login(userData, data.accessToken)
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* background blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            role="button"
            tabIndex={0}
          />
          {/* modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
            role="button"
            tabIndex={0}
          >
            <div
              className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
              role="presentation"
              tabIndex={-1}
            >
              <div className="absolute right-3 top-3">
                <button
                  onClick={onClose}
                  className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h2 className="mb-4 text-center text-2xl font-bold">
                {isLogin ? t('auth.login') : t('auth.register')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">{t('auth.username')}</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full rounded-md border px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label className="mb-1 block text-sm font-medium">{t('auth.email')}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-md border px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-sm font-medium">{t('auth.password')}</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-md border px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>
                {error && <div className="text-sm text-red-500">{error}</div>}
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600"
                >
                  {isLogin ? t('auth.login') : t('auth.register')}
                </button>
              </form>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  {isLogin ? t('auth.register') : t('auth.login')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
