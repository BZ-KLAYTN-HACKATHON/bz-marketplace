import { useCallback } from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

import { useToast } from 'components/ui/use-toast'
import { MarketplaceNFTABI } from 'contract/abis'

export const usePurchaseMarket = ({
  allow = false,
  contractAddress = '',
  orderId,
  onSuccess = () => {}
}) => {
  const { toast } = useToast()

  const { config } = usePrepareContractWrite({
    abi: MarketplaceNFTABI,
    address: contractAddress,
    args: [orderId],
    enabled: Boolean(contractAddress) && allow && orderId,
    functionName: 'fillOrder'
  })

  const { writeAsync, data, error, isLoading, isError, reset } =
    useContractWrite(config)

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
    isError: isErrorWhenTransction,
    error: errorWhenTransction
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onSuccess()
      toast({
        title: 'Transaction Success',
        description: 'The item is already in your inventory'
      })
    }
  })

  const handleWriteContract = useCallback(async () => {
    try {
      await writeAsync?.()
    } catch (error) {
      toast({
        title: 'Transaction Error',
        description: error?.shortMessage || '',
        variant: 'destructive'
      })
    }
  }, [toast, writeAsync])

  return {
    data: receipt,
    error: error || errorWhenTransction,
    purchasing: isPending || isLoading,
    paid: isSuccess,
    isError: isError || isErrorWhenTransction,
    purchase: handleWriteContract,
    reset
  }
}
