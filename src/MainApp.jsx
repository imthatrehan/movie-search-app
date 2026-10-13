import React, { useCallback, useEffect, useState } from 'react'
import Header from './Header'
import SearchBox from './SearchBox'
import useDebounce from './hooks/useDebounce'
import useLocalStorage from './hooks/useLocalStorage'
import useFetch from './hooks/useFetch'
import ResultGrid from './ResultGrid'
import LoadingState from './LoadingState'
import EmptyState from './EmptyState'
import NotFoundState from './NotFoundState'
import APIErrorState from './APIErrorState'
import ResultModel from './ResultModel'
import FavoritesModal from './FavoritesModal'
import Footer from './Footer'

const label = 'text-[11px] uppercase tracking-[0.18em] text-stone-500'
const VITE_OMDB_KEY = import.meta.env.VITE_OMDB_KEY

function MainApp() {
  const [searchValue, setSearchValue] = useState('')
  const [recent, setRecent] = useLocalStorage('recent', [])
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState([])
  const debounce = useDebounce(searchValue, 500)
  const apiUrl = debounce.trim()
    ? `https://www.omdbapi.com/?s=${encodeURIComponent(debounce)}&page=${page}&apikey=${VITE_OMDB_KEY}`
    : null

  const { data, loading, error } = useFetch(apiUrl)
  const [selectedMovieId, setSelectedMovieId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isFavOpen, setIsFavOpen] = useState(false)

  useEffect(() => {
    if (!data?.Search) return
    setAllMovies((prev) =>
      page === 1 ? data.Search : [...prev, ...data.Search],
    )
  }, [data])

  useEffect(() => {
    setPage(1)
  }, [debounce])

  function addRecent(term) {
    const t = term.trim()
    if (!t) return
    setRecent((prev) =>
      [t, ...prev.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(
        0,
        5,
      ),
    )
  }
  const toggleFavorite = useCallback((movie) => {
    setFavorites((prev) =>
      prev.some((f) => f.imdbID === movie.imdbID)
        ? prev.filter((f) => f.imdbID !== movie.imdbID)
        : [movie, ...prev],
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0e0d] text-stone-200">
      <Header favCount={favorites.length} setIsFavOpen={setIsFavOpen}/>

      <main className="max-w-7xl mx-auto px-4 sm:px-8">
        <SearchBox
          label={label}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          addRecent={addRecent}
          recent={recent}
          setRecent={setRecent}
        />
        {data?.Search && (
          <ResultGrid
            movies={allMovies}
            totalResults={data.totalResults}
            searchName={debounce}
            setPage={setPage}
            setSelectedMovieId={setSelectedMovieId}
            setIsOpen={setIsOpen}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}
        <section className="pb-16 grid gap-10">
          {loading && <LoadingState label={label} />}
          <div className="grid md:grid-cols-3 gap-5">
            {!apiUrl && <EmptyState />}
            {error && <APIErrorState />}
            {data?.Response === 'False' && <NotFoundState />}
          </div>
        </section>
      </main>
      <ResultModel
        selectedMovieId={selectedMovieId}
        setSelectedMovieId={setSelectedMovieId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />

      <FavoritesModal
        isOpen={isFavOpen}
        setIsOpen={setIsFavOpen}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        setSelectedMovieId={setSelectedMovieId}
        setIsDetailOpen={setIsOpen}
      />
      <Footer />
    </div>
  )
}

export default MainApp
