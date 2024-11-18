import { useEffect, useState } from "react"
import { Appbar } from "./Components/Appbar"
import { Balance } from "./Components/Balance"
import { Users } from "./Components/Users"

function Dashboard() {
    
    const [balance,setBalance] = useState(0);
    useEffect(()=>{
        const fetchBalance = async()=>{
            const token = localStorage.getItem("token");
        const res = await fetch('http://localhost:3000/api/v1/account/balance',
            {
                method : "GET",
                headers :{
                    "Content-Type" :"application/json",
                    Authorization: `Bearer ${token}`
                },
            }
        )
        if(!res.ok)
            throw new Error('not found');
        const data = await res.json();

        console.log(data.balance);
        setBalance(data.balance);
        }
fetchBalance()
    })
    return <div><Appbar></Appbar>
    <Balance value = {balance}></Balance>
    <Users></Users>
    </div>
}

export default Dashboard