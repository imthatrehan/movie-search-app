import { Clapperboard } from 'lucide-react'
import React from 'react'

function EmptyState() {
  return (
    <>
      <div className="flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-dashed border-white/10">
        <Clapperboard size={44} strokeWidth={1.2} className="text-stone-600" />
        <h4 className="font-serif text-xl text-stone-100 mt-4">
          Search for a movie
        </h4>
        <p className="text-sm text-stone-500 mt-1">
          Enter the name of movie in Search Bar.
        </p>
      </div>
    </>
  )
}

export default EmptyState
