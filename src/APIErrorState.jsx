import { AlertTriangle } from 'lucide-react'
import React from 'react'

function APIErrorState() {
  return (
    <>
      <div className="flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-red-500/20 bg-red-500/4">
        <AlertTriangle size={44} strokeWidth={1.2} className="text-red-400" />
        <h4 className="font-serif text-xl text-stone-100 mt-4">
          Something went wrong
        </h4>
        <p className="text-sm text-stone-500 mt-1">Data load Error.</p>
        <button className="mt-4 px-5 py-2 rounded-full border border-red-400/40 text-sm text-red-300 hover:bg-red-400/10 transition-colors">
          Try again
        </button>
      </div>
    </>
  )
}

export default APIErrorState
