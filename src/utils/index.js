export * from './bigNumber'
export * from './formatBalance'
export * from './formatNumber'

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
export const truncateEthAddress = (address, separator = '••••') => {
  if (!address) return ''
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}${separator}${match[2]}`
}

export const moveElementInArray = (array, fromIndex, toIndex) => {
  const element = array.splice(fromIndex, 1)[0]

  array.splice(toIndex, 0, element)

  return array
}
