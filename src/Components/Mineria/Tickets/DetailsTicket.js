import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../Commons/Context/DataContext';
import ModalContainer from '../../Commons/ModalContainer';
import { TICKETS } from '../../Helpers/helper';
import TicketActions from '../Actions/TicketActions';
import InfoTicket from './InfoTicket';
import TicketTimeline from './TicketTimeline';


function DetailsTicket() {

    const { id } = useParams();
    const [ticketData, setTicketData] = useState('')
    /**acciones que son utilizadas al cargar datos de
  * las consultas
  */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { modalType, setModalType, dataidrow, setDataIdRow } = useContext(DataContext)

    const initialState = {
        form: 'Ticket',
        title: ''
    }

    const [state, setState] = useState(initialState)

    /** funcion onchange para seteo de form */
    const handleModalForm = (form) => {
        setModalStatus(true)
        setState(prev => {
            return {
                ...prev,
                form: form,
                title: form
            }
        })
    }

    let navigate = useNavigate();

    const handleSubmitDelete = (e) => {
        const id_ticket = dataidrow ? dataidrow : ''
        /**obtenemos el token */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        const deleletTicket = async () => {
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'token': token
                }
            }

            try {
                const res = await fetch(TICKETS + id_ticket, options),
                    json = await res.json();
            } catch (error) {
                console.log(error.msg);
            }
        }
        deleletTicket()
        setModalType('other')
        setModalStatus(false)
        navigate('/tickets')
    }

    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Ticket':
                return (
                    <Form onSubmit={handleSubmitDelete}>
                        <div className='dataIsOk'>
                            <Row className='dataIsOkContent'>
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>¿Estas seguro de eliminar este ticket?</span>
                            </Row>
                            <Row className='addusr mt-3'>
                                <Col id='create'>
                                    <Button type="submit">Aceptar</Button>
                                </Col>
                                <Col id='closeone' className='closee'>
                                    <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                )
        }
    }

    useEffect(() => {

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            },
        }

        const getTicket = async () => {
            try {
                const res = await fetch(TICKETS + id, options),
                    json = await res.json()
                /**seteamos loading */
                setIsLoaded(true);
                /**seteamos datos del ticket */
                setTicketData(json)
            } catch (error) {
                setIsLoaded(true);
                setError(error);
                console.log(error);
            }
        }

        getTicket()

    }, []);

    const dataToUse = ticketData ? ticketData[0] : ''
    const idCreated = ticketData ? dataToUse.id_user : ''
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess('Copied');
        } catch (err) {
            return
        }
    };

    /**accedemos a los comentarios e historiales */
    const commetsToShow = dataToUse ? "[" + dataToUse?.ticket_comments + "]" : ''
    const comments = dataToUse ? JSON.parse(commetsToShow) : ''
    const historialToShow = dataToUse ? "[" + dataToUse?.ticket_historial + "]" : ''
    const historial = dataToUse ? JSON.parse(historialToShow) : ''
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const modal = modalstatus

    if (modalType === 'delete') {

    }

    return (
        <div className={sidebarStatus === 'open' ? 'main-content-tkt' : 'main-content-tkt extend'} >
            {modal && (
                <ModalContainer
                    title={state?.title}
                    form={pickForm()}
                    modalStatus={modal}

                />
            )}
            <Row>
                <Col md={9} className="tiktop ml-1">
                    <Container fluid={true} className="">
                        <Row className='d-grid pt-3 headerdetails'>
                            <Col><div className='colorlink ticketsdetails'> <Link to="/tickets">{"< Tickets"}</Link> </div></Col>
                            <Col className='headtiket d-flex'>
                                <div>
                                    <h6>{dataToUse?.id_ticket} - {dataToUse?.ticket_name}</h6>
                                </div>
                                <div className='text-end clipboard' onClick={() => copyToClipBoard(dataToUse?.ticket_name)} >
                                    <span className='txttd'><ion-icon name="copy-outline"></ion-icon></span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InfoTicket data={dataToUse} />
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={3}>
                    <TicketActions data={dataToUse} />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md={9}>
                    <TicketTimeline data={comments} dataToSend={dataToUse?.ticket_comments} idTicket={id} historial={historial} />
                </Col>
            </Row>
        </div>

    )
}

export default DetailsTicket