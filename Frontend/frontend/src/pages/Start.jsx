import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

const Start = () => {
  return (
    <div className='flex flex-col'>
      
      <Navbar/>
      <div className='lg:p-16 flex flex-col justify-between lg:flex-row'>
        <div className='w-full lg:p-3 lg:h-[525px] lg:w-[550px]'>
          <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png" alt="" className='h-full w-full'/>
        </div>
        <div className='flex flex-col justify-center lg:h-[525px] lg:w-[550px] lg:p-20'>
          <p className='text-center text-3xl lg:text-5xl font-bold lg:py-10 p-2 lg:text-left'>Drive when you want, make what you need</p>
          <p className='text-lg px-2'>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</p>
          <div className='flex mx-3 my-3 lg:mx-0 justify-center'>
          <button className='bg-black text-white p-3 rounded '>Get Started</button>
          <Link className='p-3 text-gray-600 hover:text-gray-800 mx-2 underline underline-offset-8'>Already have an account?Sign in</Link>
          </div>
        </div>
      </div>
      <div className='lg:p-16 flex flex-col justify-between lg:flex-row'>
        <div className='w-full lg:h-[550px] lg:w-[550px] lg:hidden pt-16'>
          <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1684887108/assets/76/baf1ea-385a-408c-846b-59211086196c/original/u4b-square.png" alt="" className='h-full w-full'/>
        </div>
        <div className='lg:h-[525px] lg:w-[550px] lg:pr-20 lg:py-24 pt-8'>
          <p className='text-center lg:text-left text-3xl lg:text-5xl font-bold text-gray-800'>The Uber you know, reimagined for business</p>
          <p className='lg:py-4 text-lg py-2 px-3 lg:px-0'>Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
          <div className='flex mx-3 my-3 lg:mx-0 justify-center items-center lg:justify-start'>
          <button className='bg-black text-white p-3 rounded-lg mr-2 w-28'>Get started</button>
          <Link className='underline underline-offset-8 px-4'>Check out our solutions</Link>
          </div>
        </div>
        <div className='hidden lg:h-[550px] lg:w-[550px] lg:block'>
          <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1684887108/assets/76/baf1ea-385a-408c-846b-59211086196c/original/u4b-square.png" alt="" className='h-full w-full'/>
        </div>
      </div>
      <div className='hidden lg:p-16 lg:flex lg:justify-between'>
        <div className='p-3 h-[550px] w-[550px]'>
          <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1696243819/assets/18/34e6fd-33e3-4c95-ad7a-f484a8c812d7/original/fleet-management.jpg" alt="" className='h-full w-full'/>
        </div>
        <div className='h-[525px] w-[550px] p-20'>
          <p className='text-4xl font-bold py-10'>Make money by renting out your car</p>
          <p className=''>Connect with thousands of drivers and earn more per week with Uber's free fleet management tools.</p>
          <div className='flex my-3'>
          <button className='bg-black text-white p-3 rounded'>Get Started</button>
          <Link className='p-3 text-gray-600 hover:text-gray-800 mx-2 underline underline-offset-8'>Already have an account?Sign in</Link>
          </div>
        </div>
      </div>
      <div className='lg:h-screen bg-black lg:p-16 text-white p-5 max-h-fit w-full'>
        <p className='text-2xl px-3'>Uber</p>
        <div className='flex py-5 justify-between'>
          <div className='px-3'>
            <p className='font-semibold text-lg lg:py-5 py-1'>Company</p>
            <p className='py-2 text-sm'>About Us</p>
            <p className='py-2 text-sm'>Our Offering</p>
            <p className='py-2 text-sm'>Newsrooms</p>
            <p className='py-2 text-sm'>Investors</p>
            <p className='py-2 text-sm'>Blog</p>
            <p className='py-2 text-sm'>Careers</p>
          </div>
          <div className='px-3'>
            <p className='font-semibold text-lg lg:py-5 py-1'>Products</p>
            <p className='py-2 text-sm'>Ride</p>
            <p className='py-2 text-sm'>Drive</p>
            <p className='py-2 text-sm'>Deliver</p>
            <p className='py-2 text-sm'>Eat</p>
            <p className='py-2 text-sm'>Uber for business</p>
            <p className='py-2 text-sm'>Uber Freight</p>
            <p className='py-2 text-sm'>Gift Cards</p>
          </div>
          <div className='px-3'>
            <p className='font-semibold text-lg lg:py-5 py-1'>Global Citizenship</p>
            <p className='py-2 text-sm'>Saftey</p>
            <p className='py-2 text-sm'>Diversity and Inclusion</p>
            <p className='py-2 text-sm'>Sustainability</p>
          </div>
          <div className='px-3'>
            <p className='font-semibold text-lg lg:py-5 py-1'>Travel</p>
            <p className='py-2 text-sm'>Reserve</p>
            <p className='py-2 text-sm'>Airports</p>
            <p className='py-2 text-sm'>Cities</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start