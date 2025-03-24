'use client'

import Link from '@/components/Link'
import Image from '@/components/Image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const [count, setCount] = useState(2)
  const router = useRouter()

  useEffect(() => {
    // 创建倒计时，2秒后自动跳转到首页
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prevCount - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="flex flex-col items-start justify-start xl:mt-24 xl:flex-row xl:items-center xl:justify-center xl:space-x-6">
      <div className="flex flex-col items-center space-x-2 pb-8 pt-6">
        <Image
          src="/static/images/404.png"
          width={512}
          height={512}
          className="lightcone h-80 w-80"
          alt="logout"
        ></Image>
      </div>
      <div className="max-w-xl xl:border-l-2 xl:pl-20">
        <p className="mb-4 text-xl font-bold leading-normal xl:text-2xl">
          You have been logged out
        </p>
        <p className="mb-8">{count} seconds will redirect to the homepage...</p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
} 