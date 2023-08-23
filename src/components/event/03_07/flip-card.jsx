import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import BackgroundBox from 'assets/img/event/BG_BlindBox.png'
import { cn } from 'lib/utils'

const width = 200
const height = 350
const cardAnimate = {
  rotate: [0, -2, 2, 1, 0, 2, -2, 0, -2, 2, 0, -2, 0, -2, 2, 0, -2, 0],
  x: [2, -1, -4, 4, 2, -4, -4, 4, -2, 2, 2, 0, 4, -2, 2, 2, 0],
  y: [2, -3, 0, 3, -2, 3, 2, 2, -2, 3, -3, 0, 2, -2, 3, -3, 0]
}

export const FlipCard = ({
  data,
  index,
  isDone,
  isOpening,
  sex,
  cardSelected,
  bg,
  onClick
}) => {
  const [, setIsHover] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  return (
    <AnimatePresence>
      <motion.div
        animate={isDone ? {} : isOpened ? cardAnimate : {}}
        transition={{ duration: 1, repeat: 1 }}
        className={cn(
          'group relative h-[350px] min-w-[200px] cursor-pointer snap-start overflow-hidden rounded-[10px] border-[3px] transition-all hover:border-yellow-500',
          cardSelected ? 'shadow-yellow border-[#FFC700]' : 'border-[#6A17CD]',
          !cardSelected && isDone ? 'opacity-60' : ''
        )}
        style={{ width: `${width}px`, height: `${height}px` }}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        onClick={() =>
          (!isDone || !isOpening) && onClick(index, () => setIsOpened(true))
        }
      >
        <motion.div
          className='relative z-[5] h-full w-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpened || isDone ? 1 : 0 }}
          transition={{ delay: isOpened || isDone ? 2 : 0 }}
        >
          <video
            className='h-full w-full object-cover'
            poster={data[`${sex}Item`]?.imageUrl}
            src={data[`${sex}Item`]?.videoUrl}
            playsInline={true}
            autoPlay={true}
            loop={true}
          ></video>
        </motion.div>
        <AnimatePresence mode='wait'>
          <motion.div
            initial={{ scale: 1, x: 30 }}
            animate={isDone ? { scale: 1.2, x: 0 } : { scale: 1, x: 0 }}
            transition={{ delay: 0.8, type: 'tween' }}
            className='absolute bottom-0 z-[6] h-[80%] w-full'
          >
            <img src={bg} alt='bg' className='w-full object-top' />
          </motion.div>
          <motion.div
            initial={{ scale: 1, x: 30 }}
            animate={isDone ? { scale: 1.2, x: 0 } : { scale: 1, x: 0 }}
            transition={{ delay: 1, type: 'tween' }}
            className='absolute bottom-0 z-[5] h-[80%] w-full opacity-25'
          >
            <img src={bg} alt='bg' className='w-full object-top' />
          </motion.div>
          <motion.div
            initial={{ scale: 1, x: 30 }}
            animate={isDone ? { scale: 1.2, x: 0 } : { scale: 1, x: 0 }}
            transition={{ delay: 1.1, type: 'tween' }}
            className='absolute bottom-0 z-[4] h-[80%] w-full opacity-10'
          >
            <img src={bg} alt='bg' className='w-full object-top' />
          </motion.div>
          <motion.div
            initial={{ scale: 1, x: 30 }}
            animate={isDone ? { scale: 1.2, x: 0 } : { scale: 1, x: 0 }}
            transition={{ delay: 1.2, type: 'tween' }}
            className='absolute bottom-0 z-[3] h-[80%] w-full opacity-5'
          >
            <img src={bg} alt='bg' className='w-full object-top' />
          </motion.div>
        </AnimatePresence>
        <motion.div className='absolute bottom-0 left-0 z-[2] h-full w-full'>
          <img
            src={BackgroundBox}
            alt='bg'
            className='h-full w-full object-cover'
          />
        </motion.div>
        <motion.div
          animate={isOpened || isDone ? { y: '100%' } : { y: 0 }}
          className='group-hover:bg-highlight absolute bottom-0 left-0 z-[6] w-full bg-[#7012E1] py-2 text-center text-base font-medium text-white'
        >
          Ready to open
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
