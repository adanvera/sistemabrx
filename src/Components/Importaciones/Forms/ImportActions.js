import React, { Fragment, useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'

const ImportActions = (props) => {

    const { sidebarStatus, setSidebarStatus, modalstatus,
        setModalStatus, setDataIdRow, modalType, setModalType , setHandeModalForm} = useContext(DataContext)

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

    return (
        <Fragment>
            <div className='tiktop'>
                <Col className='headtiket d-flex'>
                    <div>
                        <h6>Acciones</h6>
                    </div>
                </Col>
                <div className="actionstwo d-grid mt-3">
                    <div className="delete-btn tkt d-flex" id='_btnDeletetkt' onClick={(e) => handleOnClick(e, '_btnDelete')} >
                        <span>Eliminar importación  </span>
                        <div>
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ImportActions