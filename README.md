# 🎬 Cinéma — Movie Search App

A cinematic movie discovery app built with **React (Vite)** and **Tailwind CSS**. Search movies via OMDb API with debounced search, pagination, favorites, and recent searches — all persisted in localStorage.

---

## 🌟 Features

* **Debounced Search** — 500ms delay, prevents API calls on every keystroke
* **Movie Grid** — Responsive cards (2 cols mobile → 5 cols desktop)
* **Movie Details Modal** — Plot, ratings, cast, director, box office
* **Favorites** — Save via heart icon, persisted in localStorage
* **Recent Searches** — Last 5 searches, deduplicated, clear option
* **Pagination** — "Load More" button, results accumulate
* **Loading Skeleton** — `animate-pulse` placeholder cards
* **Error States** — Separate API error and "No movies found" states
* **Empty State** — Initial prompt before searching
* **Cinematic Dark Theme** — Amber accents, custom scrollbar
* **Responsive Design** — Mobile-first approach

---

## 🧠 Custom Hooks Built

### 1. `useDebounce(value, delay)`

Delays search input to prevent excessive API calls.

```javascript
const debouncedSearch = useDebounce(searchValue, 500)

```

### 2. `useFetch(url)`

Manages API calls — handles loading, error, and data with race condition protection (cancelled flag).

```javascript
const { data, loading, error } = useFetch(apiUrl)

```

### 3. `useLocalStorage(key, initialValue)`

Syncs React state with localStorage using lazy initialization and auto-sync.

```javascript
const [favorites, setFavorites] = useLocalStorage('favorites', [])

```

---

## 🧠 React Concepts Practiced

| Concept | Where Used |
| --- | --- |
| **useState** | `searchValue`, `page`, `allMovies`, `selectedMovieId`, modals |
| **useEffect** | Data accumulation, page reset, localStorage sync |
| **useCallback** | `toggleFavorite` — stable function reference |
| **useMemo** | Implicit in filter logic |
| **Custom Hooks** | `useDebounce`, `useFetch`, `useLocalStorage` |
| **Race Condition Handling** | Cancelled flag in `useFetch` |
| **Cleanup Functions** | `clearTimeout`, `cancelled = true` |
| **Conditional Rendering** | Loading/Error/Empty/Not Found states |
| **Lists with Keys** | `key={m.imdbID}` — unique identifier |
| **Controlled Inputs** | `value={searchValue} + onChange` |
| **Props Drilling** | Functions passed to children |
| **Pagination** | Accumulate + reset on search change |

---

## 🛠️ Tech Stack

* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React
* **Fonts:** Libre Caslon Condensed + Quicksand (Google Fonts)
* **API:** OMDb API (Open Movie Database)
* **State Management:** React Hooks
* **Persistence:** localStorage

---

## 📂 Project Structure

```text
movie-search-app/
├── src/
│   ├── App.jsx
│   ├── App.css             # Global styles + keyframes + scrollbar
│   ├── index.css           # Tailwind imports
│   ├── main.jsx
│   ├── MainApp.jsx         # Parent — state owner
│   ├── Header.jsx          # Logo + favorites button
│   ├── SearchBox.jsx       # Input + recent searches
│   ├── ResultGrid.jsx      # Movie cards + load more
│   ├── ResultModel.jsx     # Movie details modal
│   ├── FavoritesModal.jsx  # Favorites list modal
│   ├── LoadingState.jsx    # Skeleton loading
│   ├── EmptyState.jsx      # Search prompt
│   ├── NotFoundState.jsx   # No results
│   ├── APIErrorState.jsx   # Network error
│   ├── Footer.jsx
│   └── hooks/
│       ├── useDebounce.js
│       ├── useFetch.js
│       └── useLocalStorage.js
├── index.html
├── package.json
├── vite.config.js
└── .env                    # VITE_OMDB_KEY

```

---

## 🎨 Design Highlights

* **Color Palette:** Deep black (`#0f0e0d`) + amber accents + stone grays
* **Typography:** Libre Caslon Condensed (headings) + Quicksand (body)
* **Cinematic Feel:** Dark background, amber accents, poster-heavy grid
* **Custom Scrollbar:** Amber track + dark thumb (in modals)
* **Skeleton Loading:** `animate-pulse` with aspect-ratio placeholders
* **Modal:** Backdrop blur, click outside to close, smooth transitions

---

## 🚀 How to Run

```bash
# Clone repository
git clone https://github.com/imthatrehan/movie-search-app.git
cd movie-search-app

# Install dependencies
npm install

# Create .env file
echo "VITE_OMDB_KEY=your_api_key_here" > .env

# Run development server
npm run dev

# Build for production
npm run build

```

* **OMDb API Key:** Get a free key at [omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx).
* Open [http://localhost:5173](http://localhost:5173) in your browser.# movie-search-app
