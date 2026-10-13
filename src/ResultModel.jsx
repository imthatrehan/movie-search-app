import { Film, Heart, Star, X } from 'lucide-react'
import React from 'react'
import useFetch from './hooks/useFetch'

function ResultModel({
  selectedMovieId,
  setSelectedMovieId,
  isOpen,
  setIsOpen,
  toggleFavorite,
  favorites,
}) {
  const url = selectedMovieId
    ? `https://www.omdbapi.com/?i=${selectedMovieId}&apikey=8b0ed687`
    : null
  const { data: d, loading, error } = useFetch(url)
  const details = [
    ['Director', d?.Director],
    ['Writer', d?.Writer],
    ['Actors', d?.Actors],
    ['Released', d?.Released],
    ['Language', d?.Language],
    ['Country', d?.Country],
    ['Awards', d?.Awards],
    ['Box Office', d?.BoxOffice],
  ]
  const isFav = favorites.some((f) => f.imdbID === d?.imdbID)
  if (!isOpen) return null

  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false)
            setSelectedMovieId(null)
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          {loading && <div className="spinner"></div>}
          {!loading && error && <p>Something went wrong</p>}
          {!loading && d?.Response === 'False' && <p>{d.Error}</p>}
          {!loading && d?.Response === 'True' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute max-w-4xl max-h-[85vh] w-full bg-[#181615] border border-white/10 rounded-3xl overflow-hidden grid md:grid-cols-[280px_1fr]"
            >
              <button
                onClick={() => {
                  setIsOpen(false)
                  setSelectedMovieId(null)
                }}
                className="cursor-pointer absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-2/3 md:aspect-auto bg-[#1b1917] flex items-center justify-center">
                {d.Poster !== 'N/A' ? (
                  <img src={d.Poster} className="w-full h-full object-cover" />
                ) : (
                  <Film
                    size={48}
                    strokeWidth={1.2}
                    className="text-stone-700"
                  />
                )}
              </div>
              <div className="p-6 sm:p-9 max-h-[85vh] cardContainer">
                <h3 className="font-serif text-3xl sm:text-4xl text-stone-50 leading-tight pr-10">
                  {d.Title}
                </h3>

                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-400 mt-3">
                  <span>{d.Year}</span>
                  <span className="px-1.5 py-0.5 border border-white/20 rounded text-xs">
                    {d.Rated}
                  </span>
                  <span>{d.Runtime}</span>
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {d.Genre?.split(', ').map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs"
                    >
                      {g}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-7 py-5 border-y border-white/[0.07]">
                  <div className="flex items-center gap-2">
                    <Star
                      size={26}
                      className="text-amber-400"
                      fill="currentColor"
                    />
                    <div>
                      <p className="text-xl font-semibold text-stone-50 leading-none">
                        {d.imdbRating}
                        <span className="text-sm text-stone-500">/10</span>
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        {d.imdbVotes} votes
                      </p>
                    </div>
                  </div>
                  {d.Ratings?.slice(1).map((r) => (
                    <div key={r.Source}>
                      <p className="text-lg font-semibold text-stone-100 leading-none">
                        {r.Value}
                      </p>
                      <p className="text-xs text-stone-500 mt-1">{r.Source}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500 mt-6">
                  Plot
                </p>
                <p className="text-stone-300 leading-relaxed mt-2">{d.Plot}</p>

                <dl className="mt-6 grid gap-3">
                  {details.map(([k, v]) => (
                    <div
                      key={k}
                      className="grid grid-cols-[100px_1fr] gap-4 text-sm"
                    >
                      <dt className="text-stone-500">{k}</dt>
                      <dd className="text-stone-200">{v}</dd>
                    </div>
                  ))}
                </dl>

                <button
                  onClick={() =>
                    toggleFavorite({
                      imdbID: d.imdbID,
                      Title: d.Title,
                      Year: d.Year,
                      Poster: d.Poster,
                      Type: d.Type,
                    })
                  }
                  className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-black text-sm font-semibold hover:bg-amber-300 transition-colors"
                >
                  <Heart fill={isFav ? 'black' : 'none'} size={16} />{' '}
                  {isFav ? 'Remove from favorites' : 'Add to favorites'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ResultModel
