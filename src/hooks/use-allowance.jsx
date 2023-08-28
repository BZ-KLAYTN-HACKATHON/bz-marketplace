import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

import { klaytnChain } from 'configs/customChains'
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
    chainId: klaytnChain.id
  })

  const isApproved = useMemo(() => {
    if (isLoading) return false
    if (type === 'erc721') {
      return spender && data
        ? data?.toLowerCase() === spender?.toLowerCase()
        : false
    }
    return Number(formatBalance.formatFixedNumber(data || -1)) >= Number(price)
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
