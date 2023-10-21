"use client";

import { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';

export default function page() {
  const CLIENT_ID = 'a19c9fda753748628ea9b9df210a8109';
  const CLIENT_SECRET = '21ab9e8cc2e6414f8d2d625bee663852';
  const [state, setState] = useState(false);
  const [token, setToken] = useState('');

  const handleButton = () => {
    setState(!state);
  };

  var apiParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    }
  }

  // Spotify API endpoint'ini tanımlayın
  const endpoint = 'https://api.spotify.com/v1/me/playlists';

  // API isteğini yapın
  fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Yanıt verilerini işleyin
    })
    .catch(error => {
      console.error('Hata:', error);
    });

  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(response => response.json())
      .then(data => setToken(data.access_token))
      .catch(err => console.log(err));
  }, []);

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