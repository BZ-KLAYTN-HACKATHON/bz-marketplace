import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAccount } from 'wagmi'

import marketplaceApi from 'apis/marketplace-api'
import { ConnectButtonPre } from 'components/connectkit'
import { SuccessModal } from 'components/modals'
import {
  DetailBaseStats,
  DetailDescription,
  DetailIdentify,
  DetailPreview,
  DetailPriceAndStock
} from 'components/store'
import { Button } from 'components/ui/button'
import { useToast } from 'components/ui/use-toast'
import { Breadcrumb, LoadingScreen } from 'components/utils'
import { bnbChain } from 'configs/customChains'
import { DanceTokenABI } from 'contract/abis'
import { RG02_NFT_MARKET_ADDRESS, RG02_TOKEN_ADDRESS } from 'contract/addresses'
import { useAllowance, useApprove, useToggle } from 'hooks'
import { usePurchaseMarket } from 'hooks/marketplace'
import { truncateEthAddress } from 'utils'
import formatBalance from 'utils/formatBalance'

const MarketplaceItemPage = () => {
  const navigation = useNavigate()
  const { pathname } = useLocation()
  const { orderId } = useParams()

  const [breadcrumb, setBreadcrumb] = useState([])
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [notfound, setNotfound] = useState(false)

  const { address } = useAccount()
  const { toast } = useToast()
  const { visible, enable, disable } = useToggle()
  const nftData = useMemo(() => data?.nft || {}, [data])
  const isOwner = useMemo(
    () => data?.seller === address,
    [address, data?.seller]
  )

  // Check and process APPROVE item then return current data/status
  const {
    isLoading: isCheckingAllowance,
    isApproved,
    refetch: refetchAllowance
  } = useAllowance({
    abi: DanceTokenABI,
    allow: !isOwner,
    args: [address, RG02_NFT_MARKET_ADDRESS[bnbChain.id]],
    contractAddress: RG02_TOKEN_ADDRESS[bnbChain.id],
    price: formatBalance.formatFixedNumber(data?.price || 0n) || 0
  })

  const {
    write: writeApprove,
    isLoading: isApproving,
    isCheckingWallet,
    isSuccess: isApproveSuccess
  } = useApprove({
    abi: DanceTokenABI,
    allow: !isOwner,
    args: [
      RG02_NFT_MARKET_ADDRESS[bnbChain.id],
      data?.price
        ? formatBalance.formatFixedNumberToBigNumber(data.price).toString()
        : 0n
    ],
    contractAddress: RG02_TOKEN_ADDRESS[bnbChain.id],
    onSuccess: () => refetchAllowance()
  })

  // Purchase hook
  const { purchase, purchasing } = usePurchaseMarket({
    allow: (isApproveSuccess || isApproved) && !isOwner,
    contractAddress: RG02_NFT_MARKET_ADDRESS[bnbChain.id],
    orderId,
    onSuccess: () => {
      refetchAllowance()
      enable()
    }
  })

  const getData = useCallback(async () => {
    try {
      const result = await marketplaceApi.getItemByOrderId(orderId)
      setData(result.data)
      setBreadcrumb(() => [
        { name: 'Marketplace', link: '/marketplace' },
        { name: 'Item', link: pathname },
        { name: result.data.nft.name }
      ])
    } catch (error) {
      console.error(error)
      toast({ title: 'Error', description: "Can't get item data" })
      setNotfound(true)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [orderId, pathname, toast])

  useEffect(() => {
    getData()
  }, [getData])

  if (loading) {
    return <LoadingScreen content={'Getting item'} />
  }

  if (!orderId || notfound)
    return (
      <motion.section
        className='ignore-nav flex h-screen flex-col items-center justify-center gap-4 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className='font-bai-jamjuree text-5xl font-bold text-primary'>
          Oops
        </h1>
        <p>We can't find the item you were looking for</p>
        <Button className='text-white' onClick={() => navigation('/')}>
          Go to Store
        </Button>
      </motion.section>
    )
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className='ignore-nav font-secondary min-h-screen w-full p-0 px-[10px]
        font-bai-jamjuree text-neutral-50 md:p-5'
      >
        <div
          className='mx-auto mb-20 mt-5 w-full space-y-[10px] md:mt-10
          lg:mb-10 lg:space-y-5 
          xl:max-w-[980px]'
        >
          <Breadcrumb data={breadcrumb} />

          <div
            className='font-primary flex flex-wrap
            space-y-[10px] rounded-[5px] bg-primary-highlight
            p-[10px] md:gap-5 md:space-y-0 md:p-5'
          >
            <DetailPreview
              imageUrl={nftData.imageUrl}
              videoUrl={nftData.videoUrl}
            />

            <div className='w-full space-y-[26px] md:w-[calc(100%-388px-1.25rem)]'>
              <div className=''>
                <DetailIdentify name={nftData.name} />
                <DetailPriceAndStock
                  className='mt-[10px] md:mt-5'
                  price={formatBalance.formatFixedNumber(data.price || 0n)}
                  unit='idl'
                />
              </div>

              <div className='my-[10px] md:mb-[15px] md:mt-5'>
                {data.amountInStock === 0 ? null : (
                  <div>
                    <ConnectButtonPre>
                      {isOwner ? (
                        <>
                          <Button
                            className='w-full'
                            size='lg'
                            variant={'secondary'}
                            disabled={isOwner}
                          >
                            Buy
                          </Button>
                          <p className='mt-[7px] text-center font-bai-jamjuree text-sm text-[#ba92ba]'>
                            You cannot buy your own item.
                          </p>
                        </>
                      ) : isApproved ? (
                        <Button
                          className='w-full'
                          size='lg'
                          variant={'secondary'}
                          loading={purchasing}
                          disabled={!isApproved || isCheckingAllowance}
                          onClick={purchase}
                        >
                          Buy
                        </Button>
                      ) : (
                        <Button
                          className='w-full'
                          size='lg'
                          variant={'secondary'}
                          loading={
                            isApproving ||
                            isCheckingAllowance ||
                            isCheckingWallet
                          }
                          disabled={!writeApprove}
                          onClick={() => {
                            writeApprove?.()
                          }}
                        >
                          Approve
                        </Button>
                      )}
                    </ConnectButtonPre>
                  </div>
                )}
              </div>

              <DetailDescription
                gameDescription={nftData?.gameDescription || ''}
                collectionDescription={nftData?.collectionDescription || ''}
                itemDescription={nftData?.itemDescription || ''}
              />

              <DetailBaseStats
                dp={nftData?.attributes?.dp || 0}
                mdp={nftData?.attributes?.mdp || 0}
                earnPoint={nftData?.attributes?.earnPoint || 0}
                rarity={nftData?.attributes?.rarity}
                owner={truncateEthAddress(data?.seller)}
              />
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        open={visible}
        exit={() => {
          disable()
          navigation('marketplace')
        }}
        title={'Buy Success'}
        action={
          <>
            <Button
              className=''
              variant='outline'
              onClick={() => navigation('/marketplace')}
            >
              Back to Marketplace
            </Button>
            <Button>Open My Inventory</Button>
          </>
        }
      >
        The item is already in your inventory
      </SuccessModal>
    </motion.section>
  )
}

export default MarketplaceItemPage
