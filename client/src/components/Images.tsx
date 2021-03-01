import { FC } from 'react'
import { SingleImage } from './SingleImages'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from './Spinner'

interface Props {
  data: any[]
  total: number
  loadMore(): void
}

export const Images: FC<Props> = ({ data, loadMore, total }) => {
  return (
    <div>
      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          hasMore={data.length < total}
          loader={<Spinner />}
          next={() => loadMore()}
          style={{ overflow: 'hidden' }}
        >
          <div className='images'>
            {data.map((photo, idx) => (
              <SingleImage key={idx} photo={photo} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}
