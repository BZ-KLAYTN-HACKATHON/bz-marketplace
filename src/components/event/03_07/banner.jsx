export const Banner = () => {
  return (
    <section className='relative flex h-[392px] items-center justify-center bg-[#000B16]'>
      <picture className='relative z-[1] h-[148px] w-full xl:h-full'>
        <source
          srcSet='https://cdn-iw-02.rofi.io/images/banner.jpg'
          media='(min-width: 992px)'
        />
        <source
          srcSet='https://cdn-iw-02.rofi.io/images/banner_992.jpg'
          media='(min-width: 768px)'
        />
        <source
          srcSet='https://cdn-iw-02.rofi.io/images/banner_768.jpg'
          media='(min-width: 500px)'
        />
        <img
          src='https://cdn-iw-02.rofi.io/images/banner_992.jpg'
          alt='idol-world'
          className={`h-full w-full object-cover`}
        />
      </picture>
      <div className='absolute bottom-0 left-0 z-[2] h-[50%] w-full bg-gradient-to-t from-[#4A0D93] to-[#1B122000]'></div>
      <div className='absolute z-[3] flex h-full w-full flex-col items-center justify-center font-Baloo2'>
        <h2 className='shadow-text-3 text-center text-[28px] font-semibold leading-[33px] text-white xl:text-[44px] xl:leading-[55px]'>
          AIRDROP 50,000 NFTs
        </h2>
        <p className='shadow-text-3 font-primary font-bai-jamjuree text-[40px] font-bold leading-[50px] text-secondary xl:text-[90px] xl:leading-[110px]'>
          $500,000
        </p>
        <p className='text-[19px] leading-[29px] text-[#E3AAFF]'>
          From 18 July to 8 August, 2023
        </p>
      </div>
    </section>
  )
}
