import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { BIG_TEN } from './bigNumber'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
const getDecimalAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

const getBalanceAmount = (amount, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
const getBalanceNumber = (balance, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber()
}

const getFullDisplayBalance = (balance, decimals = 18, displayDecimals) => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals || 0)
}

const formatNumber = (number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision
  }
  return number.toLocaleString(undefined, options)
}

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
const formatBigNumber = (number, displayDecimals = 18, decimals = 18) => {
  const remainder = number.mod(
    ethers.BigNumber.from(10).pow(decimals - displayDecimals)
  )
  return formatUnits(number.sub(remainder), decimals)
}

/**
 * Method to format the display of wei given an ethers.BigNumber object with toFixed
 * Note: rounds
 */
const formatBigNumberToFixed = (
  number,
  displayDecimals = 18,
  decimals = 18
) => {
  const formattedString = formatUnits(number, decimals)
  return (+formattedString).toFixed(displayDecimals)
}

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
const formatFixedNumber = (number, displayDecimals = 18, decimals = 18) => {
  // Remove decimal
  const [leftSide] = number.toString().split('.')
  return formatBigNumber(
    ethers.BigNumber.from(leftSide),
    displayDecimals,
    decimals
  )
}

const formatFixedNumberToBigNumber = (number, decimal = 18) => {
  // Convert to a BigNumber with desired precision
  const bigNumberValue = ethers.utils.parseUnits(number.toString(), decimal)
  return bigNumberValue
}

const formatBalance = {
  getDecimalAmount,
  formatFixedNumber,
  formatBigNumberToFixed,
  formatBigNumber,
  formatNumber,
  getBalanceNumber,
  getBalanceAmount,
  getFullDisplayBalance,
  formatFixedNumberToBigNumber
}

export default formatBalance
