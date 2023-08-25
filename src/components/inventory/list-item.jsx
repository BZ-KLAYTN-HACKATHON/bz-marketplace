import { useAutoAnimate } from '@formkit/auto-animate/react'

import { Loading } from 'components/utils'

export const ListItemInInventory = ({ children, loading }) => {
  const [animationParent] = useAutoAnimate()

  return (
    <div className=''>
      <ul
        className='grid grid-cols-2 gap-x-[5px] gap-y-2.5 pt-2 sm:grid-cols-2 md:grid-cols-4 md:gap-x-6 md:gap-y-6'
        ref={animationParent}
      >
        {children}
      </ul>

      <div className='opacity-1'>
        {loading ? (
          <div className='flex w-full justify-center pt-5'>
            <div className='w-20'>
              <Loading />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
