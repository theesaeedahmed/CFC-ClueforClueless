import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login"


export default function App() {
  return (

    <Routes>
      <Route path="/" element={<div>Home page</div>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<div>Home page</div>}/>
    </Routes>
  )
}


