'use client'
import React, { useCallback, useEffect, useState } from 'react'
import ActivityCalendar, { ThemeInput, Activity } from 'react-activity-calendar'
import Spinner from '@/components/Spinner'
import { Tooltip as MuiTooltip } from '@mui/material'

const explicitTheme: ThemeInput = {
  light: ['#383838', '#567496', '#739ac8', '#82aee1', '#90c1fa'],
  dark: ['#383838', '#567496', '#739ac8', '#82aee1', '#90c1fa'],
}

const DAYS = 180
const USERNAME = 'camtrik'

function selectLastNDays(contributions: Array<Activity>): Array<Activity> {
  return contributions.slice(-DAYS)
}

export default function GithubCalendar({ className = '' }) {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchCalendarData(USERNAME)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  useEffect(fetchData, [fetchData])

  if (error) {
    return <h1 className="w-48 text-center">❌{error.message}</h1>
  }

  if (loading || !data) {
    return <Spinner />
  }

  return (
    <section className={`${className} p-5`}>
      <div className="mb-3 flex items-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Github Contributions
        </h3>
        <span className="border-gray ml-auto rounded-md border bg-blue-400 bg-opacity-20 px-2 py-1 text-sm text-gray-800 backdrop-blur-sm dark:text-white">
          {data.contributions.length > 0 ? `Last ${DAYS} days` : 'No data'}
        </span>
      </div>
      <div className="bg-transparent">
        <ActivityCalendar
          data={selectLastNDays(data.contributions)}
          hideMonthLabels={false}
          blockRadius={2}
          blockSize={10}
          theme={explicitTheme}
          labels={{
            totalCount: '{{count}} contributions',
          }}
          renderBlock={(block, activity) => (
            <MuiTooltip title={`${activity.count} activities on ${activity.date}`}>
              {block}
            </MuiTooltip>
          )}
          renderColorLegend={(block, level) => (
            <MuiTooltip title={`Level: ${level}`}>{block}</MuiTooltip>
          )}
        />
      </div>
    </section>
  )
}

interface ApiResponse {
  total: {
    [year: number]: number
    [year: string]: number
  }
  contributions: Array<Activity>
}

interface ApiErrorResponse {
  error: string
}

async function fetchCalendarData(username: string): Promise<ApiResponse> {
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
  const data: ApiResponse | ApiErrorResponse = await response.json()

  if (!response.ok) {
    throw Error(`Error fetching GitHub activity: ${(data as ApiErrorResponse).error}`)
  }

  return data as ApiResponse
}
