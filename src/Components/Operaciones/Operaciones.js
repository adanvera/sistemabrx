import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../Commons/Context/DataContext";
import Select from "../Commons/Select";
import InfoCliente from "./InfoCliente";

const Operaciones = () => {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const currency = [{ label: "USD", value: 1 }, { label: "GS", value: 0 }]




    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="">
                <Col md={5}>
                    <Row className="is-3 text-al-ini titlemodule">
                        <Col md={12} >
                            <h5 className="title-details ml-5 pt-3">Operaciones</h5>
                            <InfoCliente />
                        </Col>
                    </Row>
                    <Row className="is-3 text-al-ini titlemodule">
                        <Col md={12} >
                            <h5 className="title-details ml-5 pt-3">Datos de operacion</h5>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Moneda</label>
                                </div>
                            </Col>
                            <select>
                                {currency.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <Col>
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Moneda transaccion</label>
                                    <input className='inputshow' value={"mondea"}  />
                                
                                </div>
                            </Col>

                        </Col>
                    </Row>
                </Col>

            </Container>
        </div>

    )





}

export default Operaciones