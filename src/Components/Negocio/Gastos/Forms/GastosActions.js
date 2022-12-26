import React from 'react'
import { Fragment } from 'react'
import { useContext } from 'react'
import { DataContext } from '../../../Commons/Context/DataContext'

const GastosActions = (props) => {
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
        }

    }

    const verifySubPermissons = (subPermissons) => {
        if (subPermissons === 1) {
            return (
                <div className="actionstwo d-flex">
                    <div className="edit-btn" id='_btnEdit' onClick={(e) => handleOnClick(e, '_btnEdit')}><ion-icon dataid={props?.dataID} name="create-outline"></ion-icon></div>
                    <div className="delete-btn" id='_btnDelete' onClick={(e) => handleOnClick(e, '_btnDelete')} ><ion-icon dataid={props?.dataID} name="trash-outline"></ion-icon></div>
                </div>
            )
        } else {
            return (
                <div className="actionstwo d-flex">
                    <div className="edit-btn" id='_btnEditd'><ion-icon dataid={props?.dataID} name="create-outline"></ion-icon></div>
                    <div className="delete-btn" id='_btnDeleted' ><ion-icon dataid={props?.dataID} name="trash-outline"></ion-icon></div>
                </div>
            )
        }
    }

    return (
        <Fragment>
            {
                verifySubPermissons(subPermissons)
            }
        </Fragment>
    )
}

export default GastosActions