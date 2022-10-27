import React, { Fragment, useContext } from 'react'
import { DataContext } from '../../Commons/Context/DataContext'

const ClientActions = (props) => {

    const { modalType, setModalType } = useContext(DataContext)

    /**seteamos las variables respectivas dependiendo de que 
     * opcion seleccionemos
     */
    const handleOnClick = (e, btn) => {
        e.preventDefault()

        if (btn === '_btnEdit') {
            setModalType('Edit')
        } else if (btn === '_btnDelete') {
            setModalType('Delete')
        }

    }


    return (
        <Fragment>
            <div className="actionstwo d-flex">
                <div className="edit-btn" id='_btnEdit' onClick={(e) => handleOnClick(e, '_btnEdit')}><ion-icon dataid={props?.dataID} name="create-outline"></ion-icon></div>
                <div className="delete-btn" id='_btnDelete' onClick={(e) => handleOnClick(e, '_btnDelete')} ><ion-icon dataid={props?.dataID} name="trash-outline"></ion-icon></div>
            </div>
        </Fragment>
    )
}

export default ClientActions