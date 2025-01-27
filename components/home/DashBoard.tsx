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
    <div className="divid-y space-y-8 md:space-y-12">
      <div className="px-4 md:px-0">
        <HomeIntro />
      </div>
      <div className="px-4 md:px-0">
        <ShowcasePanel />
      </div>
      <div className="px-4 md:px-0">
        <ClaimBox />
      </div>
      {/* <ResponsiveBox /> */}
      {/* <ScrollTagsBox /> */}
    </div>
  )
}
