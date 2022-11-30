import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import isBuyingImgBtc from '../../assets/images/btc.jpeg'
import isBuyingImgUsdt from '../../assets/images/usdt.jpeg'

const OperationsConfirmed = (props) => {
    console.log(props);

    return (
        <Row className='' >
            <Col id='create'>
                <Button type="submit" className=" btnadd">Confirmar</Button>
            </Col>
            <Col id='closeone' className='closee'>
                <Button >Cerrar</Button>
            </Col>
        </Row>
    )

}


export default OperationsConfirmed