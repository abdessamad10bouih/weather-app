import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import cloudy from '../assets/clouds.jpg';
import sunny from '../assets/sun.jpg';
import rainy from '../assets/rain.jpg'
import { faSun, faCloud, faCloudRain, faSnowflake, faBolt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'

const MainPage = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [bgImg, setBgImg] = useState(sunny)

    const clickedCity = (e) => {
        e.preventDefault()
        const valueInput = e.target.textContent;
        setCity(valueInput)
    }
    useEffect(() => {
        console.log(city)
    }, [city])

    const getWeatherIcon = (weatherId) => {
        if (weatherId >= 200 && weatherId <= 232) {
            return faBolt;
        } else if (weatherId >= 300 && weatherId <= 321) {
            return faCloudRain;
        } else if (weatherId >= 500 && weatherId <= 531) {
            return faCloudRain;
        } else if (weatherId >= 600 && weatherId <= 622) {
            return faSnowflake;
        } else if (weatherId === 800) {
            return faSun;
        } else if (weatherId >= 801 && weatherId <= 804) {
            return faCloud;
        }
        return faCloud;
    };
    const getWeatherBg = (weatherId) => {
        if (weatherId >= 200 && weatherId <= 232) {
            return rainy;
        } else if (weatherId >= 300 && weatherId <= 321) {
            return rainy;
        } else if (weatherId >= 500 && weatherId <= 531) {
            return rainy;
        } else if (weatherId === 800) {
            return sunny;
        } else if (weatherId >= 801 && weatherId <= 804) {
            return cloudy;
        }
        return cloudy;
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const apiKey = 'b7616b2f4b7206cf1876f3062c6ec345'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(url)
            .then(res => {
                setWeather(res.data)
                const weatherId = res.data.weather[0].id
                setBgImg(getWeatherBg(weatherId))
            })
            .catch(err => console.log(`there's an error : ${err}`))
    }



    return (
        <>
            <motion.section
                key={bgImg} 
                className='w-full h-screen flex bg-cover'
                style={{ background: `url(${bgImg}) center no-repeat`, backgroundSize: 'cover' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }} 
            >
                <div className='w-[60%] h-screen flex flex-col'>
                    <div className='w-full h-[15%] flex pl-5 items-center'>
                        <h1 className='text-2xl text-white'>the.weather</h1>
                    </div>
                    {weather && (
                        <motion.div
                            initial={{ x: "-100vw" }}
                            animate={{
                                x: "0vw",
                                transition: {
                                    ease: 'easeInOut',
                                    duration: 1,
                                    delay: 0.1
                                }
                            }}
                            className='w-full h-[90%] pl-6 pb-20 flex items-end'>
                            <h1 className='text-[200px] text-white '>{weather.main.temp}° </h1>
                            <div className='w-80 h-48 text-center p-4 flex flex-col'>
                                <h1 className='text-[50px] text-white '>{weather.name}</h1>
                                <h1 className='text-white'>Monday, 9 Sep 2024</h1>
                            </div>
                            <div className='w-80 h-48 p-4 text-center justify-start items-start flex flex-col'>
                                <FontAwesomeIcon className='text-7xl text-white' icon={getWeatherIcon(weather.weather[0].id)} />
                                <h1 className='text-white text-2xl'>{weather.weather[0].main}</h1>
                            </div>
                        </motion.div>
                    )}
                </div>
                <motion.div initial={{ x: "100vw" }}
                    animate={{
                        x: "0vw",
                        transition: {
                            ease: 'easeInOut',
                            duration: 1,
                            delay: 0.2
                        }
                    }} className=' w-[40%] h-screen backdrop-blur-md flex flex-col items-center'>
                    <form onSubmit={handleSubmit} className='w-full h-32 flex items-center justify-end'>
                        <div className='w-[85%] px-10 h-full flex items-end'>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Search Location' className='border-b text-3xl pl-5 placeholder:text-3xl border-gray-700 w-full h-[40%] outline-none bg-transparent' />
                        </div>
                        <button type='submit' className='w-[15%] h-full flex relative justify-center items-center bg-white cursor-pointer'>
                            <div className='w-8 h-8 rounded-full border border-black'></div>
                            <div className='w-5 border left-[65px] rotate-[45deg] bottom-[44px] border-black absolute'></div>
                        </button>
                    </form>
                    <div className='w-[90%] mb-5 h-[40vh] border-b border-black'>
                        <ul className='w-full h-full justify-evenly flex flex-col'>
                            <li className='text-2xl'><a href="" onClick={clickedCity} className='hover:border-b hover:border-black'>Ouarzazate</a></li>
                            <li className='text-2xl'><a href="" onClick={clickedCity} className='hover:border-b hover:border-black'>Rabat</a></li>
                            <li className='text-2xl'><a href="" onClick={clickedCity} className='hover:border-b hover:border-black'>Agadir</a></li>
                            <li className='text-2xl'><a href="" onClick={clickedCity} className='hover:border-b hover:border-black'>Marrakech</a></li>
                            <li className='text-2xl'><a href="" onClick={clickedCity} className='hover:border-b hover:border-black'>Tangier</a></li>
                        </ul>
                    </div>
                    {weather && (
                        <motion.div
                            initial={{ x: "100vw" }}
                            animate={{
                                x: "0vw",
                                transition: {
                                    ease: 'easeInOut',
                                    duration: 1,
                                    delay: 0.1
                                }
                            }}
                            className='w-[90%] h-[45vh] flex flex-col border-b border-black'>
                            <h1 className='text-2xl text-white'>Weather Details</h1>
                            <div className='w-full h-[20%] mt-9 flex justify-between'>
                                <h1 className='text-gray-400 text-2xl'>Cloudy</h1>
                                <h1 className='text-white font-bold text-2xl'>{weather.clouds.all}%</h1>
                            </div>
                            <div className='w-full h-[20%] flex justify-between'>
                                <h1 className='text-gray-400 text-2xl'>Humidity</h1>
                                <h1 className='text-white font-bold text-2xl'>{weather.main.humidity}%</h1>
                            </div>
                            <div className='w-full h-[20%] flex justify-between'>
                                <h1 className='text-gray-400 text-2xl'>Wind</h1>
                                <h1 className='text-white font-bold text-2xl'>{weather.wind.speed}%</h1>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.section>

        </>
    )
}

export default MainPage