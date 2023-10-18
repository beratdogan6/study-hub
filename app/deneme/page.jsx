"use client";

import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

export default function page() {
  const [state, setState] = useState(false);

  const handleButton = () => {
    setState(!state);
  };

  return (
    <main className='absolute top-[3%] right-[2%]'>
      <div className='w-fit'>
        <button onClick={handleButton}>
          <FiSettings size={50} />
        </button>
        <div className={state ? 'flex flex-col items-center mt-5' : 'hidden'}>
          <ul className='flex flex-col gap-5'>
            <li>b</li>
            <li>b</li>
            <li>b</li>
            <li>b</li>
          </ul>
        </div>
      </div>
    </main>
  );
}