import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

export const ErrorModal = ({
  title = 'Error',
  message,
  isOpen,
  closeModal,
  size = 'normal'
}) => {
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

        <div className='font-Baloo2 fixed inset-0 overflow-y-auto text-white'>
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
                className={`w-full transform overflow-hidden rounded-[10px] border-2 
                border-[#E3AAFF] bg-[#4A0D93] p-6 text-left align-middle shadow-xl transition-all
                ${
                  size === 'large'
                    ? 'max-w-[620px]'
                    : size === 'middle'
                    ? 'max-w-[550px]'
                    : 'max-w-[500px]'
                }`}
              >
                <Dialog.Title
                  as='h3'
                  className='shadow-text-3 text-center text-3xl font-bold text-white'
                >
                  {title}
                </Dialog.Title>
                <div className='mt-5'>
                  <p className='text-center text-base font-medium'>
                    {message || ''}
                  </p>
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
