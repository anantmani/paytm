import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Send from "../Send";

export const Users = () => {
    
    const [users, setUsers] = useState([{

    }]);

    const [serachTerm,setSearchTerm] = useState("")
    useEffect(()=>{
    const fetchData = async()=>{
    const url = new URL("http://localhost:3000/api/v1/users/user/bulk")
    url.searchParams.append("filter", serachTerm)
    const res = await fetch(url);
    const result = await res.json();
    setUsers(result.user)
    console.log(users)
    }
    fetchData()}
,[serachTerm])
   
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange = {(e)=>{setSearchTerm(e.target.value) }} value = {serachTerm}></input>
        </div>
        <div>
           {users.map(user => <User user={user} />)} 
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();
    
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
          
            <Button label={"Send Money"} onClick={()=>{navigate('/send?name='+`${user.username}`)}}/>
         
        </div>
    </div>
}