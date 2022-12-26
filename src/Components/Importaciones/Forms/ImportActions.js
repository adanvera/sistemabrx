import React, { Fragment, useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'

const ImportActions = (props) => {

    const { sidebarStatus, setSidebarStatus, modalstatus, setModalStatus, setDataIdRow, modalType, setModalType, setHandeModalForm, subPermissons, setSubPermissons } = useContext(DataContext)


    /**seteamos las variables respectivas dependiendo de que 
     * opcion seleccionemos
     */
    const handleOnClick = (e, btn) => {
        e.preventDefault()
        setModalStatus(true)
        const dataIDc = props?.data?.id_importacion
        setModalType('Delete')

        if (btn === '_btnDelete') {
            setModalType('Delete')
            setHandeModalForm('Importación')
            setDataIdRow(dataIDc)
        }
    }

    const verifySubPermissons = (subPermissons) => {
        if (subPermissons === 1) {
            return (
                <div className="actionstwo d-grid mt-3">
                    <div className="delete-btn tkt d-flex" id='_btnDeletetkt' onClick={(e) => handleOnClick(e, '_btnDelete')} >
                        <span>Eliminar importación  </span>
                        <div>
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="actionstwo d-grid mt-3 notallowed">
                    <div className="delete-btn tkt d-flex btnadd-not-allowed" id='_btnDeletetktd' >
                        <span>Eliminar importación  </span>
                        <div>
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <div className='tiktop'>
                <Col className='headtiket d-flex'>
                    <div>
                        <h6>Acciones</h6>
                    </div>
                </Col>
                {
                    verifySubPermissons(subPermissons)
                }
            </div>
        </Fragment>
    )
}

export default ImportActions