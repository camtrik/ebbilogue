'use client'
import Link from '@/components/Link'
import { slug } from 'github-slugger'
import { useTranslation } from 'utils/locale'
import tagData from 'app/tag-data.json'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { allBlogs } from 'contentlayer/generated'

const COLORS = [
  'text-blue-700',
  'text-indigo-700',
  'text-purple-700',
  'text-violet-700',
]

export default function TagBox() {
  const { t } = useTranslation()
  const sortedTags = Object.keys(tagData).sort((a, b) => tagData[b] - tagData[a])
  const totalPosts = allBlogs.length
  
  const getTagStyle = (count: number, index: number) => {
    const size = Math.floor((count / Math.max(...Object.values(tagData))) * 3)
    return {
      className: `relative font-bold ${COLORS[index % COLORS.length]} hover:text-white/90 transition-colors duration-200`,
      fontSize: `${1.1 + size * 0.2}rem`,
    }
  }

  return (
    <div className="flex gap-6">
      {/* 左侧区域 */}
      {/* 右侧图片 */}
      <div className="relative w-2/3">
        <Image
          src="https://res.cloudinary.com/camtrik/image/upload/v1737910275/00154-320790827_neorft.png"
          alt="Decorative image"
          width={1672}
          height={912}
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>
      <div className="flex w-1/3 flex-col gap-4">
        {/* 标签云 */}
        <div className="card bg-blue-purple flex-1 overflow-hidden rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-start gap-4">
            {sortedTags.map((tag, index) => {
              const style = getTagStyle(tagData[tag], index)
              return (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Link
                    href={`/tags/${slug(tag)}`}
                    className={style.className}
                    style={{ fontSize: style.fontSize }}
                  >
                    {tag}
                    <span className="absolute -right-4 -top-2.5 text-xs font-normal text-gray-600">
                      {tagData[tag]}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="card bg-blue-purple-animated flex h-24 items-center justify-around overflow-hidden rounded-2xl p-4">
          <div className="text-center">
            <p className="text-lg text-gray-800">Total Posts</p>
            <p className="text-2xl font-bold text-gray-800">{totalPosts}</p>
          </div>
          <div className="h-12 w-px bg-gray-400" />
          <div className="text-center">
            <p className="text-lg text-gray-800">Total Tags</p>
            <p className="text-2xl font-bold text-gray-800">{sortedTags.length}</p>
          </div>
        </div>
      </div>

      
    </div>
  )
} 