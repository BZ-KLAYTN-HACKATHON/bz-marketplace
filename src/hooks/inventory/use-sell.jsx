import { useToast } from 'components/ui/use-toast'
import { bnbChain } from 'configs/customChains'
import { MarketplaceNFTABI } from 'contract/abis'
import { RG02_NFT_MARKET_ADDRESS } from 'contract/addresses'
import { useCallback } from 'react'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const contractAddress = RG02_NFT_MARKET_ADDRESS[bnbChain.id]

export const useSellInventory = ({
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
      functionName: 'placeOrder'
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
        title: 'Selled',
        description: 'The item is already in the Marketplace'
      })
    }
  })

  const handleSell = useCallback(
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
    selling: isPending || isLoading,
    paid: isSuccess,
    isError: isError || isErrorWhenTransction,
    sell: handleSell,
    reset
  }
}
