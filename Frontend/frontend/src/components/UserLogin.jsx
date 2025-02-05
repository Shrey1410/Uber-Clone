import React, { useState , useEffect } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { toast } from 'react-toastify'
const UserLogin = () => {
  const {user, setUser} = useContext(UserDataContext)
  const Navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const submitLogin = async (e) =>{
    e.preventDefault()
    const obj = {
      email : email,
      password : password
    }
    try{
    const res = await axios.post('http://localhost:8000/user/login', obj,{
      withCredentials: true,
    })
    setEmail('')
    setpassword('')
    const expiretime = new Date().getTime() + 1*60*60*1000;
    setUser(res.data[0])
    localStorage.setItem('user',JSON.stringify({
      ...res.data[0],
      expire : expiretime
    }))
    Navigate('/ride')
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
      toast.error(`Logged In failed.${error.response.data.message}`,{
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
    if(user){
      Navigate('/ride')
    }
  })
  return(
    <div>
          <Navbar/>
          <div className="lg:pt-20 lg:px-80 lg:pb-5 pt-10 px-10 pb-10">
            <div className="shadow-xl lg:p-5 p-3 bg-slate-50 rounded-2xl flex flex-col">
              <p className="mx-auto font-bold text-3xl lg:text-4xl p-1">Login As User</p>
              <form action="" className="flex flex-col p-2" onSubmit={submitLogin}>
                <div className='flex flex-col'>
                <p className='font-semibold text-xl'>What's your Email?</p>
                <input
                  type="email"
                  className="bg-slate-200 p-3 my-4 rounded-xl w-full"
                  value = {email}
                  placeholder="Email" onChange={(e)=>{
                    e.preventDefault()
                    setEmail(e.target.value)
                  }}
                />
                </div>
                <div>
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
                </div>
                <button
                  type="submit"
                  className="bg-black text-white mx-auto p-3 rounded-xl text-lg"
                >
                  Login as user
                </button>
              </form>
              <div className="flex items-center mt-4">
            <div className="border-t border-gray-500 flex-grow"></div>
            <Link className="mx-4 text-gray-500 hover:text-gray-600" to='/signup'>Sign up As User</Link>
            <div className="border-t border-gray-500 flex-grow"></div>
            </div>
            </div>
          </div>
          <div className='flex justify-center'>
          <div className='lg:px-80 lg:pb-5'>
            <Link to='/captain-login' className='bg-black text-white rounded-xl p-3'>Login in to Drive</Link>
          </div>
          </div>
        </div>
  )
}
export default UserLogin