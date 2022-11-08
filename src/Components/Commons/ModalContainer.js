import React, { Fragment, useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from './Context/DataContext';

const ModalContainer = (props) => {

    console.log(props);
    const [show, setShow] = useState(false);
    const handleClose = () => setModalStatus(false);
    const handleShow = () => setShow(true);
    const { modalstatus, setModalStatus } = useContext(DataContext)

    const subjectTitle = props?.modalType === 'Delete' ? 'ELIMINAR' : props?.modalType === 'Block' ? 'BLOQUEAR' : props?.modalType === 'Edit' ? "EDITAR" : 'AÑADIR'
    const title = props?.title


    return (
        <Fragment>
            <Modal show={modalstatus} onHide={handleClose} backdrop="static" size="md" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title className='modaltitle' >{subjectTitle + " "}{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props?.form}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}


export default (ModalContainer);