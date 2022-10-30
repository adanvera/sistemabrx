import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';

const InfoTicket = (props) => {

    const { data } = props
    const [userData, setUserData] = useState('')
    const [isLoading, setIsLoading] = useState(false)


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
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Actualizado el </label>
                                    <input className='inputshow' value={data.url_image} disabled />
                                </div>
                            </Col>
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