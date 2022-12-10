import React, { Fragment, useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from './Context/DataContext';
import isBuyingImgBtc from '../../assets/images/btc.jpeg'
import isBuyingImgUsdt from '../../assets/images/usdt.jpeg'
import OperationsConfirmed from '../Operaciones/OperationsBuyConfirmed';
import OperationsBuyConfirmed from '../Operaciones/OperationsBuyConfirmed';
import OperationsSaleConfirmed from '../Operaciones/OperationsSaleConfirmed';


const ModalContainer = (props) => {

    console.log(props);
    const [show, setShow] = useState(false);
    const handleClose = () => setModalStatus(false);
    const handleShow = () => setShow(true);
    const { modalstatus, setModalStatus, isSelling, setIsSelling } = useContext(DataContext)

    const subjectTitle = props?.modalType === 'Delete' ? 'ELIMINAR' : props?.modalType === 'Block' ? 'BLOQUEAR' : props?.modalType === 'Edit' ? "EDITAR" : 'AÑADIR'
    const title = props?.title


    return (
        <Fragment>
            <Modal show={modalstatus} onHide={handleClose} backdrop="static" size="md" aria-labelledby="contained-modal-title-vcenter" centered >
                {
                    props?.modalType === 'Login' ? '' :
                        <Modal.Header closeButton>
                            <Modal.Title className='modaltitle' >{subjectTitle + " "}{title}</Modal.Title>
                        </Modal.Header>
                }
                {
                    props.isBuying === true ? (
                        <OperationsBuyConfirmed props={props} />
                    ) : ''
                }{
                    isSelling ? (
                        <OperationsSaleConfirmed props={props} />
                    ) : ''
                }
                <Modal.Body>
                    {props?.form}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}


export default (ModalContainer);