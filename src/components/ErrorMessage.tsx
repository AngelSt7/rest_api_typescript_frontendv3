import { PropsWithChildren } from 'react'

export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className='text-center my-4 bg-customRed text-white p-3 uppercase'>
        {children}
    </div>
  )
}
