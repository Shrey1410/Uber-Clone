import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OnStartRide = () => {
  const Navigate = useNavigate()
  const location = useLocation()
  const ride = location.state?.ride
  const onEndRide = async (e)=>{
    try{
    e.preventDefault()
    const res = await axios.post('http://localhost:8000/ride/end', {
      rideId : ride[0]._id
    }, {
      withCredentials : true
    })
    Navigate('/')
    toast.success(`Ride Completed Successfully!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }
  catch(error){
    console.log(error);
    toast.error(`${error.response.data.message}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }
  }
  return (
    <div>
      <div className='h-screen flex flex-col overflow-hidden'>
      <Navbar />
        <div className="flex justify-between p-10 flex-grow overflow-y-auto">
        <div className="w-64 h-auto border-2 rounded-xl flex flex-col items-start shadow-lg bg-slate-100">
        <div className="flex items-center p-5">
        <p className="px-5 font-bold text-lg text-center">
        User: {ride[0].userId[0].fullname.firstname} {ride[0].userId[0].fullname.lastname}
      </p>
      </div>
      <div className='w-full'>
      <div className="flex flex-col w-full">
        <p className="px-1 py-2 font-semibold capitalize">Vehicle Types: {ride[0].vechileType}</p>
        <p className="px-1 py-2 font-semibold">Destination: {ride[0].destination}</p>
        <p className="px-1 py-2 font-semibold">Pickup: {ride[0].pickup}</p>
        <p className="px-1 py-2 font-semibold">Fare: {ride[0].fare}</p>
        <p className="px-1 py-2 font-semibold capitalize">Status: {ride[0].status}</p>
        </div>
        <div className='flex flex-col items-center justify-center pt-10'>
            <button className='px-4 py-2 bg-black text-white rounded-xl' onClick={onEndRide}>End Ride</button>
        </div>
        </div>
      </div>
        <div className="px-1">
          <img
            src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
            alt=""
            className="h-[420px] w-[825px] px-2"
          />
        </div>
      </div>
    </div>
    </div>
  )
}

export default OnStartRide