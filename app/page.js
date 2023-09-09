"use client";

import Clock from '@/components/Clock/clock'
import Timer2 from '@/components/Timer/timer'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className='h-screen w-full fixed top-0 left-0 z-0'>
        <Image
          src='/2471316.gif'
          alt='Image'
          layout='fill'
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <div className='z-10 absolute'>
        <Clock />
        <Timer2 />
      </div>
    </main>
  )
}
