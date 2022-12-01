import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../Commons/Context/DataContext'

function Negocio() {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            modulo negocio
        </div>

    )
}

export default Negocio