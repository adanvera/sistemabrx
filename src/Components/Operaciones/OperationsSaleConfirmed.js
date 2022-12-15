import React, { Fragment, useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { DataContext } from '../Commons/Context/DataContext';
import { OPERATION_PROD, OPERATION_TEST } from '../Helpers/helper';

const OperationsSaleConfirmed = (props) => {
    console.log(props);
    const { operationsClient, dataOPeration, idClientToSale, setShowModalOperation,showModalOperation ,modalstatus, setModalStatus} = useContext(DataContext)
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

    const handleConfirmed = async () => {
        const operation = {
            id_client: idClientToSale,
            amount: dataOPeration.totalAmount,
            commission: dataOPeration.comision,
            type: '0',
            currency: 'USD'
        }
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(operation)
        }
        console.log(`Enviaremos estos datos `);
        console.log(operation);
        const req = await fetch(OPERATION_PROD, options),
            res = await req.json();
        console.log(req);
        console.log(res);
        console.log(showModalOperation);
        if (req.ok) {
            setShowModalOperation(true)
        }else{
            setShowModalOperation(false)

        }

    }
    function refreshPage() {
        setModalStatus(false)
        setShowModalOperation(false)
        setTimeout(()=>{},300)
        window.location.reload(false);
      }

    return (
        <Fragment>

            {showModalOperation  === true?
                <div md={12} className='dataIsOk'>
                    <Row className='dataIsOkContent'>
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <span>Operacion  exitosa!</span>
                    </Row>
                    <Row id='close'>
                        <Button className='btn closeBtn' onClick={() => refreshPage()}>Cerrar</Button>
                    </Row>
                </div>
                :
                <Container fluid={true} className="row" >
                    <Col md={12}>
                        <div className='datashow text-center'>
                            <h5 className="title-details ml-5 pt-3 ">Datos de la venta</h5>

                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='datashow'>
                            <label className='labeltk' ><b>Cliente:</b> {operationsClient.nombreApellido}</label>
                        </div>
                    </Col>

                    <Col md={12}>
                        <div className='datashow'>
                            <label className='labeltk' ><b>Documento:</b> {operationsClient.documento}</label>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='datashow'>
                            <label className='labeltk' ><b>Comision:</b> {dataOPeration.comision}</label>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='datashow'>
                            <label className='labeltk' ><b>Monto:</b> {dataOPeration.amount + " USD"}</label>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='datashow'>
                            <label className='labeltk' ><b>Monto a enviar al cliente:</b> {dataOPeration.totalAmount + " USD"} </label>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='datashow'>
                            <label className='labeltk' ><b>Monto a enviar en {dataOPeration.currentCurrency === "1" ? "BTC" : "USDT"}:</b> {dataOPeration.amountBTC} </label>
                        </div>
                    </Col>



                    <Col id='create'>
                        <Button type="submit" className=" btnadd" onClick={handleConfirmed} >Confirmar</Button>
                    </Col>

                </Container>
            }

        </Fragment>

    )

}


export default OperationsSaleConfirmed