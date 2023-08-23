import { useToast } from 'components/ui/use-toast'
import { bnbChain } from 'configs/customChains'
import { MarketplaceNFTABI } from 'contract/abis'
import { RG02_NFT_MARKET_ADDRESS } from 'contract/addresses'
import { useCallback } from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

// {
//   "internalType": "address",
//   "name": "_nftAddress",
//   "type": "address"
// },
// {
//   "internalType": "uint256",
//   "name": "_tokenId",
//   "type": "uint256"
// },
// {
//   "internalType": "address",
//   "name": "_paymentToken",
//   "type": "address"
// },
// {
//   "internalType": "uint256",
//   "name": "_price",
//   "type": "uint256"
// }

const contractAddress = RG02_NFT_MARKET_ADDRESS[bnbChain.id]

export const useSellInventory = ({
  allow = false,
  args = [], //[nftAddress, tokenId, paymentToken, price]
  onSuccess = () => {}
}) => {
  const { toast } = useToast()

  console.log(12, {
    abi: MarketplaceNFTABI,
    address: contractAddress,
    args: [...args],
    enabled: Boolean(contractAddress) && allow,
    functionName: 'placeOrder'
  })

  const { config } = usePrepareContractWrite({
    abi: MarketplaceNFTABI,
    address: contractAddress,
    args: [...args],
    enabled: Boolean(contractAddress) && allow,
    functionName: 'placeOrder'
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
        title: 'Selled',
        description: 'The item is already in the Marketplace'
      })
    }
  })

  const handleSell = useCallback(async () => {
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
    sell: handleSell,
    reset
  }
}
