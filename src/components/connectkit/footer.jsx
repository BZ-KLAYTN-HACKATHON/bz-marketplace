export const Footer = () => {
  return (
    <div className='text-white/80'>
      By connecting your wallet you agree to the{' '}
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://en.wikipedia.org/wiki/Terms_of_service'
        className='!font-semibold !text-white underline-offset-4 hover:underline'
      >
        Terms of Service
      </a>{' '}
      and{' '}
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://en.wikipedia.org/wiki/Privacy_policy'
        className='!font-semibold !text-white underline-offset-4 hover:underline'
      >
        Privacy Policy
      </a>
    </div>
  )
}
