import React from "react";
import Typed from 'react-typed';
import { Link } from 'react-router-dom';

import Img from '../../assets/Agents.jpg'


const Home = () => {
  return (
    <>
    {/*Hero part */}
      <div className=''>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#00df9a] font-bold p-2'>
                Your trusted source for expert support 
            </p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
                Get the help you need, when you need it.
            </h1>
            <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
                    Reliable Solutions For
                </p>
                <Typed
                className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
                    strings={['Software', 'Hardware', 'Network']}
                    typeSpeed={200}
                    backSpeed={180}
                    loop
                />
                
            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-500'>Craft your ticket effortlessly, tailored to Software, Hardware, or Network Issues</p>
      </div>
    </div>
    {/*--------------------------- */}



    {/* Home page Card*/}
    <div className="bg-base-200 flex-col justify-center mb-10"> 
        <div className='w-full  py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <img className='w-[500px] mx-auto my-4' src={Img} alt='/' />
                <div className='flex flex-col justify-center'>
                    <p className='text-[#00df9a] font-bold p-2'>EXPERT HELPDESK SUPPORT</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Effortless IT Solutions with Dedicated Agents</h1>
                    <p>
                    Simplify your IT challenges with our HelpDesk support. 
                    Our dedicated team of expert agents is here to efficiently manage and resolve your software, hardware, and network issues.
                    Experience personalized assistance and real-time chat for immediate support and satisfaction.
                    </p>
                    <button className='bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>
                    <Link to="/login">Get Started</Link>
                    </button>
                </div>
            </div>
        </div>
    </div>
    {/*----------------------- */}

    </>
  );
};

export default Home;
