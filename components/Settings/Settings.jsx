"use client";

import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

export default function page() {
  const [state, setState] = useState(true);

  return (
    <main>
      <button>
        <FiSettings size={50} />
        <div className='flex flex-col items-center mt-5'>
          <ul className='flex flex-col gap-5'>
            <li>b</li>
            <li>b</li>
            <li>b</li>
            <li>b</li>
          </ul>
        </div>
      </button>
    </main>
  );
}