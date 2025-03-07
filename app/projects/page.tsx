'use client'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { useTranslation } from 'utils/locale'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('menu_projects')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('desc_projects')}</p>
        </div>
        <div className="container mx-auto max-w-5xl py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
