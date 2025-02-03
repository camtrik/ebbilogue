import React from 'react'

const LoadingTrophy = () => {
  return (
    <div className="space-y-8">
      {/* Header Loading */}
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="h-14 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>

      {/* Platinum Section Loading */}
      <div className="py-4">
        <div className="mb-6 h-8 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex gap-6 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-80 animate-pulse overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg dark:from-gray-800 dark:to-gray-900"
            >
              <div className="relative aspect-[4/3]">
                <div className="h-full w-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="mb-2 h-6 w-3/4 rounded bg-gray-400/50 dark:bg-gray-600/50"></div>
                  <div className="flex items-center space-x-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex items-center space-x-1">
                        <div className="h-4 w-4 rounded-full bg-gray-400/50 dark:bg-gray-600/50"></div>
                        <div className="h-4 w-6 rounded bg-gray-400/50 dark:bg-gray-600/50"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Platinum Section Loading */}
      <div className="py-8">
        <div className="mb-6 h-8 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg dark:from-gray-800 dark:to-gray-900"
            >
              <div className="relative aspect-[4/3]">
                <div className="h-full w-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="mb-2 h-5 w-3/4 rounded bg-gray-400/50 dark:bg-gray-600/50"></div>
                  <div className="flex items-center space-x-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex items-center space-x-1">
                        <div className="h-4 w-4 rounded-full bg-gray-400/50 dark:bg-gray-600/50"></div>
                        <div className="h-4 w-6 rounded bg-gray-400/50 dark:bg-gray-600/50"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute right-3 top-3 h-6 w-12 rounded-full bg-gray-400/50 dark:bg-gray-600/50"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingTrophy
