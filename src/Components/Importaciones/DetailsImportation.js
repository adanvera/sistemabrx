import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../Commons/Context/DataContext';
import { IMPORTACIONES } from '../Helpers/helper';
import InfoImportación from './InfoImportación';

const DetailsImportation = (props) => {
    const { id } = useParams();
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const [dataList, setDataList] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {

                'token': token
            },
        }

        const id_importacion = Number(id)

        const getImportacion = async () => {
            try {
                const res = await fetch(IMPORTACIONES + id_importacion, options),
                    json = await res.json()
                setDataList(json)
            }
            catch (error) {
                console.log(error)
            }
        }

        getImportacion()

    }, [])


    const dataToUse = dataList ? dataList[0] : ''


    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Row>
                <Col md={9} className="tiktop ml-1">
                    <Container fluid={true} className="">
                        <Row className='d-grid pt-3 headerdetails'>
                            <Col><div className='colorlink ticketsdetails'> <Link to="/importaciones">{"< Importaciones"}</Link> </div></Col>
                            <Col className='headtiket d-flex'>
                                <div>
                                    <h4>Datos de la importación</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row className='w-100'>
                            <InfoImportación data={dataToUse} />
                        </Row>
                    </Container>
                </Col>
                <Col md={3}>
                    {/* <TicketActions data={dataToUse} /> */}
                </Col>
            </Row>
        </div>
    )
}

export default DetailsImportation