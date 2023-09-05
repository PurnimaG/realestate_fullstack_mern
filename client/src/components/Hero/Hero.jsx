import React from 'react';
import './Hero.css';
import CountUp from 'react-countup';
import {motion, spring} from 'framer-motion';
import SearchBar from '../SearchBar/SearchBar';

const Hero = () => {
  return (
    <section className='hero-wrapper'>
        <div className='hero-container flexCenter innerWidth paddings '>
            {/* Left Side */}
            <div className=' flexColStart hero-left'>
                <div className='hero-title'>
                    <motion.h1 
                        initial={{ y: "2rem", opacity: 0}}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 2, type: "spring"}}
                    >Discover <br/> Most Suitable <br/> Property</motion.h1>
                </div>
                <div className=' flexColStart hero-description'>
                    <span className='secondaryText'>Find a variety of properties that suit you very easilty</span>
                    <span className='secondaryText'>Forget all difficulties in finding a residence for you</span>
                </div>
                <SearchBar />
                <div className='stats flexCenter'>
                    <div className='stat flexColStart'>
                        <span>
                            <CountUp start={8800} end={9000} duration={4}/>
                            <span>+</span>
                        </span>
                        <span className='secondaryText'>
                            Permium Products
                        </span>
                    </div>
                    <div className='stat flexColStart'>
                        <span>
                            <CountUp start={1950} end={2000} duration={4}/>
                            <span>+</span>
                        </span>
                        <span className='secondaryText'>
                            Happy Customers
                        </span>
                    </div>
                    <div className='stat flexColStart'>
                        <span>
                            <CountUp end={28}/>
                            <span>+</span>
                        </span>
                        <span className='secondaryText'>
                            Award Winning
                        </span>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className='hero-right flexCenter'>
                <motion.div 
                    className='image-container'
                    initial={{ x: "7rem", opacity : 0}}
                    animate={{ x: 0, opacity: 1}}
                    transition={{ duration: 2, type: "spring"}}
                >
                    <img src='./hero-image.png' alt='hero-image' />
                </motion.div>
            </div>
        </div>
    </section>
  )
}

export default Hero
