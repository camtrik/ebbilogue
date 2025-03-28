import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/utils/locale'
import { User } from '@/types/user'
import Image from 'next/image'
import { LogoutIcon } from '@/components/icons/icons'
import { useEffect } from 'react'
import { getInitialAvatar } from '@/utils/initialAvatar'

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
  logout: () => void
}

const UserProfileModal = ({ isOpen, onClose, user, logout }: UserProfileModalProps) => {
  const { t } = useTranslation()

  // Add ESC key closing functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleLogout = () => {
    logout()
    onClose()
  }

  // Map role IDs to friendly display names
  const getRoleDisplay = (roleId: string) => {
    const roleMap: Record<string, { name: string }> = {
      ROLE_ADMIN: { name: 'Admin' },
      ROLE_MODERATOR: { name: 'Supervisor' },
      ROLE_USER: { name: 'User' },
    }

    return roleMap[roleId]
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay - closes modal when clicked */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClose()
              }
            }}
            role="button"
            tabIndex={0}
          />

          {/* Modal content - centered position */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClose()
              }
            }}
            role="button"
            tabIndex={0}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-96 overflow-hidden rounded-lg bg-gray-900 shadow-xl"
              onClick={(e) => e.stopPropagation()}
              role="button"
              tabIndex={0}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-5 top-5 z-50 text-gray-400 transition-colors hover:text-white"
                aria-label="close"
                type="button"
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

              {/* User profile information */}
              <div className="relative px-8 pb-8 pt-10">
                <div className="flex flex-col items-center">
                  {/* User avatar with glow effect */}
                  <div className="relative mb-6 mt-4">
                    {/* Glow effect */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 opacity-75 blur-md"></div>

                    {/* Avatar container */}
                    <div className="relative rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 p-1">
                      {user?.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.username}
                          width={110}
                          height={110}
                          className="rounded-full"
                        />
                      ) : (
                        getInitialAvatar({
                          username: user.username,
                          size: 110,
                          shape: 'circle',
                        })
                      )}
                    </div>
                  </div>

                  {/* Username */}
                  <h3 className="mb-2 text-2xl font-semibold text-white">{user?.username}</h3>

                  {/* User email */}
                  <div className="mb-6 text-base text-gray-400">{user?.email}</div>

                  {/* User role badges */}
                  {user?.roles && user.roles.length > 0 && (
                    <div className="mb-5 flex gap-3">
                      {user.roles.map((role, index) => {
                        const roleDisplay = getRoleDisplay(role)
                        return (
                          <span
                            key={index}
                            className="rounded-full border border-gray-700 bg-gray-800 px-4 py-1.5 text-sm text-gray-300"
                          >
                            {roleDisplay.name}
                          </span>
                        )
                      })}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="my-5 w-full border-t border-gray-800"></div>

                  {/* Action buttons */}
                  <div className="w-full space-y-4">
                    {/* Logout button - centered content */}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-6 py-3 text-base text-white transition-colors hover:bg-indigo-600"
                      type="button"
                    >
                      <LogoutIcon className="mr-2 h-5 w-5" fill="currentColor" />
                      {t('auth.logout') || 'Logout'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default UserProfileModal
