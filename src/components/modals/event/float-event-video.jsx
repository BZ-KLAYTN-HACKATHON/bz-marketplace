import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { PlayIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"
import { Fragment, useRef, useState } from "react"

export const FloatEventVideo = ({ title, link, isOpen, closeModal }) => {
  const [playing, setPlaying] = useState(false)

  const refVid = useRef()
  const refPlay = useRef()

  const playVideo = () => {
    setPlaying(true)
    refVid?.current && refVid?.current?.play()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto font-Baloo2 text-white">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-[960px] overflow-hidden rounded-[10px] border-2 border-[#E3AAFF] 
                bg-[#4A0D93] p-6 px-10 pb-[55px] text-left align-middle shadow-xl transition-all transform"
              >
                <Dialog.Title
                  as="h3"
                  className="shadow-text-3 mt-3 text-center text-2xl font-medium text-white md:mt-10 lg:text-[55px] lg:leading-[65px]"
                >
                  {title || ""}
                </Dialog.Title>
                <div className="relative mt-5">
                  <video
                    ref={refVid}
                    className="relative z-10 h-full w-full object-cover"
                    playsInline
                    loop
                  >
                    <source src={link} type="video/mp4" />
                  </video>

                  <AnimatePresence exitBeforeEnter>
                    {!playing ? (
                      <div className="absolute top-0 left-0 z-20 flex h-full w-full cursor-pointer items-center justify-center">
                        <motion.div
                          ref={refPlay}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring" }}
                          className="rounded-xl bg-white py-3 px-8 shadow-lg shadow-black"
                          onClick={playVideo}
                        >
                          <PlayIcon className="w-10 text-[#4A0D93]" />
                        </motion.div>
                      </div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={closeModal}
                >
                  <XMarkIcon className="w-6 text-[#E3AAFF]" />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
