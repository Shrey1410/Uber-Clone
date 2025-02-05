import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { toast } from 'react-toastify';
const CaptainSignup = () => {
  const Navigate = useNavigate()
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email , setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [vcolor, setvcolor] = useState('')
  const [vchno, setvchno] = useState('')
  const [capacity, setcapacity] = useState(0)
  const [vtype, setvtype] = useState('')
  const {captain, setCaptain} = useContext(CaptainDataContext)
  const onSubmit = async (e)=>{
    e.preventDefault()
    const obj = {
      fullname : {
        firstname : firstname,
        lastname : lastname
      },
      email : email,
      password : password,
      vehicle: {
        color: vcolor,
        plate: vchno,
        capacity: capacity,
        vechiletypes: vtype
      }
    }
    try{
    const res =await axios.post('http://localhost:8000/captain/register', obj,{
      withCredentials: true,
    })
    setEmail('')
    setfirstname('')
    setlastname('')
    setpassword('')
    setvcolor('')
    setvchno('')
    setcapacity(0)
    setvtype('')
    setCaptain(res.data[0])
    const expiretime = new Date().getTime() + 1*60*60*1000;
    localStorage.setItem('captain',JSON.stringify({
      ...res.data[0],
      expire : expiretime
    }))
    Navigate('/drive')
    toast.success(`${res.data[1].message}`, {
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
        toast.error(`Registration failed.${error.response.data.message}`,{
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
  useEffect(()=>{
    if(captain) Navigate('/drive')
  }, [captain])
  return (
    <div>
        <Navbar />
          <div className="lg:pt-20 lg:px-80 lg:pb-5 pt-10 px-10 pb-10">
            <div className="shadow-xl lg:p-5 p-3 bg-slate-50 rounded-2xl flex flex-col">
              <p className="mx-auto font-bold text-3xl lg:text-4xl p-1">Sign Up As Captain</p>
                <form action="" className="flex flex-col p-2" onSubmit={onSubmit}>
                        <div className="flex flex-col mb-4">
                          <p className=' font-semibold text-xl'>What's your Name?</p>
                          <div className='flex'>
                          <input
                            type="text"
                            className="bg-slate-200 p-3 my-4 rounded-xl w-full mr-4"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e)=>{
                              e.preventDefault()
                              setfirstname(e.target.value)
                            }}
                          />
                          <input
                            type="text"
                            className="bg-slate-200 p-3 my-4 rounded-xl w-full"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e)=>{
                              e.preventDefault()
                              setlastname(e.target.value)
                            }}
                          />
                          </div>
                        </div>
                        <div className='flex flex-col'>
                        <p className='font-semibold text-xl'>What's your Email?</p>
                        <input
                          type="email"
                          className="bg-slate-200 p-3 my-4 rounded-xl w-full"
                          placeholder="Email"
                          value={email}
                            onChange={(e)=>{
                              e.preventDefault()
                              setEmail(e.target.value)
                            }}
                        />
                        </div>
                        <p className='font-semibold text-xl'>Enter Password</p>
                        <input
                          type="password"
                          className="bg-slate-200 p-3 my-4 rounded-xl w-full"
                          placeholder="Password"
                          value={password}
                            onChange={(e)=>{
                              e.preventDefault()
                              setpassword(e.target.value)
                            }}
                        />
                        <div className='flex flex-col'>
                        <p className='font-semibold text-xl'>Vehicle's Information</p>
                        <div className="flex mb-1">
                          <input
                            type="text"
                            className="bg-slate-200 p-3 my-4 rounded-xl w-full mr-4"
                            placeholder="Vehicle Color"
                            value={vcolor}
                            onChange={(e)=>{
                              e.preventDefault()
                              setvcolor(e.target.value)
                            }}
                          />
                          <input
                            type="text"
                            className="bg-slate-200 p-3 my-4 rounded-xl w-full"
                            placeholder="Vehicle No"
                            value={vchno}
                            onChange={(e)=>{
                              e.preventDefault()
                              setvchno(e.target.value)
                            }}
                          />
                        </div>
            
                        <div className="flex mb-4">
                          <input
                            type="number"
                            className="bg-slate-200 p-3 my-4 rounded-xl w-full mr-4"
                            placeholder="Capacity"
                            value={capacity}
                            onChange={(e)=>{
                              e.preventDefault()
                              setcapacity(e.target.value)
                            }}
                          />
                          <select
                            className="bg-slate-200 p-3 my-4 rounded-xl w-full text-gray-400"
                            value={vtype}
                            onChange={(e)=>{
                              e.preventDefault()
                              setvtype(e.target.value)
                            }}
                          >
                            <option value="" disabled>
                              Select Vehicle Type
                            </option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="motorcycle">Motorcycle</option>
                          </select>
                        </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-black text-white w-20 mx-auto p-2 rounded-xl text-lg"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
  );
};

export default CaptainSignup;
