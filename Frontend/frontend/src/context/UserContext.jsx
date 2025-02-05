import { createContext, useState, useEffect } from "react"
export const UserDataContext = createContext();
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })
    useEffect(()=>{
        const now = new Date().getTime()
        const storeditem = localStorage.getItem('user')
        const storedUser = JSON.parse(storeditem)
        if(storedUser && storedUser.expire<=now){
            localStorage.removeItem('user')
        }
    })
    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
};
export default UserProvider;