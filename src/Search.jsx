import React from 'react'
import { useSearch } from './services'
import debounce from 'lodash/debounce'

function Search() {
  const [seriesList, setSeriesList] = React.useState([])
  const [movieList, setMovieList] = React.useState([])
  const [searchText, setSearchText] = React.useState('')
  const { mutate } = useSearch({
    onSuccess: ({ movies, series }) => {
      setMovieList(movies)
      setSeriesList(series)
    },
  })
  const highlightWords = searchText.split(' ').map((x) => x.toLowerCase())

  const onChangeSearch = debounce((evt) => {
    const value = evt.target.value
    setSearchText(value)
    mutate(value)
  }, 500)

  return (
    <div className="p-6 md:p-24 bg-gray-200">
      <div className="text-gray-700 mb-12">
        <h1 className="font-semibold mb-5 text-xl">
          Search Suggestion Component Test
        </h1>
        <h2 className="font-semibold mb-1">Objective</h2>
        <p className="mb-3">
          Implement an IMDB search box with suggestions, using the most suitable
          technology/library for the task. We will evaluate by how clean, simple
          and maintainable the code is.
        </p>

        <h1 className="font-semibold mb-1">Requirements</h1>
        <ul className="list-inside list-disc mb-3">
          <li>
            <strong>Fork</strong> this project in the bottom status bar.
          </li>
          <li>
            Get search suggestions from omdbapi.com. (API Key:{' '}
            <code>7468f8b0</code>)
          </li>
          <li>
            <strong>Display 3 movies and 3 TV series</strong> in the result as
            the demo shown. (Hint: Use the <code>type</code> parameter)
          </li>
          <li>
            <strong>Highlight</strong> matched words.
          </li>
          <li>
            <strong>Avoid calling the API server excessively</strong> when user
            is typing.
          </li>
          <li>Retain the UI style below.</li>
          <li>
            Code in plain JavaScript (ES6+), TypeScript, Vue, React or any other
            framework but <strong>no 🚫 jQuery </strong>.
          </li>
          <li>
            Keep the code simple and clean. Feel free to import and use external
            library.
          </li>
          <li>
            Run in latest Chrome. No need to worry about browser compatibility.
          </li>
          <li>You can use the HTML and styling in this file as boilerplate.</li>
        </ul>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden bg-white">
        <input
          id="searchbox"
          className="text-xl block w-full appearance-none bg-white placeholder-gray-400 px-4 py-3 rounded-lg outline-none"
          placeholder="Search for movie"
          onChange={onChangeSearch}
        />

        <div
          id="suggestions"
          className={`${
            searchText && (movieList || seriesList) ? 'shown' : 'hidden'
          } px-2 py-2 border-t text-sm text-gray-800`}
        >
          <div className={`${searchText && movieList ? 'shown' : 'hidden'}`}>
            <h3 className="text-xs text-gray-600 pl-2 py-1">Movies</h3>
            <ul>
              {movieList.map((x) => (
                <li key={x.imdbID}>
                  <a
                    href={x.Poster}
                    className="block hover:bg-gray-200 rounded px-2 py-1"
                  >
                    {x.Title.split(' ').map((x) => {
                      if (highlightWords.includes(x.toLowerCase())) {
                        return [
                          <strong key={x.imdbID + '_' + x}>{x}</strong>,
                          ' ',
                        ]
                      }
                      return [x, ' ']
                    })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`mt-3 ${searchText && seriesList ? 'shown' : 'hidden'}`}
          >
            <h3 className="text-xs text-gray-600 pl-2 py-1">TV shows</h3>
            <ul>
              {seriesList.map((x) => (
                <li key={x.imdbID}>
                  <a
                    href={x.Poster}
                    className="block hover:bg-gray-200 rounded px-2 py-1"
                  >
                    {x.Title.split(' ').map((x) => {
                      if (highlightWords.includes(x.toLowerCase())) {
                        return [
                          <strong key={x.imdbID + '_' + x}>{x}</strong>,
                          ' ',
                        ]
                      }
                      return [x, ' ']
                    })}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-12 text-xs text-gray-600">
        Design: https://dribbble.com/shots/8064813-Search-results
      </p>
    </div>
  )
}
export default Search
