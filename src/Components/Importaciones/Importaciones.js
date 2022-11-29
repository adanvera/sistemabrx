import React, { useContext } from 'react'
import { DataContext } from '../Commons/Context/DataContext'


function Importaciones() {
  const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
  return (
    <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >adan</div>
  )
}

export default Importaciones