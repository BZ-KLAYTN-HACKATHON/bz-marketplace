import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { Loading } from 'components/utils'
import NftCardItem from './nft-card'

export const ListItemInStore = ({ data, loading, getItems }) => {
  const [isScrollDown, setIsScrollDown] = useState(false)
  const scrollTop = useRef(0)

  const endOfCurrentListRef = useRef(null)
  const [animationParent] = useAutoAnimate()
  const endOfCurrentListInViewport = useInView(endOfCurrentListRef, {
    margin: '0px -50px 0px 0px'
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollTop.current) {
        setIsScrollDown(true)
      } else {
        setIsScrollDown(false)
      }
      scrollTop.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [endOfCurrentListInViewport, getItems])

  useEffect(() => {
    if (endOfCurrentListInViewport && isScrollDown && !loading) {
      getItems()
    }
  }, [endOfCurrentListInViewport, getItems, isScrollDown, loading])

  return (
    <div className=''>
      <ul
        className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
        ref={animationParent}
      >
        {data.map((item, idx) => (
          <li className='col-span-1' key={idx}>
            <NftCardItem
              className='col-span-1'
              name={item.name}
              dType={item?.detail?.type}
              imageUrl={item.imageUrl}
              videoUrl={item.videoUrl}
              price={item.price}
              amount={item.amountInStock}
            />
          </li>
        ))}
      </ul>

      <div className='opacity-1 mt-10 pb-5' ref={endOfCurrentListRef}>
        {loading ? (
          <div className='flex w-full justify-center'>
            <div className='w-20'>
              <Loading />
            </div>
          </div>
        ) : (
          <div className='text-center font-bai-jamjuree font-bold text-primary underline underline-offset-4'>
            End of page
          </div>
        )}
      </div>
    </div>
  )
}
