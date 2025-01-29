import ClaimBox from './ClaimBox'
import ShowcasePanel from './showcase/ShowcasePanel'
import Homeline from './header/Homeline'

export default function DashBoard() {
  return (
    <div className="divid-y space-y-8 md:space-y-12">
      <div className="px-4 md:px-0">
        <Homeline />
      </div>
      <div className="px-4 md:px-0">
        <ShowcasePanel />
      </div>
      <div className="px-4 md:px-0">
        <ClaimBox />
      </div>
    </div>
  )
}
