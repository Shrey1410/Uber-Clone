import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './components/UserLogin'
import UserSignup from './components/UserSignup'
import Captainlogin from './components/Captainlogin'
import CaptainSignup from './components/CaptainSignup'
import Start from './pages/Start'
import Ride from './components/Ride'
import Drive from './components/Drive'
import ConfirmRide from './components/ConfirmRide'
import { ToastContainer } from 'react-toastify'
import Ridepopup from './components/Ridepopup'
import OnAcceptRide from './components/OnAcceptRide'
import OnStartRide from './components/OnStartRide'
import OnDriver from './components/OnDriver'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<Captainlogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/drive' element={<Drive/>}/>
        <Route path='/ride' element={<Ride/>}/>
        <Route path='/confirm-ride' element={<ConfirmRide/>}/>
        <Route path='/ridepopup' element={<Ridepopup/>}></Route>
        <Route path='/onacceptride' element={<OnAcceptRide/>}></Route>
        <Route path='/startride' element={<OnStartRide/>}></Route>
        <Route path='/ongetting-driver' element={<OnDriver/>}></Route>
      </Routes>
    </div>
  )
}

export default App
