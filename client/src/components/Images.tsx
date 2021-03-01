import { FC, useState } from 'react'
import { SingleImage } from './SingleImages'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from './Spinner'
import ReactModal from 'react-modal'

interface Props {
  data: any[]
  total: number
  loadMore(): void
}

ReactModal.setAppElement('#root')

export const Images: FC<Props> = ({ data, loadMore, total }) => {
  const [modal, setModal] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  function modalHandler(url: string) {
    setModal(true)
    setPreviewImage(url)
  }

  return (
    <div>
      <ReactModal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        className='modal'
        overlayClassName='overlay'
        bodyOpenClassName='ReactModal__Body--open'
        shouldFocusAfterRender={false}
      >
        <img src={previewImage} alt='' />
      </ReactModal>
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
              <SingleImage
                key={idx}
                photo={photo}
                modalHandler={modalHandler}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}
