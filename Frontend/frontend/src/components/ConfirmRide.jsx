import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { RideContext } from '../context/RideContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const ConfirmRide = () => {
  const [confirmride, setConfirmride] = useState(false);
  const { pickup, dropoff, vechiletype , amount } = useContext(RideContext);
  const user = useContext(UserDataContext)
  const Navigate = useNavigate()
  const vehicleImages = {
    car: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/IntercityUberX.png",
    motorcycle: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  };

  const vehicleImage = vehicleImages[vechiletype] || vehicleImages['car']
  useEffect(()=>{
    if(!user){
      Navigate('/login')
    }
    // if(!pickup || !dropoff || !vechiletype){
    //   Navigate('/ride')
    // }
  }, [user, pickup, dropoff, amount])
  const handleonGo = async (e)=>{
    e.preventDefault()
    const obj = {
      pickup : pickup,
      destination: dropoff,
      vechicleTypes : vechiletype,
      fare : amount
    }
    try{
      const res = await axios.post("http://localhost:8000/ride/create", obj, {
        withCredentials : true
      })
      toast.success(`${'Ride created successfully'}`, {
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
        <div className="md:p-2 flex flex-col items-center border-2 rounded-xl shadow-lg overflow-y-auto">
          {!confirmride ? (
            <p className="text-3xl md:text-4xl font-bold p-1 py-5">Confirm Your Ride</p>
          ) : (
            <p className="text-3xl md:text-4xl font-bold p-1 py-5">Looking for a Driver</p>
          )}
          <div className="border-2 rounded-xl border-black flex flex-col px-2 items-center lg:w-[400px] bg-slate-100">
            <img src={vehicleImage} className="w-20 h-20 m-1" alt={`${vechiletype} image`} />
            <div className="flex flex-col items-center justify-center">
              <p className='font-bold text-lg text-center'>{pickup}</p>
              <p className="py-1 text-sm font-semibold">to</p>
              <p className='font-bold text-lg text-center'>{dropoff}</p>
            </div>
            {/* {amount ?  <p className="py-4 font-bold text-xl">&#8377;{amount.toFixed(2)}</p> : (<></>)} */}
          </div>
          {!confirmride ? (
            <button
              className="m-3 bg-black text-white p-5 rounded-xl text-lg"
              onClick={(e) => {
                e.preventDefault();
                handleonGo(e)
                setConfirmride(true);
              }}
            >
              Confirm Ride
            </button>
          ) : (
            <></>
          )}
        </div>
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
export default ConfirmRide;