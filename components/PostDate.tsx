import { formatDate } from 'pliny/utils/formatDate'

export default function PostDate({ date, lastmod, currentLang }) {
  const dateToShow = lastmod && lastmod !== date ? lastmod : date
  const isModified = lastmod && lastmod !== date

  return (
    <time dateTime={dateToShow}>
      {formatDate(dateToShow, currentLang)}
      {isModified && ' (Modified)'}
    </time>
  )
}
