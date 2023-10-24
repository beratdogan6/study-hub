"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from 'react-dom';

export default function Page() {
  const CLIENT_ID = 'a19c9fda753748628ea9b9df210a8109';
  const REDIRECT_URI = 'http://localhost:3000/deneme';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  }

  const searchArtists = async (e) => {
    e.preventDefault();
    // setArtists([]);
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: 'artist'
      }
    })

    setArtists(data.artists.items);
  }

  const renderArtits = () => {
    return artists.map(artist => {
      return (
        <div key={artist.id}>
          {artist.images.length ? <img width={'100%'} src={artist.images[0].url} alt={artist.name} /> : <div>No Image</div>}
          <p>{artist.name}</p>
        </div>
      )
    })
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-5 items-center">
        <h1>Spotify Project Nextjs v13</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
          :
          <button onClick={logout}>Logout</button>
        }

        {token ?
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type={'submit'}>Search</button>
          </form>

          : <p>You need to login to search</p>
        }

        {renderArtits()}
      </div>
    </div>
  );
}
