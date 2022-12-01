import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import isBuyingImgBtc from '../../assets/images/btc.jpeg'
import isBuyingImgUsdt from '../../assets/images/usdt.jpeg'

const OperationsSaleConfirmed = (props) => {
    console.log(props);

    return (
        <Container>
            <Row className="is-3 text-al-ini titlemodule">
                <Col className="is-12">
                    <div className='datashow'>
                        <label className='labeltk' >Nro documento del cliente</label>
                        <input className='inputshow' value={""} name='nroDocumento' enabled   />
                    </div>
                </Col>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>Nombre y Apellido</label>
                        <input className='inputshow' value={" "} disabled />
                    </div>
                </Col>
                
                
                
                <Col >
                <div className='datashow'>

                    <Button type="submit" className=" btnadd">Confirmar</Button>
                </div>
                </Col>
            
            </Row>
        </Container>
        
    )

}


export default OperationsSaleConfirmed