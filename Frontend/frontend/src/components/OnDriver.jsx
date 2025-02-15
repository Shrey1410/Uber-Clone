import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
const OnDriver = () => {
  const location = useLocation()
  const Navigate = useNavigate()
  const ride = location.state?.ride
  const [ridestarted, setRideStarted] = useState(false)
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  useEffect(()=>{
    if(!user){
      Navigate('/')
    }
  }, [user])
  socket.on("start-ride", (data)=>{
  toast.success(`Ride Started Successfully`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
    console.log(data)
    setRideStarted(true)
  })
  socket.on("end-ride", (data)=>{
    console.log("Entered Endslkn")
    console.log(data)
    toast.success(`Ride Completed Successfully`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    Navigate('/ride')
  })
  return (
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-col md:flex-row justify-between md:p-10 overflow-hidden">
          <div className="md:px-1 md:hidden">
            <img
              src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
              alt=""
              className="w-full md:px-2 h-[calc(100vh-20rem)] object-cover"
            />
          </div>
          {ride? (
          <div className="md:p-2 flex flex-col items-center border-2 rounded-xl shadow-lg md:px-10 overflow-y-auto">
            <p className='capitalize p-1'>Captain: {ride.captain.fullname.firstname} {ride.captain.fullname.lastname}</p>
            <p className='capitalize font-bold text-xl p-1'>Ride's Information:</p>
            <p className='capitalize p-1'>Pickup : {ride.pickup}</p>
            <p className='capitalize p-1'>Destination : {ride.destination}</p>
            <p className='p-1'>Otp : {ride.otp}</p>
            <p className='p-1'>Fare : {ride.fare}</p>
            <p className='capitalize p-1'>Status : {ride.status}</p>
            <p className='font-bold text-xl p-1'>Vechile's Information:</p>
            <p className='p-1'>VechileType : {ride.vechileType}</p>
            <p className='p-1'>Color : {ride.captain.vehicle.color}</p>
            <p className='p-1'>Capacity : {ride.captain.vehicle.capacity}</p>
            <p className='p-1'>PlateNo. : {ride.captain.vehicle.plate}</p>
            <div>
            {ridestarted ? (
            <button className='p-2 bg-black text-white rounded-xl m-1'>Make Payment</button>) : (<></>)
            }
          </div>
          </div>)
          : (<></>)}
          <div className="md:px-1 hidden md:block">
            <img
              src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
              alt=""
              className="h-[420px] w-[700px] px-2"
            />
          </div>
        </div>
      </div>
    );
  };

export default OnDriver
