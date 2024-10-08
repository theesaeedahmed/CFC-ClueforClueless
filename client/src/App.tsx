import { Routes,Route } from "react-router-dom"

export default function App() {
  return (

    <Routes>
      <Route path="/" element={<div>Home page</div>}/>
      <Route path="/login" element={<div>Home login page</div>}/>
      <Route path="/signup" element={<div>Home page</div>}/>
    </Routes>
  )
}


