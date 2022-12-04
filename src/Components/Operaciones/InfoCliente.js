import { useContext, useEffect, useState } from "react"
import { Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { DataContext } from "../Commons/Context/DataContext"
import { CLIENT } from "../Helpers/helper"

const InfoCliente = () => {

    const formData = {
        codigoCliente: "",
        nroDocumento: "",
        nombre: "",
        apellido: "",
        direccion: ""
    }
    const [data, setData] = useState(formData)
    const [clients, setClients] = useState('')
    const { setOperationsClient, setIdClientToSale } = useContext(DataContext)

    const handleChange = (e) => {
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


    const handleKeyPress = (e) => {
        //si presiona Enter busacamos el cliente 
        //Obvio que React no adivinara
        if (e.key === 'Enter') {
            console.log('Codigo cliente' + data.nroDocumento);

            const clientFinded = clients.filter(cl => cl.document === data.nroDocumento)
            console.log(clientFinded);
            if (clientFinded) {
                const client = clientFinded[0]
                formData.nroDocumento = client.document
                formData.nombre = client.name
                formData.apellido = client.last_name

                setOperationsClient({
                    documento: client.document,
                    nombreApellido: (client.name + " " + client.last_name)
                })
                setIdClientToSale(client.id_client)
                console.log(formData);
                setData(formData)

            }
            console.log('No encontramos el cliente');

        }
    }

    return (
        <>
            <Row className='mt-3'>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk client' >Nro documento</label>
                        <input className='inputshow client' required value={data.nroDocumento} name='nroDocumento' enabled onChange={(e) => handleChange(e)} onKeyPress={(e) => handleKeyPress(e)} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='datashow'>
                        <label className='labeltk'>Nombre y Apellido</label>
                        <input className='inputshow' value={data.nombre + " " + data.apellido} disabled />
                    </div>
                </Col>
            </Row>
        </>

    )

}

export default InfoCliente