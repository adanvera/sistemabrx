import { Col, Row } from "react-bootstrap"

const InfoCliente = () => {

    return (
        <Row className='mt-3'>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Codigo cliente</label>
                    <input className='inputshow' value={"data.id_client"}  />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Nro documento</label>
                    <input className='inputshow' value={"data.id_client"}  />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk'>Nombre y Apellido</label>
                    <input className='inputshow' value={"data.namedata.last_name"} disabled />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Direccion</label>
                    <input className='inputshow' value={"data.address"} disabled />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Telefono</label>
                    <input className='inputshow' value={"data.address"} disabled />
                </div>
            </Col>
        </Row>

    )

}

export default InfoCliente