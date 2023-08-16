import { motion } from 'framer-motion'
import Lottie from 'lottie-react'

import loadingInfinity from 'assets/json/loading-infinity.json'
import { cn } from 'lib/utils'

export function Loading(props) {
  return (
    <motion.div
      className=''
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Lottie animationData={loadingInfinity} loop={true} />
    </motion.div>
  )
}

export const LoadingScreen = ({ className, content = <p>Loading</p> }) => {
  return (
    <motion.div
      className={cn(
        'ignore-nav flex h-screen w-full flex-col items-center justify-center gap-1',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='w-20'>
        <Loading />
      </div>
      <div className='font-bai-jamjuree text-base text-yellow-500'>
        {content}
      </div>
    </motion.div>
  )
}
