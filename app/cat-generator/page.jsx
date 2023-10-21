"use client";

import React, { useState } from "react";
import CatImage from '@/components/CatImage';

const catImageURLs = [
  "cat.png",
  "cat2.png",
  "cat3.png",
  "cat4.png",
  "cat5.png",
  "cat6.png",
];

const App = () => {
  const [catImages, setCatImages] = useState([]);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * catImageURLs.length);
    return catImageURLs[randomIndex];
  };

  const playMeowSound = () => {
    const audio = new Audio("meow.mp3");
    audio.play();
  };

  const handleScreenClick = (event) => {
    playMeowSound();

    const x = event.clientX;
    const y = event.clientY;
    const imageUrl = getRandomImage();

    const newCatImage = {
      x,
      y,
      imageUrl,
      id: Date.now(), // Use a unique ID for each cat image
    };
    setCatImages((prevCatImages) => [...prevCatImages, newCatImage]);
  };

  return (
    <div onClick={handleScreenClick} className="w-full h-screen">
      <p className="w-full text-center pt-5 font-medium text-3xl">Herhangi bir yere dokun en fazla ne olabilir ki</p>
      {catImages.map((catImage) => (
        <CatImage
          key={catImage.id}
          x={catImage.x}
          y={catImage.y}
          imageUrl={catImage.imageUrl}
          id={catImage.id}
        />
      ))}
    </div>
  );
};

export default App;

