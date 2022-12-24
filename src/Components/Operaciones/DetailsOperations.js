import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../Commons/Context/DataContext'

function DetailsOperations() {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const {id} = useParams()

    console.log("ID DE LA OPERACION" , id);

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            DetailsOperations
        </div>
    )
}

export default DetailsOperations