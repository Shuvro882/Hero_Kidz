import Link from 'next/link';
import React from 'react'
import { MdErrorOutline } from 'react-icons/md';

const Error404 = () => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center gap-5'>
     <MdErrorOutline size={100} className='text-primary' />
     <h2 className='text-4xl font-bold'>Page Not Found</h2>
     <Link href={"/"} className='btn'>Go To Home</Link>
    </div>
  )
}

export default Error404;