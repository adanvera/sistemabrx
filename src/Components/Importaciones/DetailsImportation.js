import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../Commons/Context/DataContext';
import ModalContainer from '../Commons/ModalContainer';
import { IMPORTACIONES } from '../Helpers/helper';
import ImportActions from './Forms/ImportActions';
import ImportTimeline from './Forms/ImportTimeline';
import InfoImportación from './InfoImportación';

const DetailsImportation = (props) => {
    const { id } = useParams();
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const [dataList, setDataList] = useState('')
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { modalType, setModalType, dataidrow, setDataIdRow } = useContext(DataContext)
    const modal = modalstatus
    let navigate = useNavigate();


    const initialState = {
        form: 'Importación',
        title: ''
    }

    const [state, setState] = useState(initialState)


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

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
        } catch (err) {
            return
        }
    };

    const commetsToShow = dataToUse ? "[" + dataToUse?.comentario_importacion + "]" : ''
    const comments = dataToUse ? JSON.parse(commetsToShow) : ''



    const handleSubmitDelete = (e) => {
        const id_importacion = dataidrow ? dataidrow : ''
        /**obtenemos el token */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        const deleteImportacion = async () => {
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'token': token
                }
            }

            try {
                const res = await fetch(IMPORTACIONES + id_importacion, options),
                    json = await res.json();
            } catch (error) {
                console.log(error.msg);
            }
        }
        deleteImportacion()
        setModalType('other')
        setModalStatus(false)
        navigate('/importaciones')
    }

    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Importación':
                return (
                    <Form onSubmit={handleSubmitDelete}>
                        <div className='dataIsOk'>
                            <Row className='dataIsOkContent'>
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>¿Estas seguro de eliminar esta importación?</span>
                            </Row>
                            <Row className='addusr mt-3'>
                                <Col id='create'>
                                    <Button type="submit">Aceptar</Button>
                                </Col>
                                <Col id='closeone' className='closee'>
                                    <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                )
        }
    }

    return (
        <div className={sidebarStatus === 'open' ? 'main-content-tkt' : 'main-content-tkt extend'} >
            {modal && (
                <ModalContainer
                    title={state?.title}
                    form={pickForm()}
                    modalStatus={modal}
                />
            )}
            <Row className=''>
                <Col md={9} className="tiktop ml-1 pb-3">
                    <Container fluid={true} className="">
                        <Row className='d-grid pt-3 headerdetails'>
                            <Col><div className='colorlink ticketsdetails'> <Link to="/importaciones">{"< Importaciones"}</Link> </div></Col>
                            <Col className='headtiket imp d-flex'>
                                <div>
                                    <h4>{dataToUse?.tracking_number} </h4>
                                </div>

                                <div className='text-end clipboard' onClick={() => copyToClipBoard(dataToUse?.tracking_number)} >
                                    <span className='txttd'><ion-icon name="copy-outline"></ion-icon></span>
                                </div>

                            </Col>
                        </Row>
                        <Row className='w-100'>
                            <InfoImportación idData={id} />
                        </Row>

                    </Container>
                </Col>
                <Col md={3}>
                    <ImportActions data={dataToUse} />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md={9}>
                    <ImportTimeline data={comments} dataToSend={dataToUse?.comentario_importacion} idImp={id} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailsImportation