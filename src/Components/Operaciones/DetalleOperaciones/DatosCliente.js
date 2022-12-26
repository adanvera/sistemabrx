import { Col, Row } from "react-bootstrap"

const DatosCliente = ({data}) => {
    console.log('Recibo estos datos');
    console.log(data);



    return (
        <>
            <Row className='mt-3'>
                <h3 className="">Cliente</h3>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk client' >Nro cliente</label>
                        <input className='inputshow client' required value={data.id_client} name='nroDocumento' disabled  />
                    </div>
                </Col>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk client' >Nro documento</label>
                        <input className='inputshow client' required value={data.document} name='nroDocumento' disabled  />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>Nombre y Apellido</label>
                        <input className='inputshow client' value={data.name + " " + data.last_name} disabled />
                    </div>
                </Col>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>Email</label>
                        <input className='inputshow client' value={data.email} disabled />
                    </div>
                </Col>
            </Row>
            <Row>
                
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>Telefono</label>
                        <input className='inputshow client' value={data.phone} disabled />
                    </div>
                </Col>
            </Row>
        </>

    )
}

export default DatosCliente