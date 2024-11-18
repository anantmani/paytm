import { BrowserRouter, Routes,Route } from "react-router-dom"
import Signup from "./Signup"
import Dashboard  from "./Dashboard"
import Signin from "./Signin"
import Send from "./Send"

function App() {

  return (
   
    <div>
     <BrowserRouter>
     <Routes>
      <Route path = '/signup' element  = {<Signup/>}/>
      <Route path = '/signin' element  = {<Signin/>}/>
      <Route path = '/dashboard' element  = {<Dashboard/>}/>
      <Route path = '/send' element  = {<Send/>}/>
     
     </Routes>
     </BrowserRouter>
 
      
    </div>
  
  );
}

export default App
