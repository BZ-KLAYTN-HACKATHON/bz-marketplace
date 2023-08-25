import { useAccount, useContractRead } from 'wagmi'

import { bnbChain } from 'configs/customChains'
import formatBalance from 'utils/formatBalance'

export const useTokenBalance = ({
  abi = [],
  allow = true,
  token = '',
  functionName = 'balanceOf'
}) => {
  const { address } = useAccount()

  const { data, error, isLoading, isSuccess, refetch } = useContractRead({
    abi,
    args: [address],
    address: token,
    enabled: Boolean(token) && Boolean(address) && allow,
    functionName,
    chainId: bnbChain.id
  })

  return {
    data,
    balance: Number(formatBalance.formatFixedNumber(data || 0n)).toFixed(2),
    error,
    isLoading,
    isSuccess: isSuccess,
    refetch
  }
}
