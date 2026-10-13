import { SearchX } from 'lucide-react'
import React from 'react'

function NotFoundState() {
  return (
    <>
      <div className="flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-dashed border-white/10">
        <SearchX size={44} strokeWidth={1.2} className="text-stone-600" />
        <h4 className="font-serif text-xl text-stone-100 mt-4">
          No movies found
        </h4>
        <p className="text-sm text-stone-500 mt-1">
          Try using other Names or keyWords.
        </p>
      </div>
    </>
  )
}

export default NotFoundState
