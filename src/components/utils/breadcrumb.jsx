import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export const Breadcrumb = ({ data, className = '' }) => {
  return (
    <div className={`${className} font-primary flex flex-wrap gap-2`}>
      {data?.map(({ name, link }, idx) =>
        link ? (
          <Link to={link} key={`${name}${idx}`}>
            <div className='flex items-center gap-2 text-sm'>
              <span
                className={`hover:text-white
                ${idx === data.length - 1 ? 'text-white' : 'text-tw-200'}`}
              >
                {name}
              </span>
              {idx === data.length - 1 ? null : (
                <ChevronRightIcon className='text-tw-500 w-4' />
              )}
            </div>
          </Link>
        ) : (
          <div
            className='flex items-center gap-2 text-sm'
            key={`${name}${idx}`}
          >
            <span
              className={` ${
                idx === data.length - 1 ? 'text-white' : 'text-tw-200'
              }`}
            >
              {name}
            </span>
            {idx === data.length - 1 ? null : (
              <ChevronRightIcon className='text-tw-500 w-4' />
            )}
          </div>
        )
      )}
    </div>
  )
}
