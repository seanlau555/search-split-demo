import axios from 'axios'
import { useMutation } from 'react-query'

const apiKey = '7468f8b0'

export function useSearch({ onSuccess }) {
  return useMutation(
    async (text) => {
      const response = await axios.get(
        `https://omdbapi.com?apikey=${apiKey}&s=${text}`,
      )
      const res = response.data.Response
      const data = response.data.Search
      if (res === 'True') {
        const movies = data.filter((x) => x.Type === 'movie')
        const series = data.filter((x) => x.Type === 'series')
        return { movies, series }
      }
      return { movies: [], series: [] }
    },
    {
      onSuccess,
      onError(e) {
        console.log('Error in searching', e)
      },
    },
  )
}
