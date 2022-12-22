import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'

function TicketsReporte() {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)


    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
             <Row className='mt-3'>
                    <h1 className='text-center'>Tickets</h1>
                </Row>
            <Row className='mt-3'>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Gasto de la semana </Card.Title>
                            <Card.Text>
testtttt                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default TicketsReporte

