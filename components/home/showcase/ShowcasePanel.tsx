'use client'
import tagData from 'app/tag-data.json'
import { allBlogs } from 'contentlayer/generated'
import CarouselArea from './CarouselArea'
import TagCloud from './TagCloud'
import BlogStats from './BlogStats'
import GithubCalendar from './GithubCalendar'
import GithubActivityBox from './GithubActivityBox'
const COLORS = ['text-blue-700', 'text-indigo-700', 'text-purple-700', 'text-violet-700']

export default function ShowcasePanel() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Carousel area */}
      {/* <CarouselArea /> */}
      {/* <GitHubActivityChart /> */}
      {/* Right side tag cloud and stats */}
      <GithubActivityBox />
      <div className="flex w-full flex-col gap-4 md:w-1/3">
        <TagCloud />
        <BlogStats />
      </div>
      {/* <GithubCalendar />  */}
    </div>
  )
}
