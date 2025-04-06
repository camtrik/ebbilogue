import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Photo from './gallery/photo'
import GameAchievements from './gaming/GameAchievements'
import GamingViewProfile from './gaming/GamingViewProfile'
import CareerTimeline from './about/Career'
import EducationTimeline from './about/Education'
import JumpingCat from './about/JumpingCat'
import Tooltip from '@/utils/Tooltip'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Photo,
  GameAchievements,
  GamingViewProfile,
  CareerTimeline,
  EducationTimeline,
  JumpingCat,
  Tooltip,
}
