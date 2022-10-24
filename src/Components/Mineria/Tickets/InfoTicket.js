import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { GET_USER_BY_ID } from '../../Helpers/helper';

const InfoTicket = (props) => {

    const { data } = props
    const [userData, setUserData] = useState('')
    const [isLoading, setIsLoading] = useState(false)


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

        /**funcion para acceder a datos de usuario  */
        const getUserById = async () => {
            try {
                const res = await fetch(GET_USER_BY_ID + data.id_user, options),
                    json = await res.json()
                setUserData(json)
            } catch (error) {
                console.log(error);
            }
        }

        getUserById()

    }, []);


    console.log(userData);



    return (
        <div className='d-flex'>
            {data &&
                <>
                    <Col md={9}>
                        <Row className='mt-3'>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Identificador</label>
                                    <input className='inputshow' value={data.id_ticket} disabled />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk'>Descripción ticket:</label>
                                    <input className='inputshow' value={data.description_ticket} disabled />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Maquina</label>
                                    <input className='inputshow' value={data.id_machine} disabled />
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Creado por</label>
                                    <input className='inputshow' value={data.id_user} disabled />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk'>Estado ticket:</label>
                                    <input className='inputshow' value={data.status} disabled />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Creado el </label>
                                    <input className='inputshow' value={data.created_at} disabled />
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Actualizado el </label>
                                    <input className='inputshow' value={data.updated_at} disabled />
                                </div>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </Col>
                    <Col md={3}>
                        holi
                    </Col></>
            }
        </div>

    )
}

export default InfoTicket