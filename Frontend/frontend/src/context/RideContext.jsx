import { createContext, useState  } from "react";
export const RideContext = createContext()
const RideProvider = ({children}) => {
    const [vechiletype, setVechiletype] = useState("car");
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [amount, setAmount] = useState(0)
    return (
        <RideContext.Provider value={{vechiletype, setVechiletype, pickup, setPickup, dropoff, setDropoff, amount, setAmount}}>
            {children}
        </RideContext.Provider>
    )
}
export default RideProvider