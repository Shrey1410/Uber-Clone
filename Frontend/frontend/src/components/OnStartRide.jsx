import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext'
import Ridepopup from './Ridepopup'
const Drive = () => {
  const {captain} = useContext(CaptainDataContext)
  const Navigate = useNavigate()
  const {socket} = useContext(SocketContext)
  useEffect(() => {
    if (!captain) {
      Navigate('/');
    }
    else{
      console.log("entered")
      socket.emit("join", {userType : "captain", userId : captain._id})
      const updateLocation = () =>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position =>{
            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
              }
            })
          })
        }
      }
      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()
    }
    }, [captain]);
  return (
    <div>
      <div className='h-screen flex flex-col overflow-hidden'>
      <Navbar />
        <div className="flex justify-between p-10 flex-grow overflow-y-auto">
      {captain && (
        <div className="w-64 h-auto border-2 rounded-xl flex flex-col items-start shadow-lg bg-slate-100">
        <div className="flex items-center p-5">
        <p className="px-5 font-bold text-lg text-center">
        USER
      </p>
      </div>
      <div className='w-full'>
      <div className="flex flex-col w-full">
        <p className="px-1 py-2 font-semibold">Vehicle Types: {captain.vehicle.vechiletypes.toUpperCase()}</p>
        <p className="px-1 py-2 font-semibold">Destination</p>
        <p className="px-1 py-2 font-semibold">Pickup</p>
        <p className="px-1 py-2 font-semibold">Fare</p>
        <p className="px-1 py-2 font-semibold">Status</p>
        </div>
        <div className='flex flex-col items-center justify-center pt-10'>
            <button className='px-4 py-2 bg-black text-white rounded-xl'>End Ride</button>
        </div>
        </div>
      </div>
    )}
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

export default Drive