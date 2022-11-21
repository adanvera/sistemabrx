import { useState } from "react"
import { Col, Row } from "react-bootstrap"

const InfoCliente = () => {
    const formData = {
        codigoCliente:"",
        nroDocumento:""
    }
    const [data,setData] = useState(formData)

    const handleChange = (e) => {
        console.log("CHnage");
        e.preventDefault();
        setData(prevState => {
          const updatedValues = {
            ...prevState,
            [e.target.name]: e.target.value,
          }
          return { ...updatedValues };
        });
    
      }

    return (
        <Row className='mt-3'>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Codigo cliente</label>
                    <input className='inputshow' name = "codigoCliente" value={data.codigoCliente} onChange={(e) => handleChange(e)}  />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Nro documento</label>
                    <input className='inputshow' value={""} disabled  />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk'>Nombre y Apellido</label>
                    <input className='inputshow' value={""} disabled />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Direccion</label>
                    <input className='inputshow' value={""} disabled />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Telefono</label>
                    <input className='inputshow' value={""} disabled />
                </div>
            </Col>
        </Row>

    )

}

export default InfoCliente