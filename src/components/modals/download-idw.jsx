import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

import AppsStore from 'assets/img/event/appstore.png'
import GGPlay from 'assets/img/event/ggplay.svg'
import { Button } from 'components/ui/button'

export const DownloadIdolWorld = ({ visible, onClick, onClose }) => {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
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
                className='w-full max-w-[500px] transform overflow-hidden rounded-[10px] border-2 
                border-[#E3AAFF] bg-[#4A0D93] p-6 text-left align-middle shadow-xl transition-all'
              >
                <Dialog.Title
                  as='h3'
                  className='shadow-text-3 text-center text-3xl font-bold text-white'
                >
                  Download on store
                </Dialog.Title>
                <div className='mt-5'>
                  <div className='flex flex-wrap items-center justify-center gap-2'>
                    <a
                      href='https://apps.apple.com/th/app/idol-world-dance-with-idol/id6444822913?l=th'
                      target='blank'
                      onClick={() => {
                        onClick()
                        setTimeout(() => {
                          onClose()
                        }, 2000)
                      }}
                    >
                      <div className='w-48'>
                        <img
                          src={AppsStore}
                          alt='appstore'
                          className='w-full'
                        />
                      </div>
                    </a>
                    <a
                      href='https://play.google.com/store/apps/details?id=com.rofi.games.idolworlds'
                      target='blank'
                      onClick={() => {
                        onClick()
                        setTimeout(() => {
                          onClose()
                        }, 2000)
                      }}
                    >
                      <div className='w-48'>
                        <img src={GGPlay} alt='google play' />
                      </div>
                    </a>
                    <a
                      href='https://bit.ly/iw-download'
                      className='w-full max-w-[calc(192px*2+8px)]'
                      download={true}
                      target='blank'
                      onClick={() => {
                        onClick()
                        setTimeout(() => {
                          onClose()
                        }, 2000)
                      }}
                    >
                      <Button className='w-full' size='lg' variant='secondary'>
                        <div className='flex w-full justify-center'>
                          <p className='text-base'>Download APK</p>
                        </div>
                      </Button>
                    </a>
                  </div>
                </div>

                <div
                  className='absolute right-4 top-4 cursor-pointer'
                  onClick={onClose}
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
