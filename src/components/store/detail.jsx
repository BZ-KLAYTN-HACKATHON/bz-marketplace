import { useMemo } from 'react'

import normal from 'assets/img/store/rarity/common.png'
import legendary from 'assets/img/store/rarity/legendary.png'
import epic from 'assets/img/store/rarity/mythical.png'
import rare from 'assets/img/store/rarity/uncommon.png'

export const DetailIdentify = ({ name, id }) => {
  return (
    <div className='w-full space-y-[10px] sm:space-y-[9.67px] md:space-y-[6.67px]'>
      <h1
        className='text-[28px] font-medium text-violet-100 sm:text-[32px]'
        title={name}
      >
        {name}
      </h1>
      <p className='text-violet-250 text-sm uppercase'>
        <span>Idol World</span>
        {id ? <span>{` - #${id}`}</span> : null}
      </p>
    </div>
  )
}

export const DetailPreview = ({ imageUrl, videoUrl }) => {
  return (
    <div className='w-full md:max-w-[388px]'>
      {/* Preview */}
      <div className='overflow-hidden rounded-[5px] border-2 border-primary lg:mb-[30px]'>
        <div className='aspect-[16/17] w-full rounded-[5px]'>
          <video
            className='h-full w-full object-cover'
            poster={imageUrl}
            muted={true}
            playsInline={true}
            autoPlay={true}
            loop
            src={videoUrl}
          >
            Your browser does not support the video tag.+
          </video>
        </div>
      </div>

      {/* <div
          className='grid w-full grid-cols-2 gap-y-[19px] gap-x-[50px] rounded-[3px] 
          bg-violet-400 px-5 py-[22px] pt-4'
        >
          <div className='col-span-1 gap-2'>
            <h4 className='text-xs font-medium text-violet-100'>
              Contract Address
            </h4>
            <p className='text-[13px] text-violet-250'>12345678</p>
          </div>
          <div className='col-span-1 gap-2'>
            <h4 className='text-xs font-medium text-violet-100'>Network</h4>
            <p className='text-[13px] text-violet-250'>Arbitrum</p>
          </div>
        </div> */}
    </div>
  )
}

export const DetailPriceAndStock = ({
  className = '',
  price = 0,
  unit = 'USD',
  stock
}) => {
  return (
    <p className={`flex items-center space-x-[10px] ${className}`}>
      <span className='text-xl font-bold uppercase text-[#F9CC29]'>{`${price} ${unit}`}</span>
      <span className='text-sm text-white/[46%]'>
        {stock ? (stock > 0 ? `${stock} in stock` : 'Out of stock') : ''}
      </span>
    </p>
  )
}

export const DetailDescription = ({
  gameDescription,
  collectionDescription,
  itemDescription
}) => {
  return (
    <div className='space-y-[10px]'>
      <p className='text-sm font-medium text-white'>Description</p>
      <div className='space-y-2 text-sm font-light text-[#EFE6EF]'>
        <p>{gameDescription}</p>
        <p>{collectionDescription}</p>
        <p>{itemDescription}</p>
        <p>
          Owners of this NFT have the opportunity to receive IDL tokens when
          participating in in-game matches.
        </p>
      </div>
    </div>
  )
}

const DetailBox = ({ children, title = '', className = '' }) => {
  return (
    <div
      className={`space-y-3 rounded-[10px] border border-primary
      p-[10px] ${className}`}
    >
      {title ? (
        <h6 className='mb-[11px] text-[15px] font-bold text-primary'>
          {title}
        </h6>
      ) : null}

      {children}
    </div>
  )
}

export const DetailBaseStats = ({ rarity, mdp, dp, earnPoint, owner }) => {
  // eslint-disable-next-line no-unused-vars
  const rarityIcon = useMemo(() => {
    switch (rarity) {
      case 1:
        return normal
      case 2:
        return rare
      case 3:
        return epic
      case 4:
        return legendary
      default:
        return legendary
    }
  }, [rarity])

  const rarityName = useMemo(() => {
    switch (rarity) {
      case 1:
        return 'Normal'
      case 2:
        return 'Rare'
      case 3:
        return 'Epic'
      default:
        return 'Legendary'
    }
  }, [rarity])

  return (
    <>
      <DetailBox>
        <div className='grid grid-cols-2 text-violet-100 lg:grid-cols-3'>
          <div
            className='col-span-1 flex flex-col items-center space-y-[10px] text-xs 
            md:col-span-2 lg:col-span-3'
          >
            <p className='text-center text-xs text-violet-100'>Rarity</p>
            <p className='text-center text-base text-white'>{rarityName}</p>
          </div>
        </div>
      </DetailBox>
      {owner ? (
        <DetailBox>
          <div className='space-y-[11px]'>
            <p className='text-center text-xs text-violet-100'>Owner</p>
            <p className='text-center text-base text-white'>{owner}</p>
          </div>
        </DetailBox>
      ) : null}

      <DetailBox>
        <h6 className='text-tw-400 mb-[11px] text-[15px] font-bold'>
          Base Stats
        </h6>
        <div className='grid grid-cols-2 lg:grid-cols-3'>
          <div className='col-span-1 text-xs'>
            <div
              className='border-tw-500 bg-tw-600 truncate border 
              border-b-[0.5px] px-[20px] py-[10px] text-center text-violet-100'
              title='Max DP'
            >
              Max DP
            </div>
            <div
              className='border-tw-500 border border-t-[0.5px] px-[20px] py-[10px] 
              text-center font-bold'
            >
              {mdp}
            </div>
          </div>
          <div className='col-span-1 text-xs'>
            <div
              className='border-tw-500 bg-tw-600 truncate border 
              border-b-[0.5px] px-[20px] py-[10px] text-center text-violet-100'
              title='Durability Point'
            >
              Durability Point
            </div>
            <div
              className='border-tw-500 border border-t-[0.5px] px-[20px] py-[10px] 
              text-center font-bold'
            >
              {dp}
            </div>
          </div>
          <div className='col-span-1 text-xs'>
            <div
              className='border-tw-500 bg-tw-600 truncate border 
              border-b-[0.5px] px-[20px] py-[10px] text-center text-violet-100'
              title='Earn Point'
            >
              Earn Point
            </div>
            <div
              className='border-tw-500 border border-t-[0.5px] px-[20px] py-[10px] 
              text-center font-bold'
            >
              {earnPoint}
            </div>
          </div>
        </div>
      </DetailBox>
    </>
  )
}
