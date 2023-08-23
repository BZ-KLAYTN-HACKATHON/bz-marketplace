import { bnbChain } from 'configs/customChains'
import { useMemo } from 'react'
import formatBalance from 'utils/formatBalance'
import { useAccount, useContractRead } from 'wagmi'

export const useAllowance = ({
  abi = [],
  args = [],
  contractAddress = '',
  price,
  functionName = 'allowance',
  type
}) => {
  const { address } = useAccount()

  const { data, error, isLoading, isSuccess, refetch } = useContractRead({
    abi,
    args: [...args],
    address: contractAddress,
    enabled: Boolean(contractAddress) && Boolean(address),
    functionName,
    chainId: bnbChain.id
  })

  const isApproved = useMemo(() => {
    if (isLoading) return false
    if (type === 'erc721') return Boolean(data)
    return formatBalance.formatFixedNumber(data || -1) >= price
  }, [data, isLoading, price, type])

  return {
    data,
    error,
    isLoading,
    isSuccess: isSuccess,
    isApproved: isApproved,
    refetch
  }
}
