import { Film, Heart, Plus } from 'lucide-react'
import React from 'react'

function ResultGrid({
  movies,
  searchName,
  totalResults,
  setPage,
  setSelectedMovieId,
  setIsOpen,
  toggleFavorite,
  favorites
}) {
  return (
    <>
      <section className="pb-16">
        <div className="flex items-baseline justify-between border-b border-white/[0.07] pb-3 mb-8">
          <h3 className="font-serif text-xl text-stone-100">
            Results for “{searchName}”
          </h3>
          <span className="text-sm text-stone-500">
            {movies.length} of {totalResults}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-9">
          {movies.map((m, i) => {
            const isFav = favorites.some((f) => f.imdbID === m.imdbID)
            return(
            <article key={m.imdbID} className="group cursor-pointer">
              <div
                onClick={() => {
                  setSelectedMovieId(m.imdbID)
                  setIsOpen(true)
                }}
                className="relative aspect-2/3 rounded-xl overflow-hidden bg-[#1b1917] border border-white/[0.07] transition-all duration-300 group-hover:scale-[1.04] group-hover:shadow-2xl group-hover:shadow-black/70 group-hover:border-amber-400/30"
              >
                <img src={m.Poster} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 text-[10px] uppercase tracking-widest text-stone-300">
                  {m.Type}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite({
                      imdbID: m.imdbID,
                      Title: m.Title,
                      Year: m.Year,
                      Poster: m.Poster,
                      Type: m.Type,
                    })
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-stone-300 hover:text-amber-400 transition-colors"
                >
                  <Heart
                    size={16}
                    fill={isFav ? 'currentColor' : 'none'}
                    className={isFav ? 'text-amber-400' : ''}
                  />
                </button>
              </div>
              <h4 className="mt-3 text-sm font-medium text-stone-100 line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                {m.Title}
              </h4>
              <p className="text-sm text-stone-500 mt-0.5">{m.Year}</p>
            </article>
          )})}
        </div>
        {movies.length < Number(totalResults) ? (
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="cursor-pointer flex items-center gap-2 px-8 py-3 rounded-full border border-white/15 text-sm text-stone-300 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-colors"
            >
              <Plus size={16} /> Load more
            </button>
          </div>
        ) : (
          ''
        )}
      </section>
    </>
  )
}

export default ResultGrid
