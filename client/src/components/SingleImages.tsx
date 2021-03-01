import { FC, useState } from 'react'
import { Blurhash } from 'react-blurhash'
import LazyLoad from 'react-lazyload'
import { Download } from 'react-bootstrap-icons'

interface Props {
  photo: any
}

export const SingleImage: FC<Props> = ({ photo }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [hover, setHover] = useState(false)

  return (
    <div
      className='image'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {imageLoading && (
        <Blurhash
          hash={photo.blur_hash}
          width={'100%'}
          height={'100%'}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      <LazyLoad once offset={200}>
        <img
          src={photo.urls.small}
          alt={photo.alt_description}
          onLoad={() => setImageLoading(false)}
          style={{ visibility: imageLoading ? 'hidden' : 'visible' }}
        />
        {hover && (
          <div className='info'>
            <div className='bottom'>
              <p className='author'>
                <img
                  className='author-img'
                  src={photo.user.profile_image.small}
                  alt=''
                />
                <span>{photo.user.name}</span>
              </p>
              <a
                download
                target='_blank'
                rel='noreferrer'
                href={`${photo.urls.full}.png`}
              >
                <Download className='download' size={32} />
              </a>
            </div>
          </div>
        )}
      </LazyLoad>
    </div>
  )
}
