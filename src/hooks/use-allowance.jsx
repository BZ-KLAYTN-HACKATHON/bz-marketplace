import formatBalance from 'utils/formatBalance'
import { useAccount, useContractRead } from 'wagmi'

export const useAllowance = ({
  abi = [],
  args = [],
  contractAddress = '',
  price
}) => {
  const { address } = useAccount()

  const { data, error, isLoading, isSuccess, refetch } = useContractRead({
    abi,
    args: [...args],
    address: contractAddress,
    enabled: Boolean(contractAddress) && Boolean(address),
    functionName: 'allowance'
  })

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isApproved: isLoading
      ? false
      : formatBalance.formatFixedNumber(data || -1) >= price,
    refetch
  }
}
