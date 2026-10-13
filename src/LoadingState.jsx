import { AlertTriangle, Clapperboard, SearchX } from 'lucide-react'
import React from 'react'

function LoadingState({label}) {
  return (
    <>
      <div>
          <p className={`${label} mb-4`}>Loading state</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-9">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-2/3 rounded-xl bg-[#1b1917]" />
                <div className="h-3.5 w-4/5 rounded bg-[#1b1917] mt-3" />
                <div className="h-3 w-1/4 rounded bg-[#1b1917] mt-2" />
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export default LoadingState
