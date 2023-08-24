import {
  ArrowDownRightIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpIcon
} from '@heroicons/react/20/solid'
import BigNumber from 'bignumber.js'
import { motion } from 'framer-motion'
import { useAllowance, useApprove, useToggle } from 'hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { erc721ABI, useAccount } from 'wagmi'

import userApi from 'apis/user-api'
import { ConnectButtonPre } from 'components/connectkit'
import { CancelOrder, SellNFT } from 'components/modals/inventory'
import {
  DetailBaseStats,
  DetailDescription,
  DetailIdentify,
  DetailPreview,
  DetailPriceAndStockInInventory
} from 'components/store'
import { Button } from 'components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from 'components/ui/sheet'
import { useToast } from 'components/ui/use-toast'
import { Breadcrumb, Loading, LoadingScreen } from 'components/utils'
import { bnbChain } from 'configs/customChains'
import {
  RG02_NFT_ADDRESS,
  RG02_NFT_MARKET_ADDRESS,
  RG02_TOKEN_ADDRESS
} from 'contract/addresses'
import {
  useCancelOrderInventory,
  useSellInventory,
  useUpdatePriceInventory
} from 'hooks/inventory'
import formatBalance from 'utils/formatBalance'

export const InventoryDetail = ({
  id,
  prevId,
  nextId,
  style,
  open,
  exit,
  setId,
  onUpdate
}) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [notfound, setNotfound] = useState(false)
  const [newPrice, setNewPrice] = useState(0)

  const { address } = useAccount()
  const { toast } = useToast()
  const isSelling = useMemo(() => data?.status === 'Selling', [data?.status])

  const {
    enable: enableSellModal,
    disable: disableSellModal,
    visible: sellModalVisible
  } = useToggle()
  const {
    enable: enableUpdatePriceModal,
    disable: disableUpdatePriceModal,
    visible: updatePriceModalVisible
  } = useToggle()
  const {
    enable: enableCancelOrderModal,
    disable: disableCancelOrderModal,
    visible: cancelOrderModalVisible
  } = useToggle()

  // Init params of contracts
  const initSellParams = useMemo(
    () => [
      RG02_NFT_ADDRESS[bnbChain.id],
      data?.nftId,
      RG02_TOKEN_ADDRESS[bnbChain.id]
    ],
    [data?.nftId]
  )
  const initUpdatePriceParams = useMemo(
    () => [Number(data?.orderId)],
    [data?.orderId]
  )

  // Check and process APPROVE item then return current data/status
  const {
    isLoading: isCheckingAllowance,
    isApproved,
    refetch: refetchAllowance
  } = useAllowance({
    abi: erc721ABI,
    allow: 'status' in data ? !isSelling : true,
    args: [data?.nftId],
    contractAddress: RG02_NFT_ADDRESS[bnbChain.id],
    functionName: 'getApproved',
    type: 'erc721',
    spender: RG02_NFT_MARKET_ADDRESS[bnbChain.id]
  })
  const {
    write: writeApprove,
    isLoading: isApproving,
    isCheckingWallet
  } = useApprove({
    abi: erc721ABI,
    allow: !isApproved && ('status' in data ? !isSelling : true),
    args: [RG02_NFT_MARKET_ADDRESS[bnbChain.id], data?.nftId],
    contractAddress: RG02_NFT_ADDRESS[bnbChain.id],
    onSuccess: () => refetchAllowance()
  })

  // Sell hook
  const { sell, selling } = useSellInventory({
    allow: isApproved && data?.nftId && open,
    onSuccess: () => {
      refetchAllowance()
      refetchData(
        (data) => data?.status === 'Selling',
        (data) => onUpdate(id, { status: 'Selling', orderId: data?.orderId })
      )
      disableSellModal()
    }
  })

  // Update price hook
  const { update, updating } = useUpdatePriceInventory({
    allow: !isApproved && data?.nftId && open,
    onSuccess: () => {
      refetchAllowance()
      refetchData(
        (data) => data?.price === newPrice,
        () => onUpdate(id, { price: newPrice })
      )

      disableUpdatePriceModal()
    }
  })

  // Cancel order hook
  const { cancel, canceling } = useCancelOrderInventory({
    allow: !isApproved && data?.orderId && open,
    args: [Number(data?.orderId)],
    onSuccess: () => {
      refetchAllowance()
      refetchData(
        (data) => data?.status === 'Available',
        () =>
          onUpdate(id, {
            status: 'Available',
            price: 0n.toString(),
            orderId: null
          })
      )
      disableCancelOrderModal()
    }
  })

  const getData = useCallback(
    async (allowLoading = true) => {
      allowLoading && setLoading(true)
      try {
        const result = await userApi.getInventoryItem(id)
        setData(result.data)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error',
          description: 'Can not get item',
          variant: 'destructive'
        })
        setNotfound(true)
      } finally {
        setTimeout(() => {
          allowLoading && setLoading(false)
        }, 1000)
      }
    },
    [id, toast]
  )

  const refetchData = useCallback(
    (condition, onSuccess) => {
      setReload(true)
      let loop = 0

      const fc = async (onFinally) => {
        try {
          const result = await userApi.getInventoryItem(id)
          if (condition(result.data)) {
            setData(result.data)
            clearInterval(sti)
            onFinally?.()
            onSuccess?.(result.data)
          }
        } catch (error) {
          console.error(error)
          clearInterval(sti)
          onFinally()
        }
      }

      const sti = setInterval(() => {
        if (loop >= 8) {
          clearInterval(sti)
          setReload(false)
        }
        ++loop
        fc(() => setReload(false))
      }, 1000)
    },
    [id]
  )

  useEffect(() => {
    open && address && getData()
  }, [address, getData, open])

  return (
    <Sheet open={open && Boolean(address)}>
      <SheetContent exit={exit} style={style} overlayWillClose>
        <SheetHeader>
          <SheetTitle>{data?.name || 'Inventory'}</SheetTitle>
          <Breadcrumb
            data={[
              { name: 'Inventory' },
              { name: 'Item' },
              { name: data?.name || '...' }
            ]}
          />
        </SheetHeader>

        {/* When getting data */}
        {loading ? <LoadingScreen content={'Getting item'} /> : null}

        {(!id || notfound) && !loading ? (
          <motion.section
            className='ignore-nav flex flex-col items-center justify-center gap-4 py-5 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className='font-bai-jamjuree text-5xl font-bold text-primary'>
              Oops
            </h1>
            <p>We can't find the item you were looking for</p>
            <Button className='text-white' onClick={exit}>
              Back to Inventory
            </Button>
          </motion.section>
        ) : null}

        {/*  */}
        {!notfound && !loading ? (
          <motion.div
            className='custom-scrollbar flex-[1_1_0%] overflow-auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='text-neutral-5 w-full font-bai-jamjuree'>
              <div className='w-full space-y-[10px] lg:space-y-5'>
                <div
                  className='flex flex-wrap space-y-[10px] rounded-[5px] bg-primary-highlight
                  p-2.5 md:gap-5 md:space-y-0 md:p-5'
                >
                  <DetailPreview
                    imageUrl={data.imageUrl}
                    videoUrl={data.videoUrl}
                  />
                  <div className='w-full space-y-[26px] md:w-[calc(100%-388px-1.25rem)]'>
                    <div className=''>
                      <DetailIdentify name={data.name} />
                      <DetailPriceAndStockInInventory
                        className='mt-[10px] md:mt-5'
                        price={formatBalance.formatFixedNumber(
                          data?.price || 0n
                        )}
                        unit='IDL'
                        onMarketplace={isSelling}
                        stock={data.amountInStock}
                      />
                    </div>

                    <div className='my-[10px] md:mb-[15px] md:mt-5'>
                      {data.amountInStock === 0 ? null : (
                        <div>
                          <ConnectButtonPre>
                            {isSelling ? (
                              !reload ? (
                                <div className='flex items-center gap-4'>
                                  <Button
                                    className='w-full bg-red-400 hover:bg-red-400/90'
                                    size='lg'
                                    variant={'secondary'}
                                    loading={canceling}
                                    disabled={isApproved || isCheckingAllowance}
                                    onClick={enableCancelOrderModal}
                                  >
                                    <div className='flex items-center gap-1'>
                                      <ArrowDownRightIcon className='h-5 text-secondary-foreground' />
                                      Cancel order
                                    </div>
                                  </Button>
                                  <Button
                                    className='w-full'
                                    size='lg'
                                    variant={'secondary'}
                                    loading={updating}
                                    disabled={isApproved || isCheckingAllowance}
                                    onClick={enableUpdatePriceModal}
                                  >
                                    <div className='flex items-center gap-1'>
                                      <ArrowPathRoundedSquareIcon className='h-5 text-secondary-foreground' />
                                      Update price
                                    </div>
                                  </Button>
                                </div>
                              ) : (
                                <div className='flex w-full flex-col items-center justify-center'>
                                  <Loading type='white' />
                                  <p className='text-sm text-secondary'>
                                    Fetching new data. Please wait a minute!
                                  </p>
                                </div>
                              )
                            ) : isApproved ? (
                              <Button
                                className='w-full'
                                size='lg'
                                variant={'secondary'}
                                loading={selling}
                                disabled={!isApproved || isCheckingAllowance}
                                onClick={enableSellModal}
                              >
                                <ArrowUpIcon className='h-5 text-secondary-foreground' />
                                Sell
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
                                onClick={writeApprove}
                              >
                                Approve before sell
                              </Button>
                            )}
                          </ConnectButtonPre>
                        </div>
                      )}
                    </div>

                    <DetailDescription
                      gameDescription={data.gameDescription || ''}
                      collectionDescription={data.collectionDescription || ''}
                      itemDescription={data?.detail?.itemDescription || ''}
                    />

                    <DetailBaseStats
                      dp={data?.detail?.dp || 0}
                      mdp={data?.detail?.mdp || 0}
                      earnPoint={data?.detail?.earnPoint || 0}
                      rarity={data?.detail?.rarity}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        <SheetFooter>
          <div className='flex w-full items-center justify-between'>
            <Button
              disabled={!Boolean(prevId)}
              onClick={() => setId(prevId, false)}
            >
              Prev item
            </Button>
            <Button
              disabled={!Boolean(nextId)}
              onClick={() => setId(nextId, true)}
            >
              Next item
            </Button>
          </div>
        </SheetFooter>

        {/* MODAL */}
        <SellNFT
          open={sellModalVisible}
          loading={selling}
          disable={!isApproved || isCheckingAllowance}
          exit={disableSellModal}
          onSubmit={(price) => {
            setNewPrice(
              formatBalance.getDecimalAmount(new BigNumber(price), 18) + ''
            )
            sell([
              ...initSellParams,
              formatBalance.getDecimalAmount(new BigNumber(price), 18) + ''
            ])
          }}
        />

        <SellNFT
          open={updatePriceModalVisible}
          loading={updating}
          disable={!isApproved || isCheckingAllowance}
          initValue={Number(formatBalance.formatFixedNumber(data?.price || 0n))}
          exit={disableUpdatePriceModal}
          onSubmit={(price) => {
            setNewPrice(
              formatBalance.getDecimalAmount(new BigNumber(price), 18) + ''
            )
            update([
              ...initUpdatePriceParams,
              formatBalance.getDecimalAmount(new BigNumber(price), 18) + ''
            ])
          }}
        />

        <CancelOrder
          open={cancelOrderModalVisible}
          loading={canceling}
          disable={!isApproved || isCheckingAllowance}
          exit={disableCancelOrderModal}
          onSubmit={cancel}
        />
      </SheetContent>
    </Sheet>
  )
}
