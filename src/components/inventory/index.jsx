import {
  CheckIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import { useInput, useToggle } from 'hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWindowSize } from 'react-recipes'
import { useAccount } from 'wagmi'

import userApi from 'apis/user-api'
import { NftCardItem } from 'components/store'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from 'components/ui/sheet'
import { useToast } from 'components/ui/use-toast'
import { Pagination } from 'components/utils'
import { useGlobalContext } from 'contexts/global'
import { raritysItem, sortsItem, typesItem } from 'data/store'
import { cn } from 'lib/utils'
import formatBalance from 'utils/formatBalance'
import { InventoryDetail } from './inventory-detail'
import { ListItemInInventory } from './list-item'

const w = 1100

const Inventory = () => {
  const [sortValue, setSortValue] = useState(null)
  const [rarityValue, setRarityValue] = useState([])
  const [typeValue, setTypeValue] = useState([])
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
  const [nftCurrentIdx, setNftCurrentIdx] = useState(-1)
  const [nftDetailId, setNftDetailId] = useState('')
  const [nftNavidationId, setNftNavidationId] = useState({
    prev: '',
    next: ''
  })

  const { address } = useAccount()
  const { inventory } = useGlobalContext()
  const { value: searchInput, bind } = useInput()
  const {
    visible: detailItemVisible,
    enable: enableDetailItem,
    disable: disableDetailItem
  } = useToggle()
  const { toast } = useToast()

  const sortItemSelectedConfig = useMemo(() => {
    return sortsItem.find((item) => item.value === sortValue)
  }, [sortValue])

  const onPageNumberChange = useCallback((number) => {
    setPagination((prev) => ({ ...prev, currentPage: number }))
  }, [])

  const isSelling = useCallback((status) => status === 'Selling', [])

  const getItems = useCallback(async () => {
    setLoading(true)
    try {
      const result = await userApi.getInventory({
        nftOwner: address,
        rarity: rarityValue,
        type: typeValue,
        sort: sortValue,
        name: searchInput,
        page: pagination.currentPage
      })
      setData(result.data?.data)
      setPagination(result.data?.paginator)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Can not get inventory',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }, [
    address,
    pagination.currentPage,
    rarityValue,
    searchInput,
    sortValue,
    toast,
    typeValue
  ])

  const updateItem = useCallback((id, newValue) => {
    setData((prev) =>
      prev?.map((item) => (item.id === id ? { ...item, ...newValue } : item))
    )
  }, [])

  useEffect(() => {
    inventory.visible && address && getItems()
  }, [address, getItems, inventory.visible])

  return (
    <Sheet open={inventory.visible && Boolean(address)}>
      <SheetContent
        exit={inventory.close}
        overlayWillClose
        style={{ width: `${detailItemVisible ? w + w * 0.2 : w}px` }}
      >
        <SheetHeader>
          <SheetTitle className='text-2xl'>Inventory</SheetTitle>
          <SheetDescription>
            Welcome to your NFT Item Inventory! This is where your unique
            digital assets come to life.
          </SheetDescription>
          <div className='mb-2.5 flex w-full flex-col items-center justify-between gap-2.5 pt-2 md:flex-row'>
            <Input
              parentClass='w-full max-w-[400px]'
              type='text'
              placeholder='Type a command or search...'
              icon={{ icon: MagnifyingGlassIcon }}
              {...bind}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                }
              }}
            />
            <div className='flex w-full items-center justify-center gap-2.5 md:w-max md:justify-start md:gap-[18px]'>
              <Select
                onValueChange={(value) => {
                  setSortValue(value)
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
              />

              <MultipleSelect
                name={'type'}
                list={typesItem}
                value={typeValue}
                setValue={setTypeValue}
              />
            </div>
          </div>
        </SheetHeader>

        <motion.div className='custom-scrollbar flex-[1_1_0%] overflow-auto'>
          <ListItemInInventory loading={loading} getItems={() => {}}>
            {data.map((item, idx) => (
              <li
                className='col-span-1 cursor-pointer'
                key={idx}
                onClick={() => {
                  setNftDetailId(item?.id)
                  setNftCurrentIdx(idx)
                  setNftNavidationId({
                    prev: data[idx - 1]?.id || null,
                    next: data[idx + 1]?.id || null
                  })
                  enableDetailItem()
                }}
              >
                <NftCardItem
                  className='col-span-1'
                  name={item.name}
                  dType={item?.attributes?.type}
                  imageUrl={item.imageUrl}
                  videoUrl={item.videoUrl}
                  nftId={item?.nftId ? `${item.nftId}` : ''}
                  price={
                    isSelling(item?.status)
                      ? formatBalance.formatFixedNumber(item?.price || 0n)
                      : null
                  }
                  onMarketplace={isSelling(item?.status)}
                />
              </li>
            ))}
          </ListItemInInventory>
        </motion.div>

        <SheetFooter>
          <div className='flex w-full items-center justify-between font-bai-jamjuree'>
            <p>
              {data?.length || 0} / {pagination.total} item
              {pagination.total > 1 ? 's' : ''}
            </p>
            <Pagination
              className='w-max'
              current={pagination.currentPage}
              total={pagination.total}
              onChange={onPageNumberChange}
            />
          </div>
        </SheetFooter>
      </SheetContent>

      <InventoryDetail
        id={nftDetailId}
        open={detailItemVisible}
        exit={disableDetailItem}
        style={{ width: `${w}px` }}
        prevId={nftNavidationId.prev}
        nextId={nftNavidationId.next}
        setId={(newId, isIncrease) => {
          setNftDetailId(newId)
          setNftNavidationId({
            prev:
              data[isIncrease ? nftCurrentIdx : nftCurrentIdx - 2]?.id || null,
            next:
              data[isIncrease ? nftCurrentIdx + 2 : nftCurrentIdx]?.id || null
          })
          setNftCurrentIdx(isIncrease ? nftCurrentIdx + 1 : nftCurrentIdx - 1)
        }}
        onUpdate={updateItem}
      />
    </Sheet>
  )
}

export default Inventory

const MultipleSelect = ({ list, value, setValue, name = 'item' }) => {
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
