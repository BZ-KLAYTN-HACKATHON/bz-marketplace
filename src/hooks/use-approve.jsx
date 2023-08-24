import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

export const useApprove = ({
  abi = [],
  allow = true,
  args = [],
  contractAddress = '',
  onSuccess = () => {}
}) => {
  const { config } = usePrepareContractWrite({
    abi,
    address: contractAddress,
    args: [...args],
    enabled: Boolean(contractAddress) && allow,
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
    ...config
  })

  const {
    data: receipt,
    isLoading,
    isSuccess
  } = useWaitForTransaction({ hash: data?.hash, onSuccess })

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
