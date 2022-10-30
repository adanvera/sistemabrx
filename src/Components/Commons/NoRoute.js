import React from 'react'
import { Navigate } from "react-router-dom";


const NoRoute = props => {
    return (
        <Navigate to="login" />
    )
}

export default NoRoute;
