import MyGitHubCalendar from './GithubCalendar'

export default function GithubActivityBox() {
  return (
    <section
      className={`card bg-purple-gray flex flex-grow items-center justify-center rounded-lg border border-gray-200 shadow-md dark:border-gray-700`}
    >
      <MyGitHubCalendar className="transform text-white xl:scale-[1.5]" />
    </section>
  )
}
