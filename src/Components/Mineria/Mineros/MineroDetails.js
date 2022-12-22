import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../Commons/Context/DataContext';
import ModalContainer from '../../Commons/ModalContainer';
import { MINING_MACHINES } from '../../Helpers/helper';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import InfoMinero from './InfoMinero';
import { formatStatus } from '../../Helpers/formats';
import MiningMachineActions from './MiningMachineActions';
import MineroForms from '../Forms/MineroForms';



function MineroDetails() {


    const { id } = useParams();
    const [minero, setMinero] = useState(null);
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const modal = modalstatus


    const initialState = {
        form: 'Minero',
        title: ''
    }

    const [state, setState] = useState(initialState)

    React.useEffect(() => {

        const token = localStorage.getItem('token');

        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            }
        }

        const idmin = Number(id)

        const getMinerData = async () => {
            const response = await fetch(MINING_MACHINES + idmin, options)
            const data = await response.json();
            setMinero(data);
        }
        getMinerData()


    }, []);

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
        } catch (err) {
            return
        }
    };

    const sendID = minero ? minero?.id_machine : ''

    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Minero':
                return (
                    <MineroForms datID={sendID} />
                )
        }
    }



    const formatStatus = (data) => {
        if (data === 0) {
            return (
                <span className='statusinfo online'>Online</span>
            )
        } else if (data === 1) {
            return (
                <span className='statusinfo offline'>Offline</span>
            )
        }
        else if (data === 3) {
            return (
                <span className="statusinfo offtxt">Manteniance</span>
            )
        }
        else if (data === 4) {
            return (
                <span className="statusinfo failtxt">Out</span>
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
                            <Col><div className='colorlink ticketsdetails'> <Link to="/mineros">{"< Mineros"}</Link> </div></Col>
                            <Col className='headtiket imp d-flex'>
                                <div>
                                    <h4>{minero?.machine_name} {formatStatus(minero?.status)} </h4>
                                </div>
                                <div className='text-end clipboard' onClick={() => copyToClipBoard(minero?.machine_name)} >
                                    <span className='txttd'><ion-icon name="copy-outline"></ion-icon></span>
                                </div>
                            </Col>
                        </Row>
                        <Row className='w-100'>
                            <InfoMinero data={minero} />
                        </Row>

                    </Container>
                </Col>
                <Col md={3}>
                    <MiningMachineActions data={minero} />
                </Col>
            </Row>
        </div>
    )
}

export default MineroDetails