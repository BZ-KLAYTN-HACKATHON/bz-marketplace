import { ConnectKitButton } from 'connectkit'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAccount } from 'wagmi'

import marketplaceApi from 'apis/marketplace-api'
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
  const [purchasing, setPurchasing] = useState(false)

  const { address } = useAccount()
  const { toast } = useToast()
  const nftData = useMemo(() => data?.nft || {}, [data])

  const getData = useCallback(async () => {
    try {
      const result = await marketplaceApi.getItemByOrderId(orderId)
      setData(result.data)
      setBreadcrumb(() => [
        { name: 'Store', link: '/store' },
        { name: 'Item', link: pathname },
        { name: result.data.name }
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

  const handlePurchase = useCallback(async () => {
    setPurchasing(true)
    try {
    } catch (error) {
      console.error(error)
    } finally {
      setPurchasing(false)
    }
  }, [])

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
            space-y-[10px] rounded-[5px] bg-primary-foreground
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
                    {!address ? (
                      <ConnectKitButton.Custom>
                        {({ show, isConnecting }) => (
                          <Button
                            className='w-full text-white'
                            size='lg'
                            disable={isConnecting}
                            onClick={show}
                          >
                            {isConnecting
                              ? 'Submit on wallet'
                              : 'Connect wallet to order'}
                          </Button>
                        )}
                      </ConnectKitButton.Custom>
                    ) : (
                      <Button
                        className='w-full'
                        size='lg'
                        variant={'secondary'}
                        loading={purchasing}
                        disable={loading || purchasing}
                        onClick={() => handlePurchase()}
                      >
                        Buy
                      </Button>
                    )}

                    <p className='mt-[7px] text-center font-bai-jamjuree text-sm text-[#ba92ba]'>
                      We accept payments by crypto
                    </p>
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
    </motion.section>
  )
}

export default MarketplaceItemPage
