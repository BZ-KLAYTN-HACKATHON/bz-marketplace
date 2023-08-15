import Lottie from 'lottie-react'

import loadingInfinity from 'assets/json/loading-infinity.json'

export function Loading(props) {
  return <Lottie animationData={loadingInfinity} loop={true} />
}
