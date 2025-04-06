import clsx from 'clsx'
import { Minus, Plus } from 'lucide-react'
import Image from '@/components/ui/Image'
import Link from '@/components/Link'

const EXPERIENCES = [
  {
    org: 'Recruit Co.,Ltd.',
    url: 'https://www.recruit.co.jp/',
    logo: '/static/logos/recruit.png',
    start: '2025/4',
    end: 'Present',
    title: 'Software Engineer - Full Time',
  },
  {
    org: 'curiosity, Inc.',
    url: 'https://www.curiosity-inc.jp/',
    logo: '/static/logos/curiosity.png',
    start: '2022/8',
    end: '2025/1',
    title: 'Engineer Internship - Part Time',
  },
  {
    org: 'Bandai Namco Studios Inc.',
    url: 'https://www.bandainamcostudios.com/',
    logo: '/static/logos/bandai-namco-studios.jpg',
    start: '2022/7',
    end: '2022/8',
    title: 'Engineer Internship - Part Time',
  },
]

export default function CareerTimeline() {
  return (
    <ul className="m-0 list-none p-0">
      {EXPERIENCES.map((exp, idx) => (
        <li key={exp.url} className="m-0 p-0">
          <TimelineItem exp={exp} last={idx === EXPERIENCES.length - 1} />
        </li>
      ))}
    </ul>
  )
}

const TimelineItem = ({ exp, last }: { exp: (typeof EXPERIENCES)[0]; last?: boolean }) => {
  const { org, url, logo, start, end, title } = exp

  return (
    <div
      className={clsx(
        'group/timeline-item',
        'relative -mx-3 flex flex-row items-start gap-3 rounded-lg p-3',
        'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800',
        !last && [
          'before:z-1',
          'before:absolute before:left-[35px] before:top-10',
          'before:h-full before:w-px',
          'before:bg-gray-300 dark:before:bg-gray-500',
        ]
      )}
    >
      <Image
        src={logo}
        alt={org}
        className="h-12 w-12 shrink-0 rounded-md "
        style={{ objectFit: 'contain' }}
        width={200}
        height={200}
      />
      <details className="w-full !bg-inherit [&_.minus]:open:block [&_.plus]:open:hidden">
        <summary className="relative pr-10 marker:content-none">
          <div className="flex flex-col">
            <div className="line-clamp-1 text-xs tabular-nums text-gray-500 dark:text-gray-400">
              <span>{start}</span> – <span>{end}</span>
            </div>
            <Link
              href={url}
              className="line-clamp-1 w-fit font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
            >
              {org}
            </Link>
            <div className="flex items-center gap-1 pt-1 text-sm text-gray-700 dark:text-gray-200">
              <span>{title}</span>
            </div>
          </div>
        </summary>
      </details>
    </div>
  )
}
