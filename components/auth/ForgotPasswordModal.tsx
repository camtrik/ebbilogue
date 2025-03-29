import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/utils/locale'
import { ErrorIcon, LoadingIcon } from '@/components/icons/icons'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const { t } = useTranslation()
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const USER_BASE_URL = process.env.NEXT_PUBLIC_USER_BASE_URL

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${USER_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send verification code')
      }

      setSuccess(
        'Your Username and verification code has been sent to your email. If you cannot find it, please check your spam mails.'
      )
      setStep('code')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${USER_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.code,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Reset password failed')
      }

      setSuccess('Password reset successfully!')
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset password failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            // onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            // onClick={onClose}
          >
            <div
              className="relative w-full max-w-md overflow-hidden rounded-lg bg-gray-900 p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onClose()
                }
              }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-300"
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

              <h2 className="mb-6 text-center text-2xl font-bold text-white">
                {step === 'email' ? t('auth.forgot_password_username') : t('auth.reset_password')}
              </h2>

              {success && (
                <div className="mb-4 rounded-md bg-green-500/10 p-3 text-sm text-green-400">
                  {success}
                </div>
              )}

              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-400">
                  <ErrorIcon className="h-4 w-4" fill="currentColor" />
                  {error}
                </div>
              )}

              <form
                onSubmit={step === 'email' ? handleSendCode : handleResetPassword}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">
                    {t('auth.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                    disabled={step === 'code'}
                  />
                </div>

                {step === 'code' && (
                  <>
                    <div>
                      <label
                        htmlFor="code"
                        className="mb-1 block text-sm font-medium text-gray-300"
                      >
                        {t('auth.verification_code')}
                      </label>
                      <input
                        id="code"
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleFormChange}
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="newPassword"
                        className="mb-1 block text-sm font-medium text-gray-300"
                      >
                        {t('auth.new_password')}
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleFormChange}
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
                >
                  {isLoading && (
                    <LoadingIcon className="h-4 w-4 animate-spin" fill="currentColor" />
                  )}
                  {step === 'email' ? t('auth.send_verification_code') : t('auth.reset_password')}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ForgotPasswordModal
