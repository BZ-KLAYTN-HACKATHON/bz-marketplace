import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

export const ErrorUserInGame = ({ visible, onClose }) => {
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
                  Not ready to spin
                </Dialog.Title>
                <div className='mt-5'>
                  <div className='text-md flex flex-wrap items-center justify-center gap-2 text-center text-white'>
                    <p>You do not have in-game character</p>
                    <p>
                      Please{' '}
                      <span className='font-semibold text-secondary'>
                        sign in
                      </span>{' '}
                      and{' '}
                      <span className='font-semibold text-secondary'>
                        create a new character
                      </span>{' '}
                      then try again.
                    </p>
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
