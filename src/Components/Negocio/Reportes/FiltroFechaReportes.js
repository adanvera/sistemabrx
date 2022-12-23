import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'


function FiltroFechaReportes({fechaDesde,setFechaDesde,setFechaHasta,fechaHasta,handleFilter}) {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)


    return (


        <Row className='p-5'>
                <h5 className=''>   Escoga un rango de fecha:</h5>

            <Col className='mt-3' md={4}>
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

            <Col className='mt-3' md={4}>
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
            <div className='col-2 mt-3 delete-btn tkt d-flex'>

                <input type="button" value='Filtrar' onClick={() => handleFilter()}  />

            </div>

        </Row>

    )
}

export default FiltroFechaReportes

