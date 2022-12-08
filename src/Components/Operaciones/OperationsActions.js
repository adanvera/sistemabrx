import React, { Fragment, useContext } from 'react'
import { DataContext } from '../Commons/Context/DataContext'



const OperationsActions = (props) => {
console.log("IN OperationsActions");
    const { modalType, setModalType } = useContext(DataContext)
    const { modalStatus, setModalStatus } = useContext(DataContext)
    const { setDataIdRow } = useContext(DataContext)

    /**seteamos las variables respectivas dependiendo de que 
     * opcion seleccionemos
     */
    const handleOnClick = (e, btn) => {

        e.preventDefault()

    }


    return (
        <Fragment>
            <div className="actionstwo d-flex">
               {/*  <ProtectedComponent allowedRoles={['SEGURIDAD']}> */}
                    <div className="edit-btn" id='_btnEdit' onClick={(e) => handleOnClick(e, '_btnEdit')}>descargar comprobante</div>
                    
                {/* </ProtectedComponent> */}
            </div>
        </Fragment>
    )
}

export default OperationsActions