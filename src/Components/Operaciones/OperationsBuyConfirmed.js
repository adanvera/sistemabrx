import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import isBuyingImgBtc from '../../assets/images/btc.jpeg'
import isBuyingImgUsdt from '../../assets/images/usdt.jpeg'
import { DataContext } from '../Commons/Context/DataContext';
import { OPERATION_PROD } from '../Helpers/helper';

const OperationsBuyConfirmed = (props) => {
    console.log(props);
    const{operationsClient,dataOPeration,idClientToSale} = useContext(DataContext)
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

    console.log(dataOPeration);
    const handleConfirmed= async() => {
        const operation={
            id_client:idClientToSale,
            amount:dataOPeration.totalAmount,
            commission:dataOPeration.comision,
            type:'1',
            currency:'USD'
        }
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token
            },
            body:JSON.stringify(operation)
        }
        console.log(`Enviaremos estos datos `);
        console.log(operation);
        const req = await fetch(OPERATION_PROD,options),
              res = await req.json();
              console.log(req);
              console.log(res);
              
              if(req.ok){
                setTimeout(()=>{
                    window.location.reload()

                },1000)
              }
        
    }
    return (
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
                <Button type="submit" className=" btnadd" onClick={handleConfirmed}>Confirmar</Button>
            </Col>
          
        </Container>
    )

}


export default OperationsBuyConfirmed