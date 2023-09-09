"use client";

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  const day = time.getDay();
  const dayFormat = day === 0 ? 'Pazar' : day === 1 ? 'Pazartesi' : day === 2 ? 'Salı' : day === 3 ? 'Çarşamba' : day === 4 ? 'Perşembe' : day === 5 ? 'Cuma' : 'Cumartesi';
  const date = time.getDate();
  const month = time.getMonth();
  const monthFormat = month === 0 ? 'Ocak' : month === 1 ? 'Şubat' : month === 2 ? 'Mart' : month === 3 ? 'Nisan' : month === 4 ? 'Mayıs' : month === 5 ? 'Haziran' : month === 6 ? 'Temmuz' : month === 7 ? 'Ağustos' : month === 8 ? 'Eylül' : month === 9 ? 'Ekim' : month === 10 ? 'Kasım' : 'Aralık';
  const timeOfDay = 22 <= hours && hours < 5 ? 'İyi Geceler' : 5 <= hours && hours < 12 ? 'Günaydınlar' : 12 <= hours && hours < 17 ? 'Tünaydınlar' : 'İyi Akşamlar';

  return (
    <div className="font-poppins">
      <Draggable
        defaultPosition={{ x: 100, y: 750 }}>
        <section className='text-white w-[400px] h-fit cursor-move'>
          <div>
            <div className='flex justify-between w-full font-medium text-[25px]'>
              <p>{timeOfDay}</p>
              <p>{hours}:{minutes}</p>
            </div>
            <p className='text-[19px]'>Bugün {dayFormat}, {date} {monthFormat}</p>
          </div>
        </section>
      </Draggable>
    </div>
  )
}

export default Clock;