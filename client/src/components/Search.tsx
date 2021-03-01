import { FC, useState } from 'react'

interface Props {
  loading: boolean
  fetchImages(query: string): void
  emptyData(): void
}

export const Search: FC<Props> = ({ loading, fetchImages, emptyData }) => {
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    emptyData()
    fetchImages(query)
  }

  return (
    <div className='search'>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
          disabled={loading}
          required={true}
        />
      </form>
    </div>
  )
}
