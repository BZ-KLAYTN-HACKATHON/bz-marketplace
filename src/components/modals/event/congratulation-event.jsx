import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'components/ui/button'

export const CongratulationEvent = ({ data, isOpen, closeModal }) => {
  const realData = data?.items[0]
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
                className='w-full max-w-[960px] transform overflow-hidden rounded-[10px] border-2 
                border-[#E3AAFF] bg-[#4A0D93] p-6 px-10 pb-[55px] text-left align-middle shadow-xl transition-all'
              >
                <Dialog.Title
                  as='h3'
                  className='shadow-text-3 mt-3 text-center text-2xl font-medium text-white md:mt-10 lg:text-[55px] lg:leading-[65px]'
                >
                  Congratulations!
                  <br />
                  You received{' '}
                  <span className='font-semibold text-secondary'>
                    {realData?.name || '...'}
                  </span>
                </Dialog.Title>
                <div className='mb-10 mt-11 flex w-full flex-col items-center justify-center md:flex-row'>
                  <div className='overflow-hidden rounded-[10px] border-2 border-[#CB62FF]'>
                    <img
                      src={realData?.imageUrl}
                      alt=''
                      className='w-[146px]'
                    />
                  </div>
                  <div className='flex items-center justify-center gap-[1px]'>
                    <div className='w-[110px]'>
                      <div className='bg-white py-1 text-center text-base font-medium text-[#230448]'>
                        DP
                      </div>
                      <div className='bg-[#230448] py-3 text-center text-base font-medium text-white'>
                        {realData?.attributes?.mdp || 0}
                      </div>
                    </div>
                    <div className='w-[110px]'>
                      <div className='bg-white py-1 text-center text-base font-medium text-[#230448]'>
                        EP
                      </div>
                      <div className='bg-[#230448] py-3 text-center text-base font-medium text-white'>
                        {realData?.attributes?.earnPoint || 0}
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={'/event/earn-money'}>
                  <Button className='w-full' size='lg'>
                    Earn more $$$ with NFT
                  </Button>
                </Link>

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
