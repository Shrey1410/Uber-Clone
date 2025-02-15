import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

function Ridepopup() {
  const [ride, setRiderequest] = useState(null);
  const { socket } = useContext(SocketContext);
  const Navigate = useNavigate();

  socket.on("new-ride", (data) => {
    console.log(data)
    setRiderequest(data);
  });

  const onDecline = (rideId) => {
    setRiderequest(null);
  };

  const handleOnaccept = async (e)=>{
    e.preventDefault()
    try{
    const res = await axios.post('http://localhost:8000/ride/confirm', {
      rideId : ride[0]._id
    }, {
      withCredentials: true,
    })
      Navigate('/onacceptride' , { state: { ride: ride } })
      toast.success(`Ride Confirmed Successfully!`, {
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
      console.log(error)
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
      <Navbar />
      <div className="p-6">
        {ride ? (
            <div
              className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10 my-4"
            >
              <div className="relative flex justify-center items-center">
                <div className="absolute h-20 w-20 rounded-full bg-black transition-all duration-300 group-hover:scale-[10]"></div>
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
                  <p className="font-bold text-black group-hover:text-white capitalize">
                    Status: {ride[0].status}
                  </p>
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    className="transition-all duration-300 group-hover:text-black group-hover:bg-white bg-black text-white py-1 px-4 rounded-xl"
                    onClick={handleOnaccept}
                  >
                    Accept
                  </button>
                  <button
                    className="transition-all duration-300 group-hover:text-black group-hover:bg-white bg-black text-white py-1 px-4 rounded-xl"
                    onClick={() => onDecline(ride.id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
        ) : (
          <div className="relative min-h-60 w-full flex flex-col justify-center items-center my-6 shadow-sm border border-slate-200 rounded-lg p-4 bg-slate-200">
            <div className="p-3 text-center">
              <h5 className="text-slate-800 text-2xl font-semibold">
                No Request Found
              </h5>
              <p className="block text-slate-600 leading-normal font-light mb-4 max-w-lg">
                No current user has requested a ride.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ridepopup;
