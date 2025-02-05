import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { CaptainDataContext } from '../context/CaptainContext'
import { toast } from 'react-toastify'
import { SocketContext } from '../context/SocketContext'
export default function Navbar() {
  const Navigate = useNavigate()
  const [isLoggedin, setIsloggedin] = useState(false) 
  const {user, setUser} = useContext(UserDataContext)
  const {captain, setCaptain} = useContext(CaptainDataContext)
  useEffect(()=>{
    if(user){
      setIsloggedin(true)
    }
    if(captain){
      setIsloggedin(true)
    }
  })
  const logout = async ()=>{
    try{
    const res = await axios.post('http://localhost:8000/user/logout', undefined,{
      withCredentials : true
    })
    if(res.status==200){
      setUser(null)
      setCaptain(null)
      localStorage.removeItem('user')
      localStorage.removeItem('captain')
      setIsloggedin(false)
      toast.success('Successfully logged out!', {
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
  return (
    <div className='sticky top-0 z-50'>
      <div className='bg-black p-1'>
        <nav className='flex justify-between items-center py-1 px-10'>
          <div className='flex items-center'>
            <div className='text-white text-xl'>
                <p className='px-4 rounded-2xl p-2 font-semibold text-2xl text-white mx-2'>Uber</p>
            </div>
            <div className='flex items-center'>
            {user? (<Link to='/ride' className='px-4 rounded-2xl p-2 font-semibold text-sm bg-black hover:bg-slate-900 text-white mx-2'>Ride</Link>):(<></>)}
            {captain? (<><Link to='/drive' className='px-4 rounded-2xl p-2 font-semibold text-sm bg-black hover:bg-slate-900 text-white mx-2'>Drive</Link>
            <Link to='/ridepopup' className='px-4 rounded-2xl p-2 font-semibold text-sm bg-black hover:bg-slate-900 text-white mx-2'>New Rides</Link></>):(<></>)}
            <Link to='/' className='px-4 rounded-2xl p-2 font-semibold text-sm bg-black hover:bg-slate-900 text-white mx-2'>Home</Link>
            </div>
          </div>
          
            {!isLoggedin ? (
            <div className='text-white items-center hidden md:flex'>
              <Link to='/login' className='px-4 rounded-2xl p-2 font-semibold text-sm bg-black hover:bg-slate-900 text-white mx-2'>Login</Link>
              <Link to='/signup' className='px-4 bg-white rounded-2xl p-2 text-black font-semibold hover:bg-slate-300 text-sm'>Sign up</Link>
            </div>
            ) : (
              <div className='text-white md:flex items-center hidden'>
              <div className='text-white'>
                <button className='px-4 bg-white rounded-2xl p-2 text-black font-semibold hover:bg-slate-300' onClick={logout}>Logout</button>
              </div>
              <Link><i className="ri-account-circle-line px-4 text-4xl"></i></Link>
              </div>
           )} 
        </nav>
      </div>
    </div>
  )
}