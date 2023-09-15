import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet, Route } from 'react-router-dom'

function PrivateRoute() {
    const {user} = useContext(AuthContext)
  return (
        user? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoute