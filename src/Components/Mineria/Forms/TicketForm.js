import { useEffect, useState } from "react"
import { Col, Container, FloatingLabel, Form } from "react-bootstrap"
import { GET_MACHINES } from "../../Helpers/helper"

const TicketForm = (props) => {

    const initialState = {
        variables: {
            id_machine: '',
            id_user: '',
            description_ticket: '',
            status: 1
        },
    }

    const [machineList, setMachineList] = useState()
    /**acciones que son utilizadas al cargar datos de
     * las consultas
     */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
        * en la siguiente consulta
       */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            },
        }

        const getMachines = async () => {
            try {
                const res = await fetch(GET_MACHINES, options),
                    json = await res.json()
                /**seteamos loading */
                setIsLoaded(true);
                setMachineList(json)
            } catch (error) {
                setIsLoaded(true);
                setError(error);
                console.log(error);
            }
        }

        getMachines()
    }, [])

    console.log(machineList);

    return (
        <Container>
            <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Descripción breve">
                    <Form.Control type="text" placeholder="Agregar descripción" />
                </FloatingLabel>
            </Col>
            <Col md>
                <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Works with selects"
                >
                    <Form.Select aria-label="Seleccionar maquina">
                        
                    </Form.Select>
                </FloatingLabel>
            </Col>
        </Container>
    )
}

export default TicketForm