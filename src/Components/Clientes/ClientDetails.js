import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { GET_CLIENTS } from '../Helpers/helper';
import ClientInfo from './ClientInfo';

function ClientDetails() {
    const { id } = useParams();
    const [clientData, setClientData] = useState('')
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

        const getClient = async () => {
            try {
                const res = await fetch(GET_CLIENTS+ id, options),
                    json = await res.json()
                /**seteamos loading */
                setIsLoaded(true);
                /**seteamos datos del ticket */
                setClientData(json)
            } catch (error) {
                setIsLoaded(true);
                setError(error);
                console.log(error);
            }
        }

        getClient()

    }, []);

    return (
        <div className="main-content">
            <Container fluid={true} className="">
                <Row>
                    <Col className='headtiket'>
                        <h6>DETALLES DEL CLIENTE</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ClientInfo data={clientData} /> 
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ClientDetails