import React, { Fragment, useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from './Context/DataContext';

const ModalContainer = (props) => {

    console.log("Modal: ",props);

    const [show, setShow] = useState(false);
    const handleClose = () => setModalStatus(false);
    const handleShow = () => setShow(true);

    const { modalstatus, setModalStatus } = useContext(DataContext)

    return (
        <Fragment>
            <Modal show={modalstatus} onHide={handleClose} backdrop="static" size="md" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title >{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props?.form}
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}


export default (ModalContainer);