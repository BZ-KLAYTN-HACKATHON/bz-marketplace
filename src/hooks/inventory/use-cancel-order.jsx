import { useCallback } from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

import { useToast } from 'components/ui/use-toast'
import { klaytnChain } from 'configs/customChains'
import { MarketplaceNFTABI } from 'contract/abis'
import { RG02_NFT_MARKET_ADDRESS } from 'contract/addresses'

const contractAddress = RG02_NFT_MARKET_ADDRESS[klaytnChain.id]

export const useCancelOrderInventory = ({
  allow = true,
  args = [],
  onSuccess = () => {}
}) => {
  const { toast } = useToast()

  const { config } = usePrepareContractWrite({
    abi: MarketplaceNFTABI,
    address: contractAddress,
    args: [...args],
    enabled: Boolean(contractAddress) && allow,
    functionName: 'cancelOrder'
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
        title: 'Canceled',
        description: 'The NFT item has been successfully changed in value'
      })
    }
  })

  const handleWriteContract = useCallback(
    async (args) => {
      try {
        await writeAsync?.({ args })
      } catch (error) {
        toast({
          title: 'Transaction Error',
          description: error?.shortMessage || '',
          variant: 'destructive'
        })
      }
    },
    [toast, writeAsync]
  )

  return {
    data: receipt,
    error: error || errorWhenTransction,
    canceling: isPending || isLoading,
    paid: isSuccess,
    isError: isError || isErrorWhenTransction,
    cancel: handleWriteContract,
    reset
  }
}
