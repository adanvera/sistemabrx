import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { CLIENT } from "../Helpers/helper"

const InfoCliente = () => {
    const formData = {
        codigoCliente:"",
        nroDocumento:"",
        nombre:"",
        apellido:""
    }
    const [data,setData] = useState(formData)
    const [clients,setClients] = useState('')

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

    /*Aca obtenemos los clientes*/
    useEffect(() => {

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token
            },
        }

        const getClient = async () => {
            try {
                const res = await fetch(CLIENT, options),
                    json = await res.json()
                /**seteamos loading */
                console.log(json);
                
                /**seteamos el listado de tickets */
                setClients(json);
            } catch (error) {

                console.log("Esto es el error" + error);
            }
        }

        getClient()

    }, []);


    const handleKeyPress = (e) =>{
        //si presiona Enter busacamos el cliente 
        //Obvio que React no adivinara
        if(e.key === 'Enter'){
            console.log('Codigo cliente'+data.codigoCliente);
            
            const client = clients.filter( cl => cl.id_client === Number(data.codigoCliente))
            if(client){
                console.log(client);
                data.nroDocumento = client.document
                data.nombre = client.name
                setData(data)
            }
            
        }
    }  

    return (
        <Row className='mt-3'>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Codigo cliente</label>
                    <input className='inputshow' name = "codigoCliente" value={data.codigoCliente} onChange={(e) => handleChange(e)} onKeyPress={(e) => handleKeyPress(e)}  />
                </div>
            </Col>
            <Col>
                <div className='datashow'>
                    <label className='labeltk' >Nro documento</label>
                    <input className='inputshow' value={data.nroDocumento} disabled  />
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