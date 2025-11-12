import { Route, Router, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

         


          
      </Routes>
    
     
    </>
  )
}

export default App
