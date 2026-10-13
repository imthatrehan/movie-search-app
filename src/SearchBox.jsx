import { Clock, Search, X } from 'lucide-react'
import React from 'react'

function SearchBox({
  label,
  searchValue,
  setSearchValue,
  recent,
  setRecent,
  addRecent,
}) {
  return (
    <>
      <section className="pt-14 pb-10 max-w-2xl">
        <p className={label}>Movie search</p>
        <h2 className="font-serif text-4xl sm:text-5xl leading-tight text-stone-50 mt-3">
          Find your next <em className="text-amber-400">favourite</em> film.
        </h2>

        <div className="relative mt-8">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (searchValue === '') return
              if (e.key === 'Enter') {
                addRecent(searchValue)
              }
            }}
            placeholder="Search movies, series..."
            className="w-full h-14 pl-14 pr-12 rounded-2xl bg-[#181615] border border-white/10 text-stone-100 placeholder:text-stone-600 outline-none focus:border-amber-400/70 transition-colors"
          />
          {searchValue !== '' ? (
            <button className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-200 transition-colors">
              <X onClick={(e) => setSearchValue('')} size={18} />
            </button>
          ) : (
            ''
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {recent.length === 0 ? (
            ''
          ) : (
            <Clock size={15} className="text-amber-300" />
          )}
          {recent.map((r) => (
            <button
              key={r}
              onClick={() => setSearchValue(r)}
              className="cursor-pointer px-3 py-1 rounded-full bg-white/4 border border-white/[0.07] text-sm text-stone-400 hover:text-amber-300 hover:border-amber-400/40 transition-colors"
            >
              {r}
            </button>
          ))}
          {recent.length === 0 ? (
            ''
          ) : (
            <button
              onClick={() => setRecent([])}
              className="cursor-pointer text-xs text-stone-600 hover:text-stone-300 underline-offset-4 hover:underline ml-1"
            >
              Clear
            </button>
          )}
        </div>
      </section>
    </>
  )
}

export default SearchBox
