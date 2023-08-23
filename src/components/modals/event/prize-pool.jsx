import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Fragment, useEffect, useState } from 'react'

import NvIngame1 from 'assets/img/event/nv_ingame-1.png'
import NvIngame2 from 'assets/img/event/nv_ingame-2.png'

export const PrizePool = ({ data, isOpen, closeModal }) => {
  const [sex, setSex] = useState('maleItem')

  useEffect(() => {
    let sti = setInterval(() => {
      setSex((prev) => (prev === 'maleItem' ? 'femaleItem' : 'maleItem'))
    }, 5000)

    return () => clearInterval(sti)
  }, [])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-60' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto font-Baloo2 text-white'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className='w-full max-w-[1000px] transform overflow-hidden rounded-[10px] border-2 
                border-[#E3AAFF] bg-[#4A0D93] p-6 px-0 pb-[55px] text-left align-middle shadow-xl transition-all md:px-10'
              >
                <Dialog.Title
                  as='h3'
                  className='shadow-text-3 mt-3 text-center text-2xl font-bold text-white md:mt-10 lg:text-[55px] lg:leading-[65px]'
                >
                  Prize Pool
                  <br />
                  <span className='text-[36px] font-medium leading-[43px] text-secondary'>
                    05 exclusive NFTs
                  </span>
                </Dialog.Title>
                <div className='relative mb-10 mt-11 flex justify-center'>
                  <div
                    className='next-gradient relative z-[2] flex max-w-[492px] cursor-pointer flex-wrap
                    items-center justify-center gap-[7px] overflow-hidden rounded-[10px] px-4 py-7
                    before:absolute before:left-1/2 before:top-1/2 before:z-[1] before:h-[calc(100%-4px)]
                    before:w-[calc(100%-4px)] before:-translate-x-1/2 before:-translate-y-1/2 
                    before:rounded-[10px] before:bg-[#7012E1] 
                    md:gap-9 md:px-10'
                  >
                    {data?.map((item) => (
                      <div className='relative z-[2] w-[110px] space-y-2.5'>
                        <motion.div className='perspective'>
                          <motion.div
                            className='card transform-style-3d relative aspect-square w-full'
                            initial={{ rotateY: 0, opacity: 1 }}
                            animate={
                              sex === 'maleItem'
                                ? { rotateY: 0, opacity: 1 }
                                : { rotateY: 180, opacity: 1 }
                            }
                            transition={{ duration: 3, ease: 'circOut' }}
                          >
                            <motion.div className='backface-hidden absolute h-full w-full'>
                              <div className='overflow-hidden rounded-[10px] border-2 border-[#CB62FF]'>
                                <img
                                  src={item['maleItem']?.imageUrl}
                                  alt=''
                                  className='w-[146px]'
                                />
                              </div>
                            </motion.div>
                            <motion.div className='rotate-y-180 backface-hidden absolute h-full w-full'>
                              <div className='overflow-hidden rounded-[10px] border-2 border-[#CB62FF]'>
                                <img
                                  src={item['femaleItem']?.imageUrl}
                                  alt=''
                                  className='w-[146px]'
                                />
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                        {/* <div className='overflow-hidden rounded-[10px] border-2 border-[#CB62FF]'>
                          <img
                            src={item?.maleItem?.imageUrl}
                            alt=''
                            className='w-[146px]'
                          />
                        </div> */}
                        <div className='flex items-center justify-center gap-[1px]'>
                          <div className='w-[110px]'>
                            <div className='bg-white py-0.5 text-center text-xs font-medium text-[#230448]'>
                              DP
                            </div>
                            <div className='bg-[#230448] py-0.5 text-center text-xs font-medium'>
                              {item[sex]?.detail?.mdp || 0}
                            </div>
                          </div>
                          <div className='w-[110px]'>
                            <div className='bg-white py-0.5 text-center text-xs font-medium text-[#230448]'>
                              EP
                            </div>
                            <div className='bg-[#230448] py-0.5 text-center text-xs font-medium text-red-500'>
                              {item[sex]?.detail?.earnPoint || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='absolute top-1/2 z-[1] hidden h-[120%] w-full -translate-y-1/2 items-center justify-between md:flex'>
                    <img src={NvIngame1} alt='nv ingame' className='h-full' />
                    <img src={NvIngame2} alt='nv ingame' className='h-full' />
                  </div>
                </div>

                <div
                  className='absolute right-4 top-4 cursor-pointer'
                  onClick={closeModal}
                >
                  <XMarkIcon className='w-6 text-[#E3AAFF]' />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
