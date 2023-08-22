import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

export const useApprove = ({
  abi = [],
  args = [],
  contractAddress = '',
  onSuccess = () => {}
}) => {
  const { config } = usePrepareContractWrite({
    abi,
    address: contractAddress,
    args: [...args],
    enabled: Boolean(contractAddress),
    functionName: 'approve'
  })

  const {
    write,
    writeAsync,
    data,
    error,
    isLoading: isCheckingWallet,
    isError
  } = useContractWrite({
    ...config,
    onSuccess
  })

  const {
    data: receipt,
    isLoading,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash })

  return {
    isLoading,
    isCheckingWallet,
    isSuccess,
    isError,
    data: receipt,
    error,
    write,
    writeAsync
  }
}
