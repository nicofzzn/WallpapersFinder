import React, { useReducer } from 'react'
import { Search } from './components/Search'
import { Images } from './components/Images'
import axios from 'axios'
import { Spinner } from './components/Spinner'

interface Photos {
  data: Object[]
  page: number
  query?: string
  loading: boolean
  total?: number
  totalPages?: number
}

interface Action {
  type:
    | 'LOAD_MORE'
    | 'SET_LOADING'
    | 'FETCH'
    | 'RESET_PAGE'
    | 'SET_QUERY'
    | 'EMPTY_DATA'
  payload?: any
}

const initialState: Photos = {
  data: [],
  page: 1,
  loading: false,
}

function photoReducer(photos: Photos, action: Action) {
  switch (action.type) {
    case 'FETCH':
      console.log('fetch')
      const { results, query, total, totalPages } = action.payload
      return {
        ...photos,
        data: results,
        query: query,
        total,
        totalPages,
        page: photos.page + 1,
      }
    case 'LOAD_MORE':
      console.log('load more')
      return {
        ...photos,
        data: [...photos.data, ...action.payload],
        page: photos.page + 1,
      }
    case 'RESET_PAGE':
      console.log('reset page')
      return { ...photos, page: 1 }
    case 'SET_QUERY':
      console.log('set query')
      return { ...photos, query: action.payload }
    case 'EMPTY_DATA':
      console.log('empty data')
      return initialState
    case 'SET_LOADING':
      return { ...photos, loading: !photos.loading }
    default:
      return photos
  }
}

const App: React.FC = () => {
  const [photos, dispatch] = useReducer(photoReducer, initialState)

  function fetchImages(query: string) {
    dispatch({ type: 'SET_LOADING' })
    dispatch({ type: 'RESET_PAGE' })
    axios
      .get(`/api/search/${query}/1`)
      .then(res => {
        dispatch({
          type: 'FETCH',
          payload: {
            results: res.data.results,
            query,
            total: res.data.total,
            totalPages: res.data.total_pages,
          },
        })
        dispatch({ type: 'SET_LOADING' })
      })
      .catch(err => {
        console.log(err.response)
        dispatch({ type: 'SET_LOADING' })
      })
  }

  function loadMore() {
    axios
      .get(`/api/search/${photos.query}/${photos.page}`)
      .then(res => {
        dispatch({ type: 'LOAD_MORE', payload: res.data.results })
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  function emptyData() {
    dispatch({ type: 'EMPTY_DATA' })
  }

  return (
    <div className='container'>
      <Search
        loading={photos.loading}
        fetchImages={fetchImages}
        emptyData={emptyData}
      />
      {photos.loading ? (
        <Spinner />
      ) : (
        <Images total={photos.total} data={photos.data} loadMore={loadMore} />
      )}
    </div>
  )
}

export default App
