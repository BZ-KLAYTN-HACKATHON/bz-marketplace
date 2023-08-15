export const Banner = ({ img, title }) => {
  return (
    <section className='banner relative'>
      <div className='relative z-[1] h-[420px]'>
        <picture className='h-full w-full'>
          <source srcSet={img} media='(min-width: 992px)' />
          <source srcSet={img} media='(min-width: 768px)' />
          <source srcSet={img} media='(min-width: 500px)' />
          <img
            src={img}
            alt='idol-world'
            className={`h-full w-full object-cover`}
          />
        </picture>
      </div>
      <div className='absolute left-0 top-0 z-[2] flex h-full w-full items-center justify-center bg-[#030712]/[55%] text-white'>
        <p className='text-[50px] font-medium'>{title}</p>
      </div>
    </section>
  )
}
