import { useEffect, useState } from 'react'

import TotalSaleIcon from 'assets/img/store/total-sale.svg'
import TotalVolumeIcon from 'assets/img/store/total-vol.svg'
import formatBalance from 'utils/formatBalance'
import formatNumber from 'utils/formatNumber'

const sList = ['last 24h', '7 days', '30 days']
const sLength = sList.length

const tabs = [
  {
    id: 0,
    name: 'last 24h',
    data: {
      totalSale: 47,
      totalVolume: 4721
    }
  },
  {
    id: 1,
    name: '7 days',
    data: {
      totalSale: 12,
      totalVolume: 2571
    }
  },
  {
    id: 2,
    name: '30 days',
    data: {
      totalSale: 68,
      totalVolume: 1644
    }
  }
]

export const Statistic = ({ day: { one, seven, thirty }, showIn }) => {
  const [tab, setTab] = useState({ totalSale: 0, totalVolume: 0, id: 0 })

  useEffect(() => {
    setTab(one)
  }, [one])

  return (
    <div className='font-primary bg-[#100639]'>
      <div className=''>
        <ul className='flex w-full items-center justify-between'>
          {tabs.map((li, i) => (
            <li
              key={i}
              className={`cursor-pointer py-[9px]
              ${i === tab.id ? 'bg-primary' : 'bg-primary-highlight'}`}
              style={{ width: `calc(100% / ${sLength} - 2px)` }}
              onClick={() => setTab(i === 0 ? one : i === 1 ? seven : thirty)}
            >
              <p
                className='font-primary select-none text-center text-base 
                font-medium uppercase text-white'
              >
                {li.name}
              </p>
            </li>
          ))}
        </ul>

        <ul className='flex flex-col items-center justify-center lg:flex-row'>
          <li className='flex w-full items-center justify-center py-[31px] lg:w-1/3'>
            <div className='flex w-1/3 justify-center lg:w-max'>
              <div className='w-[57px]'>
                <img
                  src={TotalSaleIcon}
                  alt='icon'
                  className='aspect-square w-full object-contain'
                />
              </div>
            </div>
            <div className='ml-10 flex w-2/3 flex-col lg:w-max'>
              <p className='text-sm uppercase text-white/[68%]'>Total Sale</p>
              <p className='text-3xl font-medium'>
                {formatNumber.formatNumberFollowThousand(
                  Number(tab?.totalSale || 0)
                )}
              </p>
            </div>
          </li>
          <li className='flex w-full items-center justify-center py-[31px] lg:w-1/3'>
            {/* <div className='flex w-1/3 justify-center lg:w-max'>
              <div className='w-[57px]'>
                <img
                  src={TotalVolumeIcon}
                  alt='icon'
                  className='aspect-square w-full object-contain'
                />
              </div>
            </div> */}
            <div className='ml-10 flex w-2/3 flex-col lg:w-max'>
              <p className='text-sm uppercase text-white/[68%]'>Total volume</p>
              <p className='text-3xl font-medium'>
                {showIn === 'store' ? (
                  <>{tab.totalVolume} IDWT</>
                ) : (
                  <>
                    {formatBalance.formatFixedNumber(tab?.totalVolume || 0)} IDWT
                  </>
                )}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
