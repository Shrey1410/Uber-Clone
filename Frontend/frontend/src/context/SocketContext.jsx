import { createContext, useEffect } from "react";
export const SocketContext = createContext()
import { io } from "socket.io-client"
const socket = io('http://localhost:8000')
const SocketProvider = ({children}) => {
    useEffect(()=>{
        socket.on('connect', ()=>{
            console.log("Connected to server")
        })
        socket.on("disconnect", ()=>{
            console.log("Disconnected to server")
        })
    }, [])
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketProvider