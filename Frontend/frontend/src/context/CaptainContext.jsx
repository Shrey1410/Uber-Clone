import { createContext, useState, useEffect } from "react"
export const CaptainDataContext = createContext();
const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState(() => {
        const storedCaptain = localStorage.getItem('captain');
        return storedCaptain ? JSON.parse(storedCaptain) : null;
    })
    useEffect(()=>{
        const now = new Date().getTime()
        const storedCaptain = JSON.parse(localStorage.getItem('captain'));
        if(captain && storedCaptain.expire<=now){
            localStorage.removeItem('captain')
        }
    })
    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};
export default CaptainProvider;