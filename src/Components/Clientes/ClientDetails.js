import React, { useEffect, useState } from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { CLIENT} from '../Helpers/helper';
import ClientInfo from './ClientInfo';

function ClientDetails() {
    const { id } = useParams();

    const initialState = {
        tab: {
            operations: true,
            mineria: false,
            modificaciones: false
        },
    }

    const [state, setState] = useState(initialState)
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
                const res = await fetch(CLIENT + id, options),
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

    const onHandleClick = e => {
        e.preventDefault()

        setState(prev => {
            const updated = {}
            Object.keys(prev.tab).forEach(item => {
                updated[item] = false
            })
            updated[e.target.id] = true
            return {
                tab: {
                    ...updated,
                }

            }
        })
    }

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
                        <section className='mt-3'>
                            <Nav variant="tabs" defaultActiveKey="operations">
                                <Nav.Item >
                                    <Nav.Link id='operations' onClick={e => onHandleClick(e)} eventKey="operations">Operaciones</Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link id='mineria' onClick={e => onHandleClick(e)} eventKey="mineria">Mineria</Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link id='modificaciones' onClick={e => onHandleClick(e)} eventKey="modificaciones">Modificaciones</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </section>
                        <section className='tabcontent'>
                            <div id="operations" className={state?.tab?.operations ? 'content-tab' : 'content-tab is-hidden'}>
                                {state?.tab?.operations &&
                                    <>Tabla/info de operaciones del cliente</>
                                }
                            </div>
                            <div id="mineria" className={state?.tab?.mineria ? 'content-tab' : 'content-tab is-hidden'}>
                                {state?.tab?.mineria &&
                                    <>Tabla/info del cliente referente a mineria</>
                                }
                            </div>
                            <div id="modificaciones" className={state?.tab?.modificaciones ? 'content-tab' : 'content-tab is-hidden'}>
                                {state?.tab?.modificaciones &&
                                    <>Tabla/info referente a modificaciones del cliente</>
                                }
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ClientDetails