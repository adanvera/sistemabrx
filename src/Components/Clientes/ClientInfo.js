import React, { Fragment, useEffect, useState, useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Commons/Context/DataContext';
import { CLIENT } from '../Helpers/helper';
import ClienteForm from '../Clientes/Forms/ClienteForm'


const ClientInfo = (props) => {
    const navigate = useNavigate()

    const { modalstatus, setModalStatus } = useContext(DataContext)


    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const { data } = props
    const [isEditable, setIsEditable] = useState(false)

    const [changed, setChanged] = useState(false)
    const [state, setState] = useState(data)

    if (state === '' && data !== '') {
        setState(data
        )
    }

    const handleChange = (e) => {

        setState(prevState => {
            const updatedValues = {
                ...prevState,


                [e.target.name]: e.target.value,

            }
            setIsEditable(true)
            setChanged(true)
            return { ...updatedValues };
        });
    }
    //todo mejorar la UI
    const handleSubmit = async () => {
        console.log(`Estoy con estos dato s>>>>`);
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'token': token
            },
            body: JSON.stringify(state)
        }
        console.log(JSON.stringify(state));
        try {
            const req = await fetch(CLIENT + state.id_client, options),
                res = await req.json()
            if (req.ok) {
                console.log("Actualizacion correcta");
                setTimeout(() => {
                    window.location.reload()
                }, 300)
            }
            alert(res.msg)
        } catch (error) {
            console.log(error);
            alert(error)

        }
    }

    const handleUserDelete = (e) => {
        setModalStatus(true)


    }

    return (
        <>
            {modalstatus === true ? (<ClienteForm modalType="Delete" id_client={state.id_client} />)
                : (
                    <div className='d-flex'>


                        {data && modalstatus === false &&
                            <>
                                <Col md={9}>
                                    <Row className='mt-3'>
                                        <Col>
                                            <div className='datashow'>
                                                <label className='labeltk' >Codigo</label>
                                                <input className='form-control ' value={state.id_client} disabled />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='datashow'>
                                                <label className='labeltk'>Nombre</label>
                                                <input className='form-control '
                                                    value={state.name}
                                                    name="name"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='datashow'>
                                                <label className='labeltk'>Apellido</label>
                                                <input className='form-control'
                                                    value={state.last_name}
                                                    /*  disabled={isEditable === true ? false : true} */
                                                    name='last_name'
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='datashow'>
                                                <label className='labeltk' >Documento</label>
                                                <input className='form-control'
                                                    value={state.document}
                                                    name="document"
                                                    /* disabled={isEditable === true ? false : true} */
                                                    onChange={(e) => handleChange(e)} />
                                            </div>
                                        </Col>

                                    </Row>
                                    <Row className='mt-3'>
                                        <Col>
                                            <div className='datashow'>
                                                <label className='labeltk' >Direccion</label>

                                                <input className='form-control'
                                                    value={state.address}
                                                    name="address"
                                                    /* disabled={isEditable === true ? false : true} */
                                                    onChange={(e) => handleChange(e)} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='datashow'>
                                                <label className='labeltk'>Correo</label>

                                                <input className='form-control'
                                                    name='email'
                                                    value={state.email}
                                                    /* disabled={isEditable === true ? false : true} */
                                                    onChange={(e) => handleChange(e)} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='datashow'>
                                                <label className='labeltk'>Telefono</label>

                                                <input className='form-control'
                                                    name='phone'
                                                    value={state.phone}
                                                    /* disabled={isEditable === true ? false : true} */
                                                    onChange={(e) => handleChange(e)} />
                                            </div>
                                        </Col>
                                        {
                                            changed === true &&
                                            <Row className=' mt-3'>
                                                <Col id='creatdfe'>
                                                    <Button type="submit" onClick={handleSubmit}>Guardar cambios</Button>
                                                </Col>
                                            </Row>
                                        }

                                    </Row>

                                </Col>
                                <Col md={3}>
                                    <div className='tiktop'>
                                        <Col className='headtiket d-flex'>
                                            <div>
                                                <h6>Acciones</h6>
                                            </div>
                                        </Col>
                                        <div className="actionstwo d-grid mt-3">
                                            <div className="delete-btn tkt d-flex" id='_btnDeletetkt' onClick={() => handleUserDelete()} >
                                                <span>Eliminar cliente </span>
                                                <div>
                                                    <ion-icon name="trash-outline"></ion-icon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                            </>

                        }
                    </div>

                )
            }
        </>

    )
}

export default ClientInfo