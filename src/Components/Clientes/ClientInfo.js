import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { CLIENT } from '../Helpers/helper';

const ClientInfo = (props) => {
    
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const { data } = props
    const [isEditable, setIsEditable] = useState(false)
    
    const [changed, setChanged] = useState(false)
    const [state,setState] = useState(data)

    if(state === ''  && data !== ''){
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
    const handleSubmit = async ()=>{
        console.log(`Estoy con estos dato s>>>>`);
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'token': token
            },
            body:JSON.stringify(state)
        }
        console.log(JSON.stringify(state));
        try {
            const req = await fetch(CLIENT+state.id_client,options),
                    res = await req.json()
            if(req.ok){
                console.log("Actualizacion correcta");
                setTimeout(()=>{
                    window.location.reload()
                },300) 
            }
            alert(res.msg)
        } catch (error) {
            console.log(error);
            alert(error)
            
        }
    }


    return (
        <div className='d-flex'>
            {data &&
                <>
                    <Col md={9}>
                        <Row className='mt-3'>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Codigo</label>
                                    <input className='inputshow' value={state.id_client} disabled />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk'>Nombre</label>
                                    <input className='inputshow'
                                        value={state.name}
                                        name="name"
                                        onChange={(e)=> handleChange(e)}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk'>Apellido</label>
                                    <input className='inputshow'
                                        value={state.last_name}
                                        disabled={isEditable === true ? false : true}
                                        name='last_name'
                                        onChange={(e)=> handleChange(e)}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Direccion</label>

                                    <input className='inputshow' 
                                        value={state.address} 
                                        name = "address"
                                        disabled={isEditable === true ? false : true} 
                                        onChange={(e)=> handleChange(e)}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Documento</label>
                                    <input className='inputshow' 
                                    value={state.document} 
                                    name = "document"
                                    disabled={isEditable === true ? false : true} 
                                    onChange={(e)=> handleChange(e)}/>
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk'>Telefono</label>

                                    <input className='inputshow' 
                                    name='phone'
                                    value={state.phone} 
                                    disabled={isEditable === true ? false : true}
                                    onChange={(e)=> handleChange(e)} />
                                </div>
                            </Col>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk'>Correo</label>

                                    <input className='inputshow' 
                                    name='email'
                                    value={state.email} 
                                    disabled={isEditable === true ? false : true} 
                                    onChange={(e)=> handleChange(e)}/>
                                </div>
                            </Col>
                            {
                        changed === true &&
                        <Row className='dfasfd mt-3'>
                            <Col id='creatdfe'>
                                <Button type="submit" onClick={handleSubmit}>Guardar cambios</Button>
                            </Col>
                        </Row>
                    }

                        </Row>

                    </Col>
                    <Col md={3}>

                    </Col>
                    
                </>
            }
        </div>

    )
}

export default ClientInfo