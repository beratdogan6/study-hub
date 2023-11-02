"use client";

import { useEffect, useState } from 'react'
import Clock from '@/components/Clock/clock'
import Timer from '@/components/Timer/timer'
import ToDoList from '@/components/ToDoList/ToDoList';
import Background from '@/components/Background';
import { IoMdSettings } from 'react-icons/io'
import { AiOutlineTool } from 'react-icons/ai'
import { MdOutlineWallpaper } from 'react-icons/md'
import Sounds from '@/components/Sounds';

export default function Home() {
  const [state, setState] = useState(false);
  const [tools, setTools] = useState(false);
  const [clock, setClock] = useState(false);
  const [timer, setTimer] = useState(false);
  const [todo, setTodo] = useState(false);

  useEffect(() => {
    const storedClock = JSON.parse(localStorage.getItem('clock'));
    const storedTimer = JSON.parse(localStorage.getItem('timer'));
    const storedTodo = JSON.parse(localStorage.getItem('todo'));

    if (storedClock) {
      setClock(storedClock);
    }
    if (storedTimer) {
      setTimer(storedTimer);
    }
    if (storedTodo) {
      setTodo(storedTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clock', JSON.stringify(clock));
    localStorage.setItem('timer', JSON.stringify(timer));
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [clock, timer, todo]);

  return (
    <main>
      <Background />
      <tools className='z-10 absolute'>
        <div className={clock ? 'hidden' : ''}>
          <Clock />
        </div>
        <div className={todo ? 'hidden' : ''}>
          <ToDoList />
        </div>
        <div className={timer ? 'hidden' : ''}>
          <Timer />
        </div>
        <Sounds />
      </tools>
      <settings className='absolute top-[3%] right-[2%] z-20'>
        <div className='w-fit'>
          <button onClick={() => setState(!state)}>
            <IoMdSettings size={50} className='text-[#000] opacity-75' />
          </button>
          <div className={state ? 'flex flex-col items-center mt-5' : 'hidden'}>
            <ul className='flex flex-col gap-5'>
              <li>
                <button onClick={() => setTools(!tools)}>
                  <AiOutlineTool size={30} />
                </button>
              </li>
              <li>
                <MdOutlineWallpaper size={30} />
              </li>
            </ul>
          </div>
        </div>
      </settings>
      <popup className={tools ? 'toolsPopup' : 'toolsPopupOff'}>
        <div className='px-10 py-7 rounded-md bg-black bg-opacity-70 flex flex-col gap-3'>
          <div className='flex items-center justify-between gap-10'>
            <p className='text-white text-lg'>Saat:</p>

            <label className="switch">
              <input
                type="checkbox"
                onChange={() => setClock(!clock)}
                checked={!clock}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className='flex items-center justify-between gap-10'>
            <p className='text-white text-lg'>Zamanlayıcı:</p>

            <label className="switch">
              <input
                type="checkbox"
                onChange={() => setTimer(!timer)}
                checked={!timer}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className='flex items-center justify-between gap-10'>
            <p className='text-white text-lg'>ToDo List:</p>

            <label className="switch">
              <input
                type="checkbox"
                onChange={() => setTodo(!todo)}
                checked={!todo}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <button onClick={() => setTools(!tools)}>
            <p className='text-white text-lg'>Kapat</p>
          </button>
        </div>
      </popup>
    </main>
  )
}
