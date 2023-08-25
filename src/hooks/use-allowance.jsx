import { useAccount, useContractRead } from 'wagmi'
import { useMemo } from 'react'

import { bnbChain } from 'configs/customChains'
import formatBalance from 'utils/formatBalance'

export const useAllowance = ({
  abi = [],
  args = [],
  allow = true,
  contractAddress = '',
  price,
  functionName = 'allowance',
  type,
  spender = ''
}) => {
  const { address } = useAccount()

  const { data, error, isLoading, isSuccess, refetch } = useContractRead({
    abi,
    args: [...args],
    address: contractAddress,
    enabled: Boolean(contractAddress) && Boolean(address) && allow,
    functionName,
    chainId: bnbChain.id
  })

  const isApproved = useMemo(() => {
    if (isLoading) return false
    if (type === 'erc721') {
      return spender && data
        ? data?.toLowerCase() === spender?.toLowerCase()
        : false
    }
    return formatBalance.formatFixedNumber(data || -1) >= price
  }, [data, isLoading, price, spender, type])

  return {
    data,
    error,
    isLoading,
    isSuccess: isSuccess,
    isApproved: isApproved,
    refetch
  }
}
