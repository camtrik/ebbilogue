import { Headline } from './Headline'
import IconBox from './IconBox'
import SearchBox from './SearchBox'
import ScrollTagsBox from './ScrollTagsBox'
import ResponsiveBox from './ResponsiveBox'
import ClaimBox from './ClaimBox'
import TagBox from './TagBox'
import ProfileCard from './ProfileCard'

export default function DashBoard() {
  return (
    <div className="divid-y space-y-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-6 flex justify-between space-x-6">
        <Headline />
        <ProfileCard />
      </div>
      <TagBox />
      <ClaimBox />
      {/* <ResponsiveBox /> */}
      {/* <ScrollTagsBox /> */}
    </div>
  )
}
