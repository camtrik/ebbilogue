import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/components/auth/AuthContext'
import { useTranslation } from '@/utils/locale'
import { User } from '@/types/user'
import { GoogleIcon, GithubIcon, ErrorIcon, LoadingIcon } from '@/components/icons/icons'
import Image from 'next/image'
import { getInitialAvatar } from '@/utils/initialAvatar'
import ForgotPasswordModal from './ForgotPasswordModal'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  login: (userData: User, token: string) => void
}

const AuthModal = ({ isOpen, onClose, login }: AuthModalProps) => {
  const { t } = useTranslation()
  const [isLogin, setIsLogin] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatarUrl: '',
  })
  const [error, setError] = useState('')
  const [avatarPreviewStatus, setAvatarPreviewStatus] = useState<
    'loading' | 'success' | 'error' | 'empty'
  >('empty')

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

  // Handle avatar image loading
  const handleAvatarLoad = () => {
    setAvatarPreviewStatus('success')
  }

  // Handle avatar image error
  const handleAvatarError = () => {
    setAvatarPreviewStatus('error')
  }

  // Update form data and track avatar URL changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // If changing avatar URL, update preview status
    if (name === 'avatarUrl') {
      if (!value) {
        setAvatarPreviewStatus('empty')
      } else {
        setAvatarPreviewStatus('loading')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (!isLogin) {
        // register
        const signupResponse = await fetch(`${USER_BASE_URL}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const signupData = await signupResponse.json()

        if (!signupResponse.ok) {
          throw new Error(signupData.message || 'Registration failed')
        }

        // register success, try to login
      }

      const loginResponse = await fetch(`${USER_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })

      const loginData = await loginResponse.json()

      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Login failed')
      }

      const userData = {
        id: loginData.id,
        username: loginData.username,
        email: loginData.email,
        roles: loginData.roles,
        avatarUrl: loginData.avatarUrl,
      }

      login(userData, loginData.accessToken)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setError('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            // onClick={onClose}
            // role="button"
            // tabIndex={0}
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            // onClick={onClose}
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter' || e.key === ' ') {
            //     onClose()
            //   }
            // }}
            // role="button"
            // tabIndex={0}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                }
              }}
              role="button"
              tabIndex={0}
              style={{ height: '550px' }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 text-white transition-colors hover:text-gray-200"
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

              <div className="flex h-full">
                {/* Left panel wrapper - changes width based on mode */}
                <motion.div
                  className="relative h-full overflow-hidden"
                  initial={false}
                  animate={{
                    width: isLogin ? '60%' : '40%',
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {/* Login form */}
                  <motion.div
                    initial={false}
                    animate={{
                      x: isLogin ? 0 : '-100%',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 z-10 flex flex-col justify-center bg-gray-900 p-10"
                  >
                    <h2 className="mb-10 text-center text-3xl font-bold text-white">
                      {t('auth.login')}
                    </h2>
                    <div className="mx-auto max-w-md">
                      {/* Social Login Options */}
                      <div className="mb-6 flex gap-2">
                        <button
                          type="button"
                          className="flex w-1/2 items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2.5 text-white transition-colors hover:bg-gray-700"
                        >
                          <GoogleIcon className="h-4 w-4" fill="currentColor" />
                          Google
                        </button>
                        <button
                          type="button"
                          className="flex w-1/2 items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2.5 text-white transition-colors hover:bg-gray-700"
                        >
                          <GithubIcon className="h-5 w-5" fill="currentColor" />
                          Github
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="px-4 text-sm text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label
                            htmlFor="username"
                            className="mb-1 block text-sm font-medium text-gray-300"
                          >
                            Username
                          </label>
                          <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleFormChange}
                            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-base text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-gray-300"
                          >
                            Password
                          </label>
                          <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-base text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                          />
                        </div>
                        {error && isLogin && (
                          <div className="mt-2 text-sm text-red-400">{error}</div>
                        )}

                        <button
                          type="submit"
                          className="mt-6 w-full rounded-md bg-indigo-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-600"
                        >
                          {t('auth.login')}
                        </button>

                        {/* Add forgot password link */}
                        <div className="mt-2 text-center">
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm text-gray-400 hover:text-gray-300"
                          >
                            {t('auth.forgot_password_username')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>

                  {/* Stay Hungry section */}
                  <motion.div
                    initial={false}
                    animate={{
                      x: isLogin ? '-100%' : 0,
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="bg-blue-purple absolute inset-0 flex flex-col items-center justify-center p-10"
                  >
                    <h2 className="mb-3 text-4xl font-bold text-white">Stay Hungry</h2>
                    <h2 className="mb-10 text-4xl font-bold text-white">Stay Foolish</h2>
                    <p className="mb-10 text-center text-lg text-white">
                      {t('auth.have_account') || 'Already have an account?'}
                    </p>
                    <button
                      onClick={toggleAuthMode}
                      className="rounded-md border-2 border-white bg-transparent px-10 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
                    >
                      {t('auth.login')}
                    </button>
                  </motion.div>
                </motion.div>

                {/* Right panel wrapper - changes width based on mode */}
                <motion.div
                  className="relative h-full overflow-hidden"
                  initial={false}
                  animate={{
                    width: isLogin ? '40%' : '60%',
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {/* Welcome section */}
                  <motion.div
                    initial={false}
                    animate={{
                      x: isLogin ? 0 : '100%',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="bg-blue-purple absolute inset-0 flex flex-col items-center justify-center p-10"
                  >
                    <h2 className="mb-10 text-4xl font-bold text-white">Welcome,</h2>
                    <p className="mb-10 text-center text-lg text-white">
                      {t('auth.need_account') || 'Need an account?'}
                    </p>
                    <button
                      onClick={toggleAuthMode}
                      className="rounded-md border-2 border-white bg-transparent px-10 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
                    >
                      {t('auth.register')}
                    </button>
                  </motion.div>

                  {/* Register form */}
                  <motion.div
                    initial={false}
                    animate={{
                      x: isLogin ? '100%' : 0,
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 flex flex-col justify-center bg-gray-900 p-10"
                  >
                    {/* Register Title with Avatar Preview */}
                    <div className="mb-6 flex flex-col">
                      {/* Header with avatar preview */}
                      <div className="mb-2 flex items-center justify-center">
                        {/* Avatar preview */}
                        <div className="relative mr-4">
                          {/* Glow effect */}
                          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-400/50 to-purple-400/50 opacity-75 blur-md"></div>

                          {/* Avatar container */}
                          <div className="relative rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 p-1">
                            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-gray-800">
                              {avatarPreviewStatus === 'empty' &&
                                (formData.username ? (
                                  getInitialAvatar({
                                    username: formData.username,
                                    size: 64,
                                    shape: 'square',
                                  })
                                ) : (
                                  <div className="text-gray-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-8 w-8"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                      />
                                    </svg>
                                  </div>
                                ))}

                              {avatarPreviewStatus === 'loading' && (
                                <div className="flex items-center justify-center">
                                  <LoadingIcon className="h-8 w-8" fill="currentColor" />
                                </div>
                              )}

                              {avatarPreviewStatus === 'error' && (
                                <div className="flex items-center justify-center text-red-400">
                                  <ErrorIcon className="h-8 w-8" fill="currentColor" />
                                </div>
                              )}

                              {formData.avatarUrl && (
                                <Image
                                  src={formData.avatarUrl}
                                  alt="Avatar preview"
                                  width={64}
                                  height={64}
                                  // style={{visibility: avatarPreviewStatus === 'success' ? 'visible' : 'hidden'}}
                                  style={{ opacity: avatarPreviewStatus === 'success' ? 1 : 0 }}
                                  className="h-full w-full object-cover"
                                  onLoad={handleAvatarLoad}
                                  onError={handleAvatarError}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-bold text-white">{t('auth.register')}</h2>
                      </div>

                      {/* Avatar status message */}
                      <div className="text-center text-xs text-gray-400">
                        {/* {avatarPreviewStatus === 'empty' &&
                          formData.avatarUrl === '' &&
                          'Enter a URL to preview your avatar'}
                        {avatarPreviewStatus === 'success' && 'Avatar preview'} */}
                        {avatarPreviewStatus === 'error' && 'Invalid image URL'}
                        {/* {avatarPreviewStatus === 'loading' && 'Loading preview...'} */}
                      </div>
                    </div>

                    <div className="mx-auto max-w-md">
                      {/* Social Login Options */}
                      <div className="mb-4 flex gap-2">
                        <div className="group relative w-1/2">
                          <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                          >
                            <GoogleIcon className="h-4 w-4" fill="currentColor" />
                            Google
                          </button>
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                            {t('not_implemented')}
                          </div>
                        </div>
                        <div className="group relative w-1/2">
                          <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                          >
                            <GithubIcon className="h-5 w-5" fill="currentColor" />
                            Github
                          </button>
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                            {t('not_implemented')}
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-3 flex items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="px-4 text-sm text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Username and Password in one row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="username"
                              className="mb-1 block text-sm font-medium text-gray-300"
                            >
                              {t('auth.username')}
                            </label>
                            <input
                              id="username"
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleFormChange}
                              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-base text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="password"
                              className="mb-1 block text-sm font-medium text-gray-300"
                            >
                              {t('auth.password')}
                            </label>
                            <input
                              id="password"
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleFormChange}
                              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-base text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>

                        {/* Email on its own row */}
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-300"
                          >
                            {t('auth.email')}
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-base text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                          />
                        </div>

                        {/* Avatar URL on its own row */}
                        <div>
                          <label
                            htmlFor="avatarUrl"
                            className="mb-1 block text-sm font-medium text-gray-300"
                          >
                            {t('auth.avatar_url')}
                          </label>
                          <input
                            id="avatarUrl"
                            type="url"
                            name="avatarUrl"
                            value={formData.avatarUrl}
                            onChange={handleFormChange}
                            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-base text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Optional"
                          />
                        </div>

                        {error && !isLogin && (
                          <div className="mt-0 text-sm text-red-400">{error}</div>
                        )}

                        <button
                          type="submit"
                          className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-indigo-500 px-6 py-2 text-base font-medium text-white transition-colors hover:bg-indigo-600"
                        >
                          {t('auth.register')}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Add ForgotPasswordModal */}
          <ForgotPasswordModal
            isOpen={showForgotPassword}
            onClose={() => setShowForgotPassword(false)}
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
