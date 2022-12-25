import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'


function FiltroFechaReportes({ fechaDesde, setFechaDesde, setFechaHasta, fechaHasta, handleFilter }) {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)


    return (
        <Row className=''>
            <Col className='' md={4}>
                <label>Fecha desde:</label>
                <Form.Group controlId="duedate" >
                    <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="--/--/--"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                    />

                </Form.Group>
            </Col>
            <Col className='' md={4}>
                <label>Fecha hasta:</label>
                <Form.Group controlId="duedate" >
                    <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="--/--/--"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                    />
                </Form.Group>
            </Col>
            <Col md={2} className="column align mt-3">
                <div className="item-column">
                    <button className="button btn-other" onClick={() => handleFilter()} >Filtrar</button>
                </div>
            </Col>
        </Row>

    )
}

export default FiltroFechaReportes

