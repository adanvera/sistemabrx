import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { DataContext } from '../Commons/Context/DataContext';

const DetailsImportation = (props) => {
    const { id } = useParams();
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            hello
        </div>
    )
}

export default DetailsImportation