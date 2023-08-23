import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { isAndroid, isDesktop, isIOS } from 'react-device-detect'
import { Link } from 'react-router-dom'

import eventApi from 'apis/event-api'
import ArrowTopRight from 'assets/img/event/arrow-top-right.svg'
import Task from 'assets/img/event/done.svg'
import TaskDone from 'assets/img/event/done1.svg'
import IDLCoinImage from 'assets/img/event/idl-coin.svg'
import Ins1 from 'assets/img/event/ins-01.png'
import Ins2 from 'assets/img/event/ins-02.png'
import Ins3 from 'assets/img/event/ins-03.png'
import Ins4 from 'assets/img/event/ins-04.png'
import Ins5 from 'assets/img/event/ins-05.png'
import RDIcon from 'assets/img/event/rd.svg'
import TaskListImage from 'assets/img/event/task-list.svg'
import { DownloadIdolWorld } from 'components/modals'
import {
  CongratulationEvent,
  ErrorModal,
  PrizePool
} from 'components/modals/event'
import { Button } from 'components/ui/button'
import { useToggle } from 'hooks'
import { moveElementInArray } from 'utils'
import { useAccount } from 'wagmi'
import { FlipCard } from './flip-card'
// import { DolaIcon, GiftIcon } from 'components/icons'

export const MorePlayers = () => {
  return (
    <div className='event-box overflow-hidden font-Baloo2'>
      <div className='flex items-center gap-5 border-b-2 border-secondary bg-[#7012E1] px-2.5 py-2'>
        <img src={RDIcon} alt='anything' className='h-[42px] w-[43px]' />
        <p className='text-2xl font-bold text-white'>
          Earn more USD with your NFT
        </p>
      </div>
      <div className='block justify-between bg-[#230448] px-9 pb-[44px] pt-[52px] md:flex'>
        <div className='text-lg text-white'>
          <p>
            {'Get free NFT -> Play Idol World -> Collect gIDL -> Earn $ prize'}
          </p>
          <p>
            Prize pool up to{' '}
            <span className='font-bold text-secondary'>$8,000</span> and more!
          </p>
        </div>
        <Link to={'/event/earn-money'}>
          <Button
            size='lg'
            className='px-10 text-base uppercase'
            variant='secondary'
          >
            EARN NOW
          </Button>
        </Link>
      </div>
    </div>
  )
}

export const ViewPoolBox = ({ data }) => {
  const [prizePoolModal, setPrizePoolModal] = useState(false)

  return (
    <>
      <div
        className='next-gradient relative h-[80px] cursor-pointer overflow-hidden rounded-[10px] before:absolute
        before:left-1/2 before:top-1/2 before:z-[1] before:h-[calc(100%-4px)] before:w-[calc(100%-4px)]
        before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-[10px] before:bg-[#7012E1] 
        md:h-[100px] lg:h-[150px]'
        onClick={() => setPrizePoolModal(true)}
      >
        <div className='relative z-10 flex h-full w-full items-center justify-between pl-[30px] pr-5 text-white'>
          <div className='flex items-center gap-[26px]'>
            <img src={IDLCoinImage} alt='IDL Coin' className='w-[53px]' />
            <p className='shadow-text-3 text-[22px] font-bold capitalize underline underline-offset-2'>
              View NFT Pool
            </p>
          </div>
          <div className=''>
            <img className='w-[26px]' src={ArrowTopRight} alt='arrow' />
          </div>
        </div>
      </div>

      {/* MODAL */}
      <PrizePool
        data={data}
        isOpen={prizePoolModal}
        closeModal={() => setPrizePoolModal(false)}
      />
    </>
  )
}

export const TaskList = ({ onCompleted }) => {
  const { address } = useAccount()
  //? State
  const [misson, setMisson] = useState({
    fb: window.localStorage.getItem(`event-tasfk-fb-misson-${address}`),
    tw: window.localStorage.getItem(`event-task-tw-misson-${address}`),
    discord: window.localStorage.getItem(
      `event-task-discord-misson-${address}`
    ),
    download: window.localStorage.getItem(
      `event-task-download-misson-${address}`
    )
  })

  //? Var
  const { visible, enable, disable } = useToggle()

  //? Func
  const setLoading = (key, value = 'loading') => {
    setMisson((prev) => ({ ...prev, [key]: value }))
  }

  const setCompleted = (key) => {
    window.localStorage.setItem(`event-task-${key}-misson-${address}`, 'true')
    setMisson((prev) => ({ ...prev, [key]: 'true' }))
  }

  const setVerifyingWhenInvisible = (key) => {
    if (misson[key] === 'true') return

    setLoading(key)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
      } else {
        setTimeout(() => {
          setCompleted(key)
        }, 4000)
      }
    })
  }

  useEffect(() => {
    Object.keys(misson).every((key) => misson[key] === 'true') && onCompleted()
  }, [misson, onCompleted])

  useEffect(() => {
    setMisson({
      fb: window.localStorage.getItem(`event-task-fb-misson-${address}`),
      tw: window.localStorage.getItem(`event-task-tw-misson-${address}`),
      discord: window.localStorage.getItem(
        `event-task-discord-misson-${address}`
      ),
      download: window.localStorage.getItem(
        `event-task-download-misson-${address}`
      )
    })
  }, [address])

  return (
    <div className='w-full space-y-2.5 rounded-[10px] border border-[#E3AAFF] bg-[#4A0D93] p-5'>
      <div className='flex items-center gap-5'>
        <img src={TaskListImage} alt='' className='w-16' />
        <h4 className='shadow-text-3 text-[33px] font-bold text-white'>
          Tasks list
        </h4>
      </div>
      {address ? (
        <>
          <p className='text-center text-base text-white'>
            Complete the tasks below to get free NFTs and click "
            <span className='font-bold'>Ready to Open</span>" above to open your
            NFTs
          </p>
          <div className='space-y-2.5'>
            <Card
              isDone={misson.fb === 'true'}
              isLoading={misson.fb === 'loading'}
              content='Like Facebook page'
              link={'https://www.facebook.com/IdolWorldGames'}
              onClick={() => setVerifyingWhenInvisible('fb')}
            />
            <Card
              isDone={misson.tw === 'true'}
              isLoading={misson.tw === 'loading'}
              content='Follow Twitter'
              link={'https://twitter.com/intent/user?screen_name=idolworldann'}
              onClick={() => setVerifyingWhenInvisible('tw')}
            />
            <Card
              isDone={misson.discord === 'true'}
              isLoading={misson.discord === 'loading'}
              content='Join Discord and Verify'
              link={'https://discord.com/invite/Da7qprKx7Y'}
              onClick={() => setVerifyingWhenInvisible('discord')}
            />
            <Card
              isDone={misson.download === 'true'}
              isLoading={misson.download === 'loading'}
              content='Download App'
              isDownload={true}
              link={
                isIOS
                  ? 'https://apps.apple.com/th/app/idol-world-dance-with-idol/id6444822913?l=th'
                  : 'https://play.google.com/store/apps/details?id=com.rofi.games.idolworlds'
              }
              onClick={() => {
                if (isIOS || isAndroid) {
                  setVerifyingWhenInvisible('download')
                } else {
                  if (misson.download !== 'true') enable()
                }
              }}
            />
          </div>
        </>
      ) : (
        <div className='shadow-text-3 text-center text-[22px] text-white'>
          Please signin and complete tasks
        </div>
      )}

      <DownloadIdolWorld
        visible={visible}
        onClick={() => setVerifyingWhenInvisible('download')}
        onClose={disable}
      />
    </div>
  )
}

export const Card = ({
  link,
  content,
  isDone,
  isLoading,
  onClick,
  isDownload
}) => {
  return (
    <div className=''>
      <div
        className={`hover:border-b-highlight flex items-center justify-between gap-3 rounded-[10px] border
            border-b-2 border-[#E3AAFF] px-5 py-[17px] text-white transition-all duration-200
            ease-linear hover:border-b-2 hover:border-x-transparent 
            hover:border-t-transparent hover:bg-[#7012E1] ${
              isDone
                ? 'border-b-highlight border-0 border-b-2 bg-[#7012E1]'
                : 'bg-transparent'
            }`}
      >
        <div className='flex items-center gap-2.5'>
          {isDone ? (
            <img src={TaskDone} alt='anything' className='w-[35px]' />
          ) : (
            <img src={Task} alt='anything' className='w-[35px]' />
          )}
          <p className='text-sm font-bold'>{content}</p>
        </div>

        <div className=''>
          {!isDone ? (
            isDownload && isDesktop ? (
              <Button onClick={onClick} loading={isLoading} variant='secondary'>
                Go to task
              </Button>
            ) : (
              <Button onClick={onClick} loading={isLoading} variant='secondary'>
                <a href={link} target='_blank' rel='noreferrer'>
                  Go to task
                </a>
              </Button>
            )
          ) : null}
        </div>
      </div>
    </div>
  )
}

export const CardFlipList = ({ accept, after, setterNFTs }) => {
  const [nfts, setNfts] = useState([1, 2, 3, 4, 5])
  const [nft, setNft] = useState(null)
  const [isOpening, setIsOpening] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [cardSelected, setCardSelected] = useState(-1)
  const [congratulationPopup, setCongratulationPopup] = useState(false)
  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)

  const insList = [Ins1, Ins2, Ins3, Ins4, Ins5]

  const getNFTList = useCallback(async () => {
    try {
      const res = await eventApi.getFreeNfts()
      setNfts(res?.data)
      setterNFTs(res?.data)
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const spin = useCallback(
    async (index, callback) => {
      try {
        const res = await after()
        if (!res) return
      } catch (error) {
        console.error(error)
      }
      setIsOpening(true)
      try {
        const res = await eventApi.spin()
        setNft(res?.data)
        const idxItem = nfts.findIndex(
          (_) =>
            _.femaleItem.itemType === res?.data?.items[0]?.type ||
            _.maleItem.itemType === res?.data?.items[0]?.type
        )
        setNfts((prev) => {
          let newClone = [...prev]
          newClone = moveElementInArray(newClone, idxItem, index)
          return newClone
        })

        setCardSelected(index)
        callback()
        setTimeout(() => {
          setIsDone(true)
        }, 1200)
        setTimeout(() => {
          setCongratulationPopup(true)
        }, 2000)
      } catch (error) {
        setIsOpening(false)
        setError(error.message)
        setTimeout(() => {
          setIsError(true)
        }, 1000)
      }
    },
    [after, nfts]
  )

  useEffect(() => {
    getNFTList()
  }, [getNFTList])

  return (
    <div className='event-box overflow-hidden font-Baloo2'>
      <div
        className='flex flex-wrap items-center justify-between gap-2 rounded-tl-[10px] 
        rounded-tr-[10px] border-b-2 border-secondary bg-[#7012E1] px-2.5 py-2'
      >
        <div className='flex items-center gap-5'>
          <img src={RDIcon} alt='anything' className='h-[42px] w-[43px]' />
          <p className='text-2xl font-bold text-white'>Get Free NFT</p>
        </div>
        <div className='text-base text-white'>
          Choose one of the cards below to get a free NFT 👇
        </div>
      </div>

      <div className='relative'>
        <div
          className='relative z-[9] flex w-full snap-x scroll-pl-4 gap-4 overflow-x-auto
          overflow-y-hidden rounded-bl-[10px] rounded-br-[10px] bg-[#1F0A38] p-4'
        >
          {nfts.map((_, idx) => (
            <FlipCard
              data={_}
              index={idx}
              key={idx}
              isOpening={isOpening}
              isDone={isDone}
              sex={nft?.gender}
              cardSelected={cardSelected === idx}
              bg={insList[idx]}
              onClick={!isOpening ? spin : () => {}}
            />
          ))}
        </div>

        <AnimatePresence mode='wait'>
          {accept ? null : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute left-0 top-0 z-[10] flex h-full w-full cursor-not-allowed items-center justify-center rounded-[10px] bg-[#13002A66]'
            >
              <div className='select-none rounded-[10px] bg-secondary px-9 py-2.5 text-center text-xl font-medium text-black '>
                Log in and complete all tasks to open 1 exclusive NFT
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      <CongratulationEvent
        data={nft}
        isOpen={congratulationPopup}
        closeModal={() => setCongratulationPopup(false)}
      />

      <ErrorModal
        message={error}
        isOpen={isError}
        closeModal={() => setIsError(false)}
      />
    </div>
  )
}

//? EXPORT COMPONENT
export * from './banner'
export * from './flip-card'
