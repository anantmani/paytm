import { BottomWarning } from "./Components/BottomWarning"
import { Button } from "./Components/Button"
import { Heading } from "./Components/Heading"
import { SubHeading } from "./Components/SubHeading"
import { InputBox } from "./Components/InputBox"
import { useNavigate} from "react-router-dom"
import { useState } from "react"
function Signin() {
 
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const payload = {
        username : email,
        password: password,
    }
    const onButtonClick = async() =>{
         try {
            const response = await fetch("http://localhost:3000/api/v1/users/singin", {
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify(payload),
            });
            if(!response.ok)
            {
                throw new Error(`HTTP error! ${response.status}`);

            }
            const res = await response.json();
            console.log(res);
            localStorage.setItem("token",res.jwt)
            navigate('/dashboard')
         } catch (error){
            console.log(error);
         }
         
    }
    return <div> <div><Heading label="Sign In"></Heading>
    <SubHeading label="enter your information to enter your account"></SubHeading>
    <InputBox label = "Email" placeholder = "anant@gmail.com" onchange={setEmail}></InputBox>
    <InputBox label = "password" placeholder = "1232" onchange={setPassword}></InputBox>
    <Button lablel = "Signin" onClick={onButtonClick}></Button>
    <BottomWarning label = "Don't  have a account?" buttonText = "Sign up" to = {'/signup'}></BottomWarning>
    </div></div>
}

export default Signin