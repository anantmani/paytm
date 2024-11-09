import { BrowserRouter, Routes } from "react-router-dom"
import Signup from "./Signup"
import Dashboard  from "./Dashboard"
import Signin from "./signin"
import Send from "./Send"
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes path="/signup" element={<Signup />} />
        <Routes path="/signin" element={<Signin />} />
        <Routes path="/dashboard" element={<Dashboard />} />
        <Routes path="/send" element={<Send />} />
      </BrowserRouter>
    </div>
  );
}

export default App
