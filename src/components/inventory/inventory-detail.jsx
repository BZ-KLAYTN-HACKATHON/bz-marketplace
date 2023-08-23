import { useAllowance, useApprove } from 'hooks'
import { erc721ABI, useAccount } from 'wagmi'

import userApi from 'apis/user-api'
import BigNumber from 'bignumber.js'
import { Button } from 'components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from 'components/ui/sheet'
import { useToast } from 'components/ui/use-toast'
import { LoadingScreen } from 'components/utils'
import { bnbChain } from 'configs/customChains'
import {
  RG02_NFT_ADDRESS,
  RG02_NFT_MARKET_ADDRESS,
  RG02_TOKEN_ADDRESS
} from 'contract/addresses'
import { useSellInventory } from 'hooks/inventory'
import { useCallback, useEffect, useState } from 'react'
import formatBalance from 'utils/formatBalance'

export const InventoryDetail = ({ id, style, open, exit }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const { address } = useAccount()
  const { toast } = useToast()

  // Check and process APPROVE item then return current data/status
  const {
    isLoading: isCheckingAllowance,
    isApproved,
    refetch: refetchAllowance
  } = useAllowance({
    abi: erc721ABI,
    args: [data?.nftId],
    contractAddress: RG02_NFT_ADDRESS[bnbChain.id],
    functionName: 'getApproved',
    type: 'erc721'
  })
  const {
    write: writeApprove,
    isLoading: isApproving,
    isCheckingWallet,
    isSuccess: isApproveSuccess
  } = useApprove({
    abi: erc721ABI,
    args: [RG02_NFT_MARKET_ADDRESS[bnbChain.id], data?.nftId],
    contractAddress: RG02_NFT_ADDRESS[bnbChain.id],
    onSuccess: () => refetchAllowance()
  })

  //?
  const { sell } = useSellInventory({
    allow: isApproved && data?.nftId && open,
    args: [
      RG02_NFT_ADDRESS[bnbChain.id],
      data?.nftId,
      RG02_TOKEN_ADDRESS[bnbChain.id],
      formatBalance.getDecimalAmount(new BigNumber(0.01), 18) + ''
    ]
  })

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await userApi.getInventoryItem(id)
      setData(result.data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Can not get item',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [id, toast])

  useEffect(() => {
    open && getData()
  }, [getData, open])

  return (
    <Sheet open={open}>
      <SheetContent exit={exit} style={style} overlayWillClose>
        <SheetHeader>
          <SheetTitle>{data?.name || 'Inventory'}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        {/* When getting data */}
        {loading ? <LoadingScreen content={'Getting item'} /> : null}
        <Button
          className='w-full'
          size='lg'
          variant={'secondary'}
          // loading={purchasing}
          // disable={!isApproved || isCheckingAllowance}
          onClick={writeApprove}
        >
          Approve
        </Button>
        <Button
          className='w-full'
          size='lg'
          variant={'secondary'}
          // loading={purchasing}
          // disable={!isApproved || isCheckingAllowance}
          onClick={sell}
        >
          Sell
        </Button>
      </SheetContent>
    </Sheet>
  )
}
