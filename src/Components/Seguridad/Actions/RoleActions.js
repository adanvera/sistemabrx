import React, { Fragment, useContext } from 'react'
import { DataContext } from '../../Commons/Context/DataContext'
import ProtectedComponent from '../../Commons/ProtectedComponent';

const RoleActions = (props) => {

    const { modalType, setModalType } = useContext(DataContext)
    const { modalStatus, setModalStatus } = useContext(DataContext)
    const { setDataIdRow } = useContext(DataContext)
    const { subPermissons, setSubPermissons } = useContext(DataContext)

    /**seteamos las variables respectivas dependiendo de que 
     * opcion seleccionemos
     */
    const handleOnClick = (e, btn) => {
        e.preventDefault()
        setModalStatus(true)
        const dataIDc = e.target.getAttribute("dataid")

        if (btn === '_btnEdit') {
            setModalType('Edit')
            setDataIdRow(dataIDc)
        }
        if (btn === '_btnDelete') {
            setModalType('Delete')
            setDataIdRow(dataIDc)
        } else if (btn === '_btnBlock') {
            setModalType('Block')
        }

    }

    const verifySubPermissons = (subPermissons) => {
        if (subPermissons === 1) {
            return (
                <>
                    <div className="edit-btn" id='_btnEdit' onClick={(e) => handleOnClick(e, '_btnEdit')}><ion-icon dataid={props?.dataID} name="create-outline"></ion-icon></div>
                    <div className="delete-btn" id='_btnDelete' onClick={(e) => handleOnClick(e, '_btnDelete')} ><ion-icon dataid={props?.dataID} name="trash-outline"></ion-icon></div>
                </>
            )
        } else {
            return (
                <>
                    <div className="edit-btn" id='_btnEditd' ><ion-icon dataid={props?.dataID} name="create-outline"></ion-icon></div>
                    <div className="delete-btn" id='_btnDeleted' ><ion-icon dataid={props?.dataID} name="trash-outline"></ion-icon></div>
                </>
            )
        }
    }

    return (
        <Fragment>
            <div className="actionstwo d-flex">
                <ProtectedComponent allowedRoles={['SEGURIDAD']}>
                    {
                        verifySubPermissons(subPermissons)
                    }
                </ProtectedComponent>
            </div>
        </Fragment>
    )
}

export default RoleActions