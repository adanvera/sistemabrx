import React, { Fragment, useContext } from 'react'
import { DataContext } from '../../Commons/Context/DataContext'

const UserActions = (props) => {

    const { modalType, setModalType } = useContext(DataContext)

    /**seteamos las variables respectivas dependiendo de que 
     * opcion seleccionemos
     */
    const handleOnClick = (e, btn) => {
        e.preventDefault()

        if (btn === '_btnEdit') {
            setModalType('Edit')
        }
        if (btn === '_btnDelete') {
            setModalType('Delete')
        } else if (btn === '_btnBloq') {
            setModalType('Block')
        }

    }

    return (
        <Fragment>
            <div className="actionstwo d-flex">
                <div className="edit-btn" id='_btnEdit' onClick={(e) => handleOnClick(e, '_btnEdit')}><ion-icon dataid={props?.dataID} name="create-outline"></ion-icon></div>
                <div className="delete-btn" id='_btnBloq' onClick={(e) => handleOnClick(e, '_btnDelete')} ><ion-icon dataid={props?.dataID} name="ban-outline"></ion-icon></div>
                <div className="delete-btn" id='_btnDelete' onClick={(e) => handleOnClick(e, '_btnDelete')} ><ion-icon dataid={props?.dataID} name="trash-outline"></ion-icon></div>
            </div>
        </Fragment>
    )
}

export default UserActions