import tagData from 'app/tag-data.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
const COLORS = ['text-blue-700', 'text-indigo-700', 'text-purple-700', 'text-violet-700']

export default function TagCloud() {
  const sortedTags = Object.keys(tagData).sort((a, b) => tagData[b] - tagData[a])

  const getTagStyle = (count: number, index: number) => {
    // ...Object.values(tagData) : max([10, 5, 8]) -> max(10, 5, 8) -> 10
    const size = Math.floor((count / Math.max(...Object.values(tagData))) * 3)
    return {
      className: `relative font-bold ${COLORS[index % COLORS.length]} hover:text-white/90 transition-colors duration-200`,
      fontSize: `${1.1 + size * 0.2}rem`,
    }
  }

  return (
    <div className="card bg-blue-purple flex-1 overflow-hidden rounded-2xl p-6">
      <div className="flex flex-wrap items-start justify-start gap-4">
        {sortedTags.map((tag, index) => {
          const style = getTagStyle(tagData[tag], index)
          return (
            <div
              key={tag}
              className="relative"
              style={{
                opacity: 1,
                transform: 'none',
                transition: `all 0.3s ease ${index * 0.05}s`,
              }}
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
