import { Heart } from 'lucide-react'
import React, { useState } from 'react'

function Header({setIsFavOpen, favCount }) {
  const [isHover, setIsHover] = useState(false)
  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0f0e0d]/90 backdrop-blur border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <h1 className="font-serif text-2xl text-stone-100 tracking-tight">
            <span className="text-amber-400">C</span>inéma
            <span className="text-amber-400">.</span>
          </h1>

          <button
            onClick={() => setIsFavOpen(true)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-stone-300 hover:border-amber-400/60 hover:text-amber-300 transition-colors"
          >
            {isHover ? (
              <Heart fill="oklch(82.8% 0.189 84.429)" size={16} />
            ) : (
              <Heart size={16} />
            )}
            Favorites
            <span
              className={`min-w-5 h-5 px-1.5 rounded-full ${isHover ? 'bg-amber-400/60' : 'bg-amber-400'} text-black text-xs font-semibold flex items-center justify-center`}
            >
              {favCount}
            </span>
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
