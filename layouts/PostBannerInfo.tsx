import { ReactNode, useEffect, useState } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import PostDate from '@/components/PostDate'
import TOC, { TOCItem } from '@/components/TOC'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostBannerInfo({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, lastmod, title, images, toc } = content
  const displayImage = images?.[0] || 'https://picsum.photos/seed/picsum/800/400'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="mx-auto max-w-[85rem]">
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <PostDate date={date} lastmod={lastmod} currentLang={siteMetadata.locale} />
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="w-full">
                <Bleed>
                  <div className="text-center">
                    <Image
                      src={displayImage}
                      alt={title}
                      width={1600}
                      height={1600}
                      className="mx-auto h-auto w-auto rounded-md object-contain [max-height:800px] [max-width:800px]"
                    />
                  </div>
                </Bleed>
              </div>
            </div>
          </header>
          <div className="relative mx-auto mt-10 flex">
            {/* TOC Sidebar */}
            {/* {toc && <TOC toc={toc} />} */}
            {toc && <TOC toc={toc as TOCItem[]} />}

            {/* Main Content */}
            <div className="min-w-0 flex-1 xl:ml-[30px]">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="prose max-w-none pb-8 dark:prose-invert">{children}</div>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${prev.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Previous post: ${prev.title}`}
                      >
                        &larr; {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${next.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Next post: ${next.title}`}
                      >
                        {next.title} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
