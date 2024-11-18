import { BottomWarning } from "./Components/BottomWarning"
import { Button } from "./Components/Button"
import { Heading } from "./Components/Heading"
import { SubHeading } from "./Components/SubHeading"
import { InputBox } from "./Components/InputBox"
import { useState } from "react"
import Signin from "./Signin"
import { useNavigate } from "react-router-dom"
function Signup() {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const payload = {
        username : email,
        password: password,
        firstName : firstName,
        lastName :lastName
    }
    const onButtonClick = async() =>{
         try {
            const response = await fetch("http://localhost:3000/api/v1/users/signup", {
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
    return (
    <div><Heading label="Sign Up"></Heading>
    <SubHeading label="enter your information to create a account"></SubHeading>
    <InputBox label = "First Name" placeholder = "anant" onchange = {setFirstName} value = {firstName}></InputBox>
    <InputBox label = "Last Name" placeholder = "tiwari" onchange = {setLastName} value = {lastName}></InputBox>
    <InputBox label = "Email" placeholder = "anant@gmail.com" onchange = {setEmail} value = {email}></InputBox>
    <InputBox label = "password" placeholder = "1232" onchange = {setPassword} value = {password}></InputBox>
    <Button label = "Signup" onClick={onButtonClick}></Button>
    <BottomWarning label = "Already have a account?" buttonText = "Sign in" to = {"/signin"}></BottomWarning>
    </div>)
}

export default Signup