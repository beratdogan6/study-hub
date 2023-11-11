"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [day, setDay] = useState("");
  const [formattedTime, setFormattedTime] = useState("")
  const [month, setMonth] = useState("")
  const [d, setD] = useState('')
  const [year, setYear] = useState("")

  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  const handleButton = async () => {



    await axios.get("https://api.weatherapi.com/v1/current.json", {
      params: {
        key: "2d6e362847bb4b82b65220712231111",
        q: `${lat},${long}`
      }
    })
      .then(res => {
        console.log(lat,long)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("Latitude: " + latitude);
          console.log("Longitude: " + longitude);

          setLat(position.coords.latitude)
          setLong(position.coords.longitude)

        },

        function (error) {
          console.error("Error getting the current position:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }

    setInterval(() => {
      const date = new Date();

      const dayIndex = date.getDay();
      dayIndex === 0
        ? setDay('SUN')
        : dayIndex === 1
          ? setDay('MON')
          : dayIndex === 2
            ? setDay('TUE')
            : dayIndex === 3
              ? setDay('WED')
              : dayIndex === 4
                ? setDay('THU')
                : dayIndex === 5
                  ? setDay('FRI')
                  : setDay('SAT');


      const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
      const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      const sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()

      setFormattedTime(`${hour}:${min}:${sec}`)


      setD(date.getDate())
      const monthIndex = date.getMonth();

      monthIndex === 0
        ? setMonth('January')
        : monthIndex === 1
          ? setMonth('February')
          : monthIndex === 2
            ? setMonth('March')
            : monthIndex === 3
              ? setMonth('April')
              : monthIndex === 4
                ? setMonth('May')
                : monthIndex === 5
                  ? setMonth('June')
                  : monthIndex === 6
                    ? setMonth('July')
                    : monthIndex === 7
                      ? setMonth('August')
                      : monthIndex === 8
                        ? setMonth('September')
                        : monthIndex === 9
                          ? setMonth('October')
                          : monthIndex === 10
                            ? setMonth('November')
                            : setMonth('December');


      setYear(date.getFullYear())




    }, 500)
  }, []); // Empty dependency array ensures that this effect runs only once, on mount

  return (
    <>
      <div className='min-h-screen bg-slate-300 flex items-center justify-center text-gray-300'>
        <div className=' w-[800px] h-[450px] bg-slate-500 rounded-3xl shadow-xl font-RbtCondensed '>

          <div >
            <ul className=' flex justify-between px-[100px] py-5 mt-12 text-xl'>
              <li className={day === "SUN" ? "text-white underline" : "text-white opacity-40"}>SUN</li>
              <li className={day === "MON" ? "text-white underline" : "text-white opacity-40"}>MON</li>
              <li className={day === "TUE" ? "text-white underline" : "text-white opacity-40"}>TUE</li>
              <li className={day === "WED" ? "text-white underline" : "text-white opacity-40"}>WED</li>
              <li className={day === "THU" ? "text-white underline" : "text-white opacity-40"}>THU</li>
              <li className={day === "FRI" ? "text-white underline" : "text-white opacity-40"}>FRI</li>
              <li className={day === "SAT" ? "text-white underline" : "text-white opacity-40"}>SAT</li>
            </ul>
          </div>

          <div className='flex gap-x-5 justify-center mt-[40px] text-[100px]'>
            <p>{formattedTime}</p>
          </div>

          <div className='flex justify-center mt-[50px] text-[28px] mb-4'>
            <p>{d} {month} {year}</p>
          </div>

          <button onClick={handleButton}>click me!!</button>
        </div>
      </div>
    </>
  )
}

export default App