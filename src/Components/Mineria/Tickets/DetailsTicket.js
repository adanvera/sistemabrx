import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import {  TICKETS } from '../../Helpers/helper';
import InfoTicket from './InfoTicket';

function DetailsTicket() {

    const { id } = useParams();
    const [ticketData, setTicketData] = useState('')
    /**acciones que son utilizadas al cargar datos de
  * las consultas
  */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

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

    const img_url = dataToUse.id_image

    const idCreated = ticketData ? dataToUse.id_user : ''

    return (
        <div className="main-content">
            <Container fluid={true} className="">
                <Row>
                    <Col className='headtiket'>
                        <h6>DETALLES DEL TICKET</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InfoTicket data={dataToUse} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DetailsTicket