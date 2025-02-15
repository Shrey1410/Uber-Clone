import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { SocketContext } from "../context/SocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
function OnAcceptRide() {
  const Navigate = useNavigate()
  const [otp, setOtp] = useState("")
  const location = useLocation();
  const ride = location.state?.ride

  const onSubmit = async (e) => {
    e.preventDefault()
    try{
    const res = await axios.post('http://localhost:8000/ride/start', {
      rideId : ride[0]._id,
      otp : otp
    }, {
      withCredentials: true,
    })
    Navigate('/startride', {
      state : { ride : ride }
    })
    toast.success(`Ride Started Successfully!`, {
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
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
          <div className="relative flex flex-col justify-center overflow-hidden py-6 sm:py-12">
            <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
              <div className="relative flex justify-center items-center">
                <div className="absolute h-20 w-20 rounded-full bg-black transition-all duration-300 group-hover:scale-[12]"></div>
                <div className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-black transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-10 w-10 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative z-10 mx-auto max-w-md mt-5 flex flex-col items-center">
                <p className="text-base leading-7 text-gray-600 group-hover:text-white">
                  New ride request received!
                </p>
                <div className="space-y-2 flex flex-col items-center justify-center">
                  <p className="font-bold text-black group-hover:text-white capitalize">
                  User: {ride[0].userId[0].fullname.firstname} {ride[0].userId[0].fullname.lastname}
                  </p>
                  <p className="font-bold text-black group-hover:text-white capitalize">
                  Vehicle: {ride[0].vechileType}
                  </p>
                  <p className="font-bold text-black group-hover:text-white">
                  Pickup: {ride[0].pickup}
                  </p>
                  <p className="font-semibold group-hover:text-white">to</p>
                  <p className="font-bold text-black group-hover:text-white">
                  Destination: {ride[0].destination}
                  </p>
                  <p className="font-bold text-black group-hover:text-white">
                  Fare: {ride[0].fare}
                  </p>
                  <p className="font-bold text-black group-hover:text-white">
                  Status: {ride[0].status}
                  </p>
                </div>
                <div className="p-1">
                  <form action="">
                    <div>
                      <input type="text" placeholder="Enter OTP" className="p-2 rounded-xl bg-black text-white group-hover:bg-white group-hover:text-black" value={otp} onChange={(e)=>{
                        e.preventDefault()
                        setOtp(e.target.value)
                      }}/>
                    </div>
                  </form>
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    className="transition-all duration-300 group-hover:text-black group-hover:bg-white bg-black text-white py-1 px-4 rounded-xl"
                    onClick={onSubmit}
                  >
                    Start Ride
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default OnAcceptRide;