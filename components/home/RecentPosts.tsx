'use client'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import { useTranslation, LanguageContext } from 'utils/locale'
import { useContext } from 'react'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import PostDate from '@/components/PostDate'
import { useAuth } from 'contexts/AuthContext'
import NeedAccessContent from '@/components/NeedAccessContent'
import { LockIcon } from '../icons/icons'


const MAX_DISPLAY = 10

export default function RecentPosts() {
  const sortedPosts = sortPosts(allBlogs, 'lastmod')
  const posts = allCoreContent(sortedPosts)
  const { t } = useTranslation()
  const currentLang = useContext(LanguageContext).currentLang
  const { haveAccess } = useAuth()

  return (
    <section className="card mt-10">
      <h1 className="p-10 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {t('Latest')}
      </h1>

      <ul className="divide-y divide-gray-200 p-10 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags } = post
          
          return (
            <li key={slug} className="py-12">
              <NeedAccessContent
                needAccess={post.needAccess}
                displayMode="hover"
                renderLock={(showLock) => (
                  <article className="flex gap-8 group transform transition-transform duration-300 hover:scale-[1.02]">
                    {/* Banner Image */}
                    <div className="relative h-[200px] w-1/2 overflow-hidden rounded-lg">
                      <Image
                        src={post.images?.[0] || siteMetadata.banner.defaultImage}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 dark:group-hover:bg-black/60 flex items-center justify-center transition-all duration-300">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                          <LockIcon strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-white" />
                          <p className="text-white font-medium mt-3 text-center">{t('auth.need_access')}</p>
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="w-1/2 space-y-5">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <PostDate date={date} lastmod={post.lastmod} currentLang={currentLang} />
                        </dd>
                      </dl>
                      <div className="space-y-5">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <span className="text-gray-900 dark:text-gray-100 cursor-not-allowed">
                                {title}
                              </span>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <span className="text-gray-400 cursor-not-allowed">
                            {t('label_read_more')} &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              >
                <article className="flex gap-8 transform transition-transform duration-300 hover:scale-[1.02]">
                  {/* Banner Image */}
                  <div className="relative h-[200px] w-1/2 overflow-hidden rounded-lg">
                    <Image
                      src={post.images?.[0] || siteMetadata.banner.defaultImage}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Content */}
                  <div className="w-1/2 space-y-5">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <PostDate date={date} lastmod={post.lastmod} currentLang={currentLang} />
                      </dd>
                    </dl>
                    <div className="space-y-5">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          {t('label_read_more')} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </NeedAccessContent>
            </li>
          )
        })}
      </ul>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end p-10 text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            {t('All Posts')} &rarr;
          </Link>
        </div>
      )}
    </section>
  )
}
