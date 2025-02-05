import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext'
import { toast } from 'react-toastify';
const Dropdownmenu = (props) => {
  const [suggestions, setSuggestions] = useState([])
  useEffect(()=>{
    const fetchSuggestions = async () => {
      try{
        if(props.showdropdown && props.data.length>=1){
          const response = await axios.get(
            "http://localhost:8000/map/get-suggestions",
            {
              params: { input: props.data },
              withCredentials: true
            }
          )
          const placeDescriptions = response.data.map((item) => item.description)
          setSuggestions(placeDescriptions)
        }
      }catch (error){
        toast.error(`${error.response.data.message}`,{
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        })
      }
    }
    fetchSuggestions()
  },[props.data, props.showdropdown])
  return (
    <div>
      <div className="absolute bg-white border rounded-lg shadow-md mt-1 w-full max-h-40 overflow-y-auto z-10">
        {suggestions.map((item, index) => (
          <p
            key={index}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onMouseDown={() => {
              props.setdata(item)
              props.setdropdown(false)
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}
export default Dropdownmenu