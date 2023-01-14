import React from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import Navbar from "../components/Navbar";
import Dashboard from "./root";
import Home from "./Home";
import Editor from "./Editor";
import {AnimatePresence} from 'framer-motion'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
 
function AnimRoutes() {
  const location = useLocation()
  return (
    <>
    <div style={{overflow:'hidden',userSelect:'none'}}>
<QueryClientProvider client={queryClient}>

    <AnimatePresence>

    
<Navbar/>
<Routes>

  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/edit/:id" element={<Editor/>} />

</Routes>
    </AnimatePresence>
</QueryClientProvider>
    </div>
</>
  )
}

export default AnimRoutes