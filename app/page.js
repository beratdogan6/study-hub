"use client";

import React, { useState } from 'react'
import Clock from '@/components/Clock/clock'
import Timer from '@/components/Timer/timer'
import ToDoList from '@/components/ToDoList/ToDoList';
import Image from 'next/image'

export default function Home() {
  const [popUp, setpopUp] = useState(false);

  return (
    <main>
      <div className={popUp ? 'denemeOff' : 'deneme bg-[rgba(0,0,0,0.7)]'}>
        <div className='px-10 py-12 flex flex-col gap-5 border max-w-[500px] bg-white rounded-lg'>
          <h1 className='w-full font-bold text-center text-3xl tracking-widest text-red-600'>ÖNEMLİ!</h1>
          <p className='text-gray-700 font-light'>Bu siteyi kullanan canım arkadaşlarım o kadar uğraşa rağmen hala daha düzeltemedeğim bir hata yüzünden ToDoList'e eklediğiniz itemler f5 attığınızda siliniyor.</p>
          <p className='text-gray-700 font-light'>Yani şu anlık ToDoList'i kullanıyorsanız f5 atmayın.</p>
          <button onClick={() => setpopUp(true)} className='w-full py-2 px-4 bg-red-600 text-white font-bold rounded-lg'>Anladım</button>
        </div>
      </div>
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
        <ToDoList />
        <Timer />
      </div>
    </main>
  )
}
