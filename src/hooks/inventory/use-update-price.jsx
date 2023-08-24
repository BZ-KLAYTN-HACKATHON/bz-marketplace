import { useToast } from 'components/ui/use-toast'
import { bnbChain } from 'configs/customChains'
import { MarketplaceNFTABI } from 'contract/abis'
import { RG02_NFT_MARKET_ADDRESS } from 'contract/addresses'
import { useCallback } from 'react'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const contractAddress = RG02_NFT_MARKET_ADDRESS[bnbChain.id]

export const useUpdatePriceInventory = ({
  allow = true,
  // args = [], //[nftAddress, tokenId, paymentToken, price]
  onSuccess = () => {}
}) => {
  const { toast } = useToast()

  const { writeAsync, data, error, isLoading, isError, reset } =
    useContractWrite({
      abi: MarketplaceNFTABI,
      address: contractAddress,
      enabled: Boolean(contractAddress) && allow,
      functionName: 'updatePrice'
    })

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
        title: 'Updated',
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
    updating: isPending || isLoading,
    paid: isSuccess,
    isError: isError || isErrorWhenTransction,
    update: handleWriteContract,
    reset
  }
}
