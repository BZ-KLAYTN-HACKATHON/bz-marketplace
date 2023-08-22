import { ethers } from 'ethers'

const formatNumberFollowThousand = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const formatBytes32String = (text) => {
  return text ? ethers.utils.formatBytes32String(text) : null
}

const formatNumber = { formatNumberFollowThousand, formatBytes32String }

export default formatNumber
