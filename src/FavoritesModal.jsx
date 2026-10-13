import { Film, Heart, X } from 'lucide-react'
import React from 'react'

function FavoritesModal({
  isOpen,
  setIsOpen,
  favorites,
  toggleFavorite,
  setSelectedMovieId,
  setIsDetailOpen,
}) {
  if (!isOpen) return null

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[80vh] flex flex-col bg-[#181615] border border-white/10 rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
          <div>
            <h3 className="font-serif text-2xl text-stone-50">
              Your favorites
            </h3>
            <p className="text-sm text-stone-500 mt-0.5">
              {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="cardContainer flex-1 px-4 py-3">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center text-center py-14 px-6">
              <Heart size={44} strokeWidth={1.2} className="text-stone-600" />
              <h4 className="font-serif text-xl text-stone-100 mt-4">
                No favorites yet
              </h4>
              <p className="text-sm text-stone-500 mt-1">
                Tap the heart on any movie to save it here.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {favorites.map((m) => (
                <li
                  key={m.imdbID}
                  className="group flex items-center gap-4 p-2.5 rounded-xl hover:bg-white/4 transition-colors"
                >
                  <div
                    onClick={() => {
                      setSelectedMovieId(m.imdbID)
                      setIsDetailOpen(true)
                      setIsOpen(false)
                    }}
                    className="cursor-pointer w-14 aspect-2/3 shrink-0 rounded-lg overflow-hidden bg-[#1b1917] border border-white/[0.07] flex items-center justify-center"
                  >
                    {m.Poster !== 'N/A' ? (
                      <img
                        src={m.Poster}
                        alt={m.Title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Film
                        size={20}
                        strokeWidth={1.2}
                        className="text-stone-700"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-stone-100 truncate group-hover:text-amber-300 transition-colors">
                      {m.Title}
                    </h4>
                    <p className="text-sm text-stone-500 mt-0.5">
                      {m.Year}
                      <span className="mx-2">·</span>
                      <span className="uppercase text-[10px] tracking-widest">
                        {m.Type}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(m)}
                    className="cursor-pointer shrink-0 px-3 py-1.5 rounded-full border border-red-400/30 text-xs text-red-300 hover:bg-red-400/10 transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default FavoritesModal