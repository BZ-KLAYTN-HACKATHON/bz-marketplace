import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { cn } from 'lib/utils'
import { useMemo, useState } from 'react'

import { Input } from 'components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from 'components/ui/tooltip'

export const Pagination = ({ className, current, total, onChange }) => {
  const [editable, setEditable] = useState(false)
  const [newPageNumber, setNewPageNumber] = useState(current)
  //? Var
  const checkSatisfyCondition = useMemo(
    () => !(newPageNumber < 1 || newPageNumber > total),
    [newPageNumber, total]
  )

  //? Func
  const handleEvenableChange = ({ target }) => {
    setNewPageNumber(Number(target.value))
  }
  const handleEvenableKeydown = (e) => {
    if (e.code === 'Enter') {
      if (!checkSatisfyCondition) return

      onChange(newPageNumber)
      setEditable(false)
    }
  }
  const handleEvenableBlur = () => {
    setNewPageNumber(current)
    setEditable(false)
  }
  const nextPage = (number) => {
    if (current >= total) return
    onChange(number)
  }
  const previousPage = (number) => {
    if (current <= 1) return
    onChange(number)
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`transition-default h-7 w-7 cursor-pointer 
        ${
          current <= 1
            ? 'text-white/50 hover:text-white/50'
            : 'text-white hover:text-primary'
        }`}
        onClick={() => previousPage(current - 1)}
      >
        <ChevronLeftIcon className='w-full' />
      </div>
      <div className='mx-2 flex items-center space-x-1 text-lg'>
        <div className='w-10 items-center'>
          {editable ? (
            <form className='bg-none' onSubmit={(e) => e.preventDefault()}>
              <Input
                type='number'
                className={cn(
                  checkSatisfyCondition
                    ? ''
                    : 'border-red-600 !text-red-500 focus-visible:ring-red-600'
                )}
                value={newPageNumber}
                onChange={handleEvenableChange}
                onKeyUp={handleEvenableKeydown}
                onBlur={handleEvenableBlur}
                autoFocus
              />
            </form>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p
                    className='w-full cursor-pointer text-center'
                    onClick={() => {
                      setEditable(true)
                    }}
                  >
                    {current}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to edit number</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className=''>/</div>
        <div className='w-10 text-center'>{total}</div>
      </div>
      <div
        className={`transition-default h-7 w-7 cursor-pointer 
        ${
          current >= total
            ? 'text-neutral-50/40 hover:text-neutral-50/40'
            : 'hover:text-highlight text-neutral-50'
        }`}
        onClick={() => nextPage(current + 1)}
      >
        <ChevronRightIcon className='w-full' />
      </div>
    </div>
  )
}
