import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from 'contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
	const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const USER_BASE_URL = process.env.NEXT_PUBLIC_USER_BASE_URL

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
        throw new Error(data.message || '认证失败')
      }

      if (isLogin) {
        // save token and user info to localstorage
        localStorage.setItem('token', data.accessToken)
        const userData = { 
        	id: data.id,
          username: data.username,
          email: data.email,
          roles: data.roles,
        }
				login(userData)
        
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生错误')
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={onClose}
          >
            <div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-3 right-3">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  aria-label="关闭"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">
                {isLogin ? '登录' : '注册'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">用户名</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1">邮箱</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">密码</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors"
                >
                  {isLogin ? '登录' : '注册'}
                </button>
              </form>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  {isLogin ? '没有账号？点击注册' : '已有账号？点击登录'}
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