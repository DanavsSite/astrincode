import React,{useState,useEffect} from 'react'
import { NavLink, useLocation,useNavigate } from 'react-router-dom'
import '../navbar.css'
import {Button, IconButton} from '@mui/material'
import { MdAccountCircle } from 'react-icons/md'
function Navbar() {
  const [loggedIn,setLoggedIn] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
		const token = localStorage.getItem('token')
		if(token){
			setLoggedIn(true)
		}else{
			setLoggedIn(false)
		}
	}, [])
  return (
    <div className='bg-orange-300 fixed w-screen justify-center align-center flex-1' style={{height:'7.5vh',display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:1,overflow:'auto'}}>
       <span className='text-2xl font-bold ml-5'>Astrin</span>
       <ul>
   
        
        <li className='relative inline m-5 text-indigo-900 navAfter'><NavLink to={'/'}>Home</NavLink></li>
        {loggedIn ? <>
       <li className='relative inline m-5 text-indigo-900 navAfter'><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
        </>
       
         : null}
          {loggedIn ? <>
          <IconButton sx={{marginRight:'1.25rem'}}><MdAccountCircle color='rgb(49 46 129)'/></IconButton>
          </>
           : <span className='relative inline m-5 text-indigo-900 navAfter'><NavLink to={'/login'}>Login</NavLink> </span>}
       </ul>
    </div>
  )
}

export default Navbar