
import './App.css'
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';
import { Route,Routes } from 'react-router-dom';


function App() {

  return (
      <div>
        
      <Button onClick={()=>toast.success("Clciked")}>Click me</Button>
      <Routes>
        <Route path="/" element={<div className='bg-red-500'>Home</div>}/>
        <Route path="/about" element={<div className='bg-blue-500'>About</div>}/>
      </Routes>
    </div>
  );
}

export default App
