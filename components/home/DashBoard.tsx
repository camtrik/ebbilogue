import { Headline } from './Headline'
import IconBox from './IconBox'
import SearchBox from './SearchBox'
import ScrollTagsBox from './ScrollTagsBox'
import ResponsiveBox from './ResponsiveBox'
import ClaimBox from './ClaimBox'
import ShowcasePanel from './ShowcasePanel'
import ProfileCard from './ProfileCard'
import HomeIntro from './HomeIntro'

export default function DashBoard() {
  return (
    <div className="divid-y space-y-12">
      <HomeIntro />
      <ShowcasePanel />
      <ClaimBox />
      {/* <ResponsiveBox /> */}
      {/* <ScrollTagsBox /> */}
    </div>
  )
}
