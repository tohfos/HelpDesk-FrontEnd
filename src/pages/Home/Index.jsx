import React from "react";
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Img from '../../assets/Agents.jpg'
import logo from '../../logo.svg'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init();





const Home = () => {
    return (
        <div className="space-y-16">
            {/*Hero part */}
            <div className='flex flex-col w-full mx-auto text-center justify-center'>

                <div className="h-screen mt-80">
                    <h1 className='text-7xl font-bold'>
                        <span data-aos="fade-up" data-aos-duration="1500">
                            Get the help you need,
                        </span>
                        <br />
                        <span className='font-extrabold' data-aos="fade-up" data-aos-duration="2000">
                            when you need it.
                        </span>
                    </h1>
                </div>

                <div className="w-fit h-screen self-center">
                    <img data-aos="fade-up" className='w-[400px] mx-auto my-3' src={logo} alt='logo' />
                    <p data-aos="fade-down" data-aos-duration="2000" className='text-4xl font-bold mb-5 mt-5 mx-3'>
                        Your trusted source for expert support
                    </p>
                </div>

                <div className='flex flex-col h-screen justify-center items-center'>
                    <p
                        data-aos="fade-in" data-aos-duration="1000"
                        className='text-7xl font-medium'>
                        Reliable Solutions For&nbsp;
                        <TypeAnimation
                            cursor={true}
                            sequence={[
                                ' Software',
                                2000,
                                ' Hardware',
                                2000,
                                ' Network',
                                2000,
                            ]}
                            repeat={Infinity}
                            wrapper='p'
                            className='text-8xl font-bold underline decoration-3'
                        />
                    </p>
                    <p
                        data-aos="fade-up" data-aos-duration="1500"
                        className='text-3xl font-bold text-base-content mt-20'>Craft your ticket effortlessly, tailored to Software, Hardware, or Network Issues</p>
                </div>
            </div>


            {/* Home page Card*/}
            <div className="bg-base-200 flex-col justify-center mb-12">
                <div className='w-full py-16 px-4'>
                    <div className='max-w-[1240px] space-x-6 mx-auto grid md:grid-cols-2'>
                        <img data-aos="fade-right" data-aos-duration="2000" className='w-fit my-4' src={Img} alt='/' />
                        <div className='flex flex-col justify-center'>
                            <p className='font-bold my-2'>EXPERT HELPDESK SUPPORT</p>
                            <h1 className='text-3xl font-bold my-2'>Effortless IT Solutions with Dedicated Agents</h1>
                            <p data-aos="fade-left" data-aos-duration="2500">
                                Simplify your IT challenges with our HelpDesk support.
                                Our dedicated team of expert agents is here to efficiently manage and resolve your software, hardware, and network issues.
                                Experience personalized assistance and real-time chat for immediate support and satisfaction.
                            </p>
                            <button className='btn btn-primary w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>
                                <Link to="/login">Get Started</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    );
};

export default Home;
