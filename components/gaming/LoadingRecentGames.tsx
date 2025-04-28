import React from 'react'

const LoadingRecentGames = () => {
  return (
    <div className="space-y-6">
      {/* 标题加载效果 */}
      <div className="space-y-2 pb-4 pt-6">
        <div className="h-12 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>

      {/* 卡片加载效果 */}
      <div className="flex w-full overflow-x-auto pb-4 pt-2">
        <div className="flex gap-4 pl-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex h-80 w-56 flex-shrink-0 animate-pulse flex-col items-start justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg dark:from-gray-800 dark:to-gray-900 md:h-[30rem] md:w-72"
            >
              {/* 平台信息加载效果 */}
              <div className="w-full p-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-5 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>

              {/* 游戏信息加载效果 */}
              <div className="w-full bg-gradient-to-t from-gray-300/90 to-transparent p-6 dark:from-gray-700/90">
                <div className="space-y-3">
                  <div className="h-6 w-4/5 rounded bg-gray-400/50 dark:bg-gray-600/50"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-400/50 dark:bg-gray-600/50"></div>
                    <div className="h-3 w-24 rounded bg-gray-400/50 dark:bg-gray-600/50"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-400/50 dark:bg-gray-600/50"></div>
                    <div className="h-3 w-28 rounded bg-gray-400/50 dark:bg-gray-600/50"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingRecentGames 