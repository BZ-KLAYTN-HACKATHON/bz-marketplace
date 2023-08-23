import { useCallback, useState } from 'react'

import eventApi from 'apis/event-api'
import {
  Banner,
  CardFlipList,
  MorePlayers,
  TaskList,
  ViewPoolBox
} from 'components/event/03_07'
import { DownloadIdolWorld } from 'components/modals'
import { ErrorUserInGame, FloatEventVideo } from 'components/modals/event'
import { useToggle } from 'hooks'
import { useAccount } from 'wagmi'

const Event = () => {
  const [isCompletedMisson, setIsCompletedMisson] = useState(false)
  const [showModalUserIngame, setShowModalUserIngame] = useState(false)
  const [nfts, setNfts] = useState([])

  const { address } = useAccount()
  const isViewedFirstVideoInEvent = true
  const { visible, disable } = useToggle()

  const checkUserIngame = useCallback(async () => {
    try {
      const { data } = await eventApi.userIngame()
      if (!data) {
        setShowModalUserIngame(true)
        return false
      }
      return true
    } catch (error) {
      console.log('checkUserIngame', error)
      return undefined
    }
  }, [])

  return (
    <div
      className='font-secondary ignore-nav relative flex
      min-h-[calc(100vh-50px)] w-full justify-end'
    >
      <div
        className={`relative z-[1] w-full pb-20 transition-all duration-500`}
      >
        <Banner />

        <div className='mx-auto max-w-[1549px] px-2.5 pt-2.5 xl:pt-0'>
          <div className='relative z-[4] flex flex-col items-center gap-5 pb-[31px] xl:-top-[31px] 3xl:flex-row 3xl:items-start'>
            <div className='w-full space-y-[30px] overflow-auto lg:w-[1100px] lg:min-w-max'>
              <div className='relative'>
                <CardFlipList
                  setterNFTs={(data) => setNfts(data)}
                  accept={isCompletedMisson && address}
                  after={checkUserIngame}
                />
              </div>
              <MorePlayers />
            </div>
            <div className='w-full max-w-[1100px] space-y-5'>
              <ViewPoolBox data={nfts} />
              <TaskList onCompleted={() => setIsCompletedMisson(true)} />
            </div>
          </div>
        </div>

        {/* Modal */}
        <ErrorUserInGame
          visible={showModalUserIngame}
          onClose={() => {
            setShowModalUserIngame(false)
          }}
        />

        <FloatEventVideo
          title='Claim free NFT, play to Earn!'
          link='https://cdn-iw-02.rofi.io/events/airdrop-earn/Teaser_July_the_big_storm_in_Idol_World_master3_cut.mp4'
          isOpen={!isViewedFirstVideoInEvent}
          closeModal={() => {}}
        />

        <DownloadIdolWorld
          visible={visible}
          onClose={disable}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default Event
