import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import CoinIcon from 'assets/img/store/coin-icon.svg'

const NftCardItem = ({
  className = '',
  name,
  dType,
  imageUrl,
  videoUrl,
  price,
  amount,
  nftId
}) => {
  const itemRef = useRef(null)
  const inViewport = useInView(itemRef, {
    margin: '0px 0px 100px 0px'
  })

  return (
    <motion.div
      className=''
      whileHover={{
        y: -6
      }}
      ref={itemRef}
    >
      <div
        className={`rounded-[10px] border-2
				border-border-foreground bg-primary-foreground p-[15px] text-primary
				${className}`}
      >
        {/* Identify */}
        <div className='font-primary space-y-[5px]'>
          <h6
            className='w-full truncate text-left text-lg font-bold 
            text-white'
            title={name}
          >
            {name}
          </h6>
          <p className='text-left text-sm text-[#C9ACEC]'>
            <span>Idol World</span>
            {nftId && <span> - #{nftId}</span>}
          </p>
        </div>

        {/* Preview Image/Video */}
        <div
          className='bg-tw-900 relative mb-[17.25px] mt-[13.5px] 
          aspect-[16/17] w-full overflow-hidden rounded-[5px]'
        >
          <div
            className='absolute left-2 top-2 inline-block rounded-[3px] bg-[#935D93]/50
            px-3 pb-[3px] pt-[2px] text-xs text-white/75'
          >
            {dType}
          </div>

          {inViewport ? (
            <motion.video
              className='h-full w-full object-cover'
              poster={imageUrl}
              muted
              playsInline
              autoPlay
              loop
              preload='none'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <source src={videoUrl} />
            </motion.video>
          ) : null}
        </div>

        {/* Price */}
        {price ? (
          <div
            className={`flex items-center ${
              amount ? 'justify-between' : 'justify-center'
            }`}
          >
            <div className='price flex items-center justify-center space-x-2'>
              <div className='hidden h-[23px] w-[23px]'>
                <img src={CoinIcon} alt='coin' className='h-full w-full' />
              </div>
              <p className='font-primary text-base font-bold text-[#F9CC29]'>
                {price} <span>USD</span>
              </p>
            </div>
            {amount ? (
              <p className='stock text-xs text-white/[46%]'>
                {amount} in stock
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}

export default NftCardItem
