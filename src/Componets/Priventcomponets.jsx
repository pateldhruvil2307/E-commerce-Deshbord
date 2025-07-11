import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Priventcomponets=()=>{
    
        const auth=localStorage.getItem("user")

        return auth?<Outlet/> : <Navigate to ="/signup"/>
    
}

export default Priventcomponets;