import React from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
const UserSignup = () => {
  const Navigate = useNavigate()
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email , setEmail] = useState('')
  const [password, setpassword] = useState('')
  const {user , setUser } = useContext(UserDataContext)
  const onSubmit = async (e)=>{
    e.preventDefault()
    const obj = {
      fullname : {
        firstname : firstname,
        lastname : lastname
      },
      email : email,
      password : password,
    }
    try{
    const res =await axios.post('http://localhost:8000/user/register', obj,{
      withCredentials: true,
    })
    setEmail('')
    setfirstname('')
    setlastname('')
    setpassword('')
    setUser(res.data[0])
    const expiretime = new Date().getTime() + 1*60*60*1000;
    localStorage.setItem('user',JSON.stringify({
      ...res.data[0],
      expire : expiretime
    }))
    if(res.status==200){
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
  }
    catch(error){
        toast.error(`Registration failed ${error.response.data.message}`,{
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
    if(user) Navigate('/ride')
  })
  return (
    <div>
        <Navbar/>
            <div className="lg:pt-20 lg:px-80 lg:pb-5 pt-10 px-10 pb-10">
                    <div className="shadow-xl lg:p-5 p-3 bg-slate-50 rounded-2xl flex flex-col">
                      <p className="mx-auto font-bold text-4xl p-1">Sign Up As User</p>
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
                        <button
                          type="submit"
                          className="bg-black text-white mx-auto p-2 rounded-xl text-lg"
                        >
                          Sign up as User
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className='flex justify-center'>
          <div className='lg:px-80 lg:pb-5'>
            <Link to='/captain-signup' className='bg-black text-white rounded-xl p-3'>Sign up to Drive</Link>
          </div>
          </div>
          </div>
  );
}

export default UserSignup
