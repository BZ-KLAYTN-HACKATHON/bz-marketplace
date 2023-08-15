const formatNumberFollowThousand = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const formatNumber = { formatNumberFollowThousand }

export default formatNumber
