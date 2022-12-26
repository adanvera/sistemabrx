import React, { Fragment, useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'

const MiningMachineActions = (props) => {

    const { sidebarStatus, setSidebarStatus, modalstatus, setModalStatus, setDataIdRow, modalType, setModalType } = useContext(DataContext)

    /**seteamos las variables respectivas dependiendo de que 
     * opcion seleccionemos
     */
    const handleOnClick = (e, btn) => {
        e.preventDefault()
        setModalStatus(true)
        const dataIDc = props?.data?.id_ticket

        if (btn === '_btnDelete') {
            setModalType('Delete')
            setDataIdRow(props?.data?.id_machine)
        }

        if (btn === '_btnAlta') {
            setModalType('Alta')
        }

        if (btn === '_btnBaja') {
            setModalType('Baja')
        }

    }


    const minerStatus = Number(props?.data?.status)

    const showActions = (status) => {

        if (status === 0) {
            return (
                <div className="actionstwo d-grid mt-2">
                    <div className="delete-btn tkt d-flex" id='_btnBaja' onClick={(e) => handleOnClick(e, '_btnBaja')} >
                        <span>Dar de baja a la maquina</span>
                        <div className='ml-2' >
                            <ion-icon name="close-circle-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            )
        }

        if (status !== 0) {
            return (
                <div className="actionstwo d-grid mt-3">
                    <div className="delete-btn tkt d-flex" id='_btnAlta' onClick={(e) => handleOnClick(e, '_btnAlta')} >
                        <span>Dar de alta a la maquina</span>
                        <div className='ml-2'>
                            <ion-icon name="checkmark-done-circle-outline"></ion-icon>
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
                    showActions(minerStatus)
                }
                {/* <div className="actionstwo d-grid mt-2">
                    <div className="delete-btn tkt d-flex" id='_btnDeletetkt' onClick={(e) => handleOnClick(e, '_btnDelete')} >
                        <span>Eliminar minero  </span>
                        <div className='ml-2'>
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                    </div>
                </div> */}
            </div>
        </Fragment>
    )
}

export default MiningMachineActions