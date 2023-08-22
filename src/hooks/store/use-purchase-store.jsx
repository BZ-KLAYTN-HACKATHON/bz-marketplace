import { useToast } from 'components/ui/use-toast'
import { ShopNFTABI } from 'contract/abis'
import { useCallback } from 'react'
import formatNumber from 'utils/formatNumber'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

export const usePurchaseStore = ({
  allow = false,
  contractAddress = '',
  packId = '',
  quantity = 1,
  onSuccess = () => {}
}) => {
  const { toast } = useToast()

  const { config } = usePrepareContractWrite({
    abi: ShopNFTABI,
    address: contractAddress,
    args: [formatNumber.formatBytes32String(String(packId)), quantity],
    enabled: Boolean(contractAddress) && allow,
    functionName: 'buyPack'
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

  const handlePurchase = useCallback(async () => {
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

  // useEffect(() => {
  //   error &&
  //     toast({
  //       title: 'Transaction Error',
  //       description: error?.shortMessage || '',
  //       variant: 'destructive'
  //     })
  // }, [error, toast])

  return {
    data: receipt,
    error: error || errorWhenTransction,
    purchasing: isPending || isLoading,
    paid: isSuccess,
    isError: isError || isErrorWhenTransction,
    purchase: handlePurchase,
    reset
  }
}
