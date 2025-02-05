import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Dropdownmenu from './Dropdownmenu';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import { RideContext } from '../context/RideContext';
import { SocketContext } from '../context/SocketContext';
import { toast } from 'react-toastify';
import {SpinningCircles} from 'react-loading-icons'
const Ride = ()=>{
  const Navigate = useNavigate();
  const {pickup, setPickup} = useContext(RideContext);
  const {dropoff, setDropoff} = useContext(RideContext)
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [onsubmit, setOnsubmit] = useState(false);
  const { user } = useContext(UserDataContext);
  const {vechiletype, setVechiletype} = useContext(RideContext);
  const {amount, setAmount} = useContext(RideContext)
  const {socket} = useContext(SocketContext)
  const [price, setPrice] = useState(null)
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    if(!user){
      Navigate('/login');
    }
    else{
      socket.emit("join", { userType : "user", userId : user._id})
    }
  }, [user]);
  socket.on('confirm-ride', (data)=>{
    console.log(data)
  })
  const handleOnSubmit = async ()=>{
    let res
    try{
    setisLoading(true);
    res = await axios.post("http://localhost:8000/ride/get-fare", {
      pickup : pickup,
      dropoff : dropoff
    },{
      withCredentials : true
    })
    setPrice(res.data)
    setisLoading(false)
    }
    catch(error){
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
  const handleonGo = ()=>{
    Navigate('/confirm-ride')
  }
  return (
    <div className="h-screen flex flex-col w-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between md:p-10 flex-grow overflow-hidden w-full h-[calc(100vh-20rem)] object-cover">
        <div className="md:px-1 md:hidden h-screen w-screen">
          <img
            src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
            alt="Map"
          />
        </div>
        {!onsubmit ? (
          <div className="flex flex-col border-2 border-gray-200 rounded-xl p-2 self-auto h-80 items-center md:items-start overflow-visible">
            <p className="font-bold text-2xl p-2">Get a ride</p>
            <form className="flex flex-col p-2">
              <div className="relative">
                <div className="relative">
                  <i className="ri-record-circle-fill absolute top-5 left-2"></i>
                  <input
                    type="text"
                    placeholder="Pickup location"
                    className="w-72 bg-slate-200 p-3 pl-8 rounded-lg my-2"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onFocus={() => setShowPickupDropdown(true)}
                    onBlur={() => !pickup && setShowPickupDropdown(false)}
                  />
                  {showPickupDropdown && pickup ? (
                    <Dropdownmenu
                      data={pickup}
                      showdropdown={showPickupDropdown}
                      setdata={setPickup}
                      setdropdown={setShowPickupDropdown}
                    />
                  ):(<></>)}
                </div>
                <div className="relative">
                  <i className="ri-stop-circle-fill absolute top-5 left-2"></i>
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    className="w-72 bg-slate-200 p-3 pl-8 rounded-lg my-2"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    onFocus={() => setShowDropoffDropdown(true)}
                    onBlur={() => !dropoff && setShowDropoffDropdown(false)}
                  />
                  {showDropoffDropdown && dropoff ? (
                    <Dropdownmenu
                      data={dropoff}
                      showdropdown={showDropoffDropdown}
                      setdata={setDropoff}
                      setdropdown={setShowDropoffDropdown}
                    />
                  ):(<></>)}
                </div>
              </div>
              <button
                type="button"
                className="bg-black text-white p-3 rounded-xl my-3"
                onClick={(e) => {
                  e.preventDefault();
                  if (dropoff && pickup){
                    handleOnSubmit()
                    setOnsubmit(true)
                  }
                }}
              >
                Search
              </button>
            </form>
          </div>
        ) : (isLoading?(<div className='flex items-center justify-center'>
          <SpinningCircles stroke="black" strokeOpacity={.25} speed={.75} />
        </div>):(
          <div className="flex flex-col overflow-hidden mx-0">
            <div className="px-2 flex flex-col overflow-y-auto items-center rounded-xl">
              <p className="text-3xl md:text-4xl font-bold p-1">Choose a Ride</p>
              <div className="p-3 w-full my-3 border-2 border-gray-100 rounded-xl shadow-lg h-auto text-lg font-semibold bg-slate-100">
                <div className='items-center flex flex-col justify-center'>
                <p className='font-bold text-center'>{pickup}</p>
                <p className='text-sm font-semibold'>to</p>
                <p className='font-bold text-center'>{dropoff}</p>
                </div>
              </div>
              <p className="p-2 font-semibold text-2xl">Recommended</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setVechiletype("car");
                  setAmount(price['car'].toFixed(2))
                }}
              >
                <div
                  className={`p-3 w-full my-3 bg-slate-100 rounded-xl shadow-lg items-start h-auto text-lg font-semibold hover:bg-slate-200 ${
                    vechiletype === "car" ? "border-2 border-black" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/IntercityUberX.png"
                      alt="car"
                      className="w-24 h-24"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">Uber Car</p>
                      <p className="text-sm">Affordable outstation rides in compact cars</p>
                    </div>
                    {price ? (<div className='px-4 font-bold'>&#8377;{price['car'].toFixed(2)}</div>):(<></>)}
                  </div>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setVechiletype("motorcycle");
                  setAmount(price['motorcycle'].toFixed(2))
                }}
              >
                <div
                  className={`p-3 w-full my-3 bg-slate-100 rounded-xl shadow-lg items-start h-auto text-lg font-semibold hover:bg-slate-200 ${
                    vechiletype === "motorcycle" ? "border-2 border-black" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                      alt="motorcycle"
                      className="w-24 h-24"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">Uber Motorcycle</p>
                      <p className="text-sm">
                        Outstanding ride in Uber bike at Affordable price
                      </p>
                    </div>
                    {price ? (<div className='px-4 font-bold'>&#8377;{price['motorcycle'].toFixed(2)}</div>):(<></>)}
                  </div>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setVechiletype("auto");
                  setAmount(price['auto'].toFixed(2))
                }}
              >
                <div
                  className={`p-3 w-full my-3 bg-slate-100 rounded-xl shadow-lg items-start h-auto text-lg font-semibold hover:bg-slate-200 ${
                    vechiletype === "auto" ? "border-2 border-black" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                      alt="Auto"
                      className="w-24 h-24"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">Uber Auto</p>
                      <p className="text-sm">
                        Affordable and Comfortable Ride in Uber Auto
                      </p>
                    </div>
                    {price ? (<div className='px-4 font-bold'>&#8377;{price['auto'].toFixed(2)}</div>):(<></>)}
                  </div>
                </div>
              </button>
            </div>
            <div className="p-2 items-center flex justify-center rounded-xl bg-slate-100">
              <button className="p-3 bg-black text-white rounded-2xl font-semibold" onClick={handleonGo}>
                Confirm Ride
              </button>
            </div>
          </div>)
        )}
        <div className="px-1 hidden md:block">
          <img
            src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613584766993-KD4G7Q9XDVVHE7EFE1JF/Two+Maps+-+Grayscale.png"
            alt="Map"
            className="h-[420px] w-[700px]"
          />
        </div>
      </div>
    </div>
  );
};
export default Ride;