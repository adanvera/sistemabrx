import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';

const ClientInfo = (props) => {

    const { data } = props
    const [userData, setUserData] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    console.log("Recibo el dato",data);

    return (
        <div className='d-flex'>
            {data &&
                <>
                    <Col md={9}>
                        <Row className='mt-3'>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Codigo</label>
                                    <input className='inputshow' value={data.id_client} disabled />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk'>Nombre y Apellido</label>
                                    <input className='inputshow' value={data.name + " "+data.last_name} disabled />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Direccion</label>
                                    <input className='inputshow' value={data.address} disabled />
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Documento</label>
                                    <input className='inputshow' value={data.document} disabled />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk'>Telefono</label>
                                    <input className='inputshow' value={data.phone} disabled />
                                </div>
                            </Col>
                            
                        </Row>
                        
                    </Col>
                    <Col md={3}>
                        
                    </Col></>
            }
        </div>

    )
}

export default ClientInfo