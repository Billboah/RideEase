import React from 'react'
import Link from 'next/link'
import { ComponentLayout } from './layout'

const ordered = () => {
  return (
    <ComponentLayout>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-[40px] font-bold'>
          You have successfully ordered Uber service
        </h1>
        <p className='text-[20px]'>
          The uber service car will be here in the next five minutes
        </p>
        <p className='text-blue-500 underline'>
          <Link href='/' passHref={true}>
            Visit homepage
          </Link>
        </p>
      </div>
    </ComponentLayout>
  )
}

export default ordered
