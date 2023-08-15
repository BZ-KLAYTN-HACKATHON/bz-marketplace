import * as React from 'react'

import { cn } from 'lib/utils'

const Input = React.forwardRef(
  ({ parentClass, className, type, icon, ...props }, ref) => {
    return (
      <div className={cn('relative', parentClass)}>
        {icon ? (
          <icon.icon className='translate-y-center ml-4 h-4 w-4 text-white' />
        ) : null}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
            icon ? 'pl-10' : 'pl-3'
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
