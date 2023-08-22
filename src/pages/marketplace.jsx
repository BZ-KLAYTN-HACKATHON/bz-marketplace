import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWindowSize } from 'react-recipes'
import { Link, useSearchParams } from 'react-router-dom'

import marketplaceApi from 'apis/marketplace-api'
import BannerImage from 'assets/img/marketplace-banner.webp'
import {
  Banner,
  ListItemInStore,
  NftCardItem,
  Statistic
} from 'components/store'
import { Button } from 'components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from 'components/ui/command'
import { Input } from 'components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from 'components/ui/select'
import { useToast } from 'components/ui/use-toast'
import { raritysItem, sortsItem, typesItem } from 'data/store'
import { useInput } from 'hooks'
import { cn } from 'lib/utils'
import formatBalance from 'utils/formatBalance'

Object.fromMEntries = (params) => {
  const obj = {}
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key)
    } else {
      obj[key] = params.get(key)
    }
  }
  return obj
}

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [sortValue, setSortValue] = useState(searchParams.get('sort'))
  const [rarityValue, setRarityValue] = useState(searchParams.getAll('rarity'))
  const [typeValue, setTypeValue] = useState(searchParams.getAll('type'))
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 0,
    totalPages: 0,
    currentPage: 1,
    slNo: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prev: null,
    next: 2
  })
  const [loading, setLoading] = useState(false)

  const { value: searchInput, bind } = useInput()
  const { toast } = useToast()

  const sortItemSelectedConfig = useMemo(() => {
    return sortsItem.find((item) => item.value === sortValue)
  }, [sortValue])

  const searchParamValues = useMemo(
    () => Object.fromMEntries(searchParams),
    [searchParams]
  )

  const getStoreData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await marketplaceApi.getItems(searchParamValues)
      setData(result.data.data)
      setPagination(result.data.paginator)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Cannot get marketplace item'
      })
      console.error(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 700)
    }
  }, [searchParamValues, toast])

  const getDataWhenScrollDown = useCallback(async () => {
    if (pagination.hasNextPage) {
      setLoading(true)
      try {
        const result = await marketplaceApi.getItems({
          ...searchParamValues,
          page: pagination.next
        })
        setData((prev) => [...prev, ...result.data.data])
        setPagination(result.data.paginator)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Cannot get store item'
        })
        console.error(error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }
    }
  }, [pagination.hasNextPage, pagination.next, searchParamValues, toast])

  useEffect(() => {
    getStoreData()
  }, [getStoreData])

  return (
    <div className='ignore-nav'>
      <Banner img={BannerImage} title={'Marketplace'} />
      <motion.section
        className='ctn px-2.5 pb-8 pt-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className='mb-2.5 border-2 border-border-foreground md:mb-[23px]'>
          <Statistic
            day={{
              one: {
                totalVolume: 0,
                totalSale: 0,
                id: 0
              },
              seven: {
                totalVolume: 0,
                totalSale: 0,
                id: 1
              },
              thirty: {
                totalVolume: 0,
                totalSale: 0,
                id: 2
              }
            }}
          />
        </div>
        <div className='mb-2.5 flex w-full flex-col items-center justify-between gap-2.5 md:mb-[29px] md:flex-row'>
          <Input
            parentClass='w-full max-w-[690px]'
            type='text'
            placeholder='Type a command or search...'
            icon={{ icon: MagnifyingGlassIcon }}
            {...bind}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                searchInput
                  ? setSearchParams({
                      ...searchParamValues,
                      search: searchInput
                    })
                  : setSearchParams(() => {
                      const searchParamValuesClone = { ...searchParamValues }
                      delete searchParamValuesClone.search
                      return searchParamValuesClone
                    })
              }
            }}
          />
          <div className='flex w-full items-center gap-2.5 md:w-max md:gap-[18px]'>
            <Select
              onValueChange={(value) => {
                setSortValue(value)
                setSearchParams({
                  ...searchParamValues,
                  sort: value
                })
              }}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue
                  placeholder={
                    sortValue ? (
                      <div className='flex items-center gap-2'>
                        <sortItemSelectedConfig.icon className='h-4 w-4 text-white' />
                        {
                          sortsItem.find((item) => item.value === sortValue)
                            .label
                        }
                      </div>
                    ) : (
                      'Sort by...'
                    )
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortsItem.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      <div className='flex items-center gap-2'>
                        <item.icon className='h-4 w-4 text-white' />
                        {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <MultipleSelect
              name={'rarity'}
              list={raritysItem}
              value={rarityValue}
              setValue={setRarityValue}
              onChange={(_) => {
                setSearchParams({
                  ...searchParamValues,
                  rarity: _
                })
              }}
            />

            <MultipleSelect
              name={'type'}
              list={typesItem}
              value={typeValue}
              setValue={setTypeValue}
              onChange={(_) => {
                setSearchParams({
                  ...searchParamValues,
                  type: _
                })
              }}
            />
          </div>
        </div>
        <motion.div className=''>
          <ListItemInStore
            data={data}
            loading={loading}
            getItems={getDataWhenScrollDown}
          >
            {data.map((item, idx) => (
              <li className='col-span-1 cursor-pointer' key={idx}>
                <Link to={`/marketplace/${item?.collectionId}/${item.orderId}`}>
                  <NftCardItem
                    className='col-span-1'
                    name={item?.nft?.name}
                    dType={item?.nft?.attributes?.type}
                    imageUrl={item?.nft?.imageUrl}
                    videoUrl={item?.nft?.videoUrl}
                    price={formatBalance.formatFixedNumber(item?.price || 0n)}
                  />
                </Link>
              </li>
            ))}
          </ListItemInStore>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Marketplace

const MultipleSelect = ({ list, value, setValue, name = 'item', onChange }) => {
  const { width } = useWindowSize()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='w-max min-w-[90px] justify-between md:min-w-[120px]'
        >
          {value?.length ? (
            width < 640 ? (
              <p className='first-letter:uppercase'>{name}</p>
            ) : (
              `${value?.length} ${name} selected`
            )
          ) : (
            <p className='first-letter:uppercase'>{name}</p>
          )}
          <ChevronDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-max min-w-[120px] p-0'
        side='bottom'
        align='end'
      >
        <Command>
          <CommandInput placeholder={`Search ${name}...`} className='h-9' />
          <CommandEmpty>No {name} found.</CommandEmpty>
          <CommandGroup>
            {list?.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  let newValue
                  if (!value.includes(item.value)) {
                    newValue = [...value, item.value]
                  } else {
                    newValue = value.filter((_) => _ !== item.value)
                  }
                  setValue(newValue)
                  onChange(newValue)
                }}
              >
                {item.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4 text-white',
                    value.includes(item?.value) ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
