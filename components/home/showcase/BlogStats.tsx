import tagData from 'app/tag-data.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
const COLORS = ['text-blue-700', 'text-indigo-700', 'text-purple-700', 'text-violet-700']

export default function BlogStats() {
  const sortedTags = Object.keys(tagData).sort((a, b) => tagData[b] - tagData[a])
  const totalPosts = allBlogs.length

  return (
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
  )
}
