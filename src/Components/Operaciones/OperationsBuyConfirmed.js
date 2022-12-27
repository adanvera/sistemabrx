import React, { Fragment, useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import isBuyingImgBtc from '../../assets/images/btc.jpeg'
import isBuyingImgUsdt from '../../assets/images/usdt.jpeg'
import { DataContext } from '../Commons/Context/DataContext';
import QR from '../Commons/QR/Qr';
import { OPERATION_PROD, OPERATION_TEST } from '../Helpers/helper';
import btcLogo from '../../assets/images/btc-logo.png'
import usdtLogo from '../../assets/images/usdt-logo.png'

const OperationsBuyConfirmed = (props) => {
    const qrBtc = localStorage.getItem("QR-BTC") ? localStorage.getItem("QR-BTC") : ''
    const qrUSDT = localStorage.getItem("QR-USDT") ? localStorage.getItem("QR-USDT") : ''
    const { operationsClient, dataOPeration, idClientToSale, setShowModalOperation,showModalOperation,setModalStatus } = useContext(DataContext)
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const data = dataOPeration.currentCurrency === '1'?qrBtc:qrUSDT
    const images = dataOPeration.currentCurrency === '1'?btcLogo:usdtLogo
    const handleConfirmed = async () => {
        let btc,usdt;
        if(dataOPeration.currentCurrency === '1'){
            btc = dataOPeration.amountBTC
            usdt = 0
        }else if(dataOPeration.currentCurrency === '0'){
            btc = 0
            usdt = dataOPeration.amountBTC

        }
        const operation = {
            id_client: idClientToSale,
            amount: dataOPeration.totalAmount,
            commission: dataOPeration.comision,
            type: '1',
            currency: 'USD',
            btc,
            usdt
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

        if (req.ok) {
            setShowModalOperation(true)
        } else {
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
            {showModalOperation === true ?
                <div md={12} className='dataIsOk'>
                    <Row className='dataIsOkContent'>
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <span>Operacion  exitosa!</span>
                    </Row>
                    <Row id='close'>
                        <Button className='btn closeBtn' onClick={() => refreshPage()}>Cerrar</Button>
                    </Row>
                </div> :
                <Container fluid={true} className="row" >
                    <Col md={12}>
                        <div className='datashow'>
                            <h5 className="title-details ml-5 pt-3 ">Datos de la compra</h5>

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
                            <label className='labeltk' ><b>Monto envidado al cliente:</b> {dataOPeration.totalAmount + " USD"} </label>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='datashow'>
                            <label className='labeltk' ><b>Monto a recibir en {dataOPeration.currentCurrency === "1" ? "BTC" : "USDT"}:</b> {dataOPeration.amountBTC} </label>
                        </div>
                    </Col>

                    <Col md={12} >
                        <div className='datashow'>
                            <div className='qr-imagen mt-3 mb-3'>
                                <QR data={data} images={images} size={300}/>
                                {/* <img src={props.props.typeCurrency === '1' ? isBuyingImgBtc : isBuyingImgUsdt} width="300px  " height="300px" /> */}
                            </div>
                        </div>
                    </Col>

                    <Col id='create'>
                        <Button type="submit" className="btnadd" onClick={handleConfirmed}>Confirmar</Button>
                    </Col>

                </Container>
            }
        </Fragment>

    )

}


export default OperationsBuyConfirmed