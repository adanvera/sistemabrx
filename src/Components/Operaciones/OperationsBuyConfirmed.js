import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import isBuyingImgBtc from '../../assets/images/btc.jpeg'
import isBuyingImgUsdt from '../../assets/images/usdt.jpeg'
import { DataContext } from '../Commons/Context/DataContext';

const OperationsBuyConfirmed = (props) => {
    console.log(props);
    const{operationsClient,dataOPeration} = useContext(DataContext)
    console.log(dataOPeration);
    return (
        <Container fluid={true} className="row" >
            <Col md={12}>
                <div className='datashow'>
                    <label className='labeltk title' ><b>Datos de la compra</b></label>
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
                    <label className='labeltk' ><b>Monto:</b> {dataOPeration.amount +" USD"}</label>
                </div>
            </Col>
            <Col md={12}>
                <div className='datashow'>
                    <label className='labeltk' ><b>Monto a enviar por el cliente:</b> {dataOPeration.totalAmount +" USD"} </label>
                </div>
            </Col>
            <Col md={12}>
                <div className='datashow'>
                    <label className='labeltk' ><b>Monto a enviar en {dataOPeration.currentCurrency === "1"?"BTC":"USDT"}:</b> {dataOPeration.amountBTC } </label>
                </div>
            </Col>

            <Col md={12}>
                <div className='datashow'>
                        <div className='qr-imagen'>
                            <img src= { props.props.typeCurrency === '1'? isBuyingImgBtc : isBuyingImgUsdt}  width="300px  " height="300px"/>
                        </div>
                </div>
            </Col>

            <Col id='create'>
                <Button type="submit" className=" btnadd">Confirmar</Button>
            </Col>
          
        </Container>
    )

}


export default OperationsBuyConfirmed