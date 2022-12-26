import { Col, Row } from "react-bootstrap"

const DatosOperacion = ({data}) => {
    console.log('Recibo estos datos');
    console.log(data);



    return (
        <>
            <Row className='mt-3'>
                <h3 className="">Operacion</h3>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk client' >Nro operacion</label>
                        <input className='inputshow client' required value={data.operation.id_operations} name='nroDocumento' disabled  />
                    </div>
                </Col>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk client' >Fecha de operacion</label>
                        <input className='inputshow client' required value={data.operation.created.replace(/T/, ' ').      // replace T with a space
                replace(/\..+/, '')      // replace T with a space
} name='nroDocumento' disabled  />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>Tipo de operacion</label>
                        <input className='inputshow client' value={data.operation.type === '1'?'Compra':'Venta'} disabled />
                    </div>
                </Col>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>{data.operation.type === '1'?'Monto enviado al cliente':'Monto recibido por el cliente'}</label>
                        <input className='inputshow client' value={data.operation.amount + ' USD'} disabled />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>Comision</label>
                        <input className='inputshow client' value={data.operation.commission +' %'} disabled />
                    </div>
                </Col>
                <Col>
                    
                </Col>
            </Row>
            <Row>
                
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>Tipo de moneda</label>
                        <input className='inputshow client' value={data.operation.usdt !== '0'?'USDT':'BTC'} disabled />
                    </div>
                </Col>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>{data.operation.type === '1'?'Monto recibido por el cliente':'Monto enviado al cliente'}</label>
                        <input className='inputshow client' value={data.operation.usdt !== '0'?data.operation.amount:data.operation.btc} disabled />
                    </div>
                </Col>
            </Row>
            
        </>

    )
}

export default DatosOperacion