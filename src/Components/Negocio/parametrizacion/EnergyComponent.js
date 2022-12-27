import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { formatedEnerdffdsafdgy } from '../../Helpers/formats'
import { ENERGIA } from '../../Helpers/helper'
import energryy from '../../../assets/images/torre-electrica.gif'

function EnergyComponent() {

    const [energyPrice, setEnergyPrice] = useState('');
    const { dataidrow, setDataIdRow } = useContext(DataContext)

    const [energypricedd, setEnergyPriceddd] = useState('')

    useEffect(() => {
        const getEnergy = async () => {
            const token = localStorage.getItem("token") ? localStorage.getItem("token") : '';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            }
            try {
                const res = await fetch(ENERGIA, options);
                const data = await res.json();
                setEnergyPrice(data)
                console.log(data);
                setEnergyPriceddd(data[0]?.precio)
            } catch (error) {
                console.log(error);
            }
        }

        getEnergy()

    }, [])


    const handleOnClick = (e, btn, id) => {
        e.preventDefault()
        const id_edit = id

        if (btn === '_btnEdit') {
            setDataIdRow(id_edit)
        }

    }

    const formatedEnergy = energyPrice ? formatedEnerdffdsafdgy(energyPrice) : ''
    const [ischanged, setIsChanged] = useState(false)

    const actualPrice = energyPrice ? formatedEnergy[1]?.precio : ''


    console.log(formatedEnergy);

    const handleChange = (e) => {
        e.preventDefault()
        setEnergyPriceddd(e.target.value)
        const id = Number(1)
        setDataIdRow(id)

        if (energypricedd !== actualPrice) {
            setIsChanged(true)
        }

    }

    const submitChange = (e) => {

        e.preventDefault()
        const id = Number(1)

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : '';

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({ precio: energypricedd })
        }

        try {
            const res = fetch(ENERGIA + id, options)
            const data = res.json();
            console.log(data);
           
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            window.location.reload()
        }
        , 1500);
    }

    return (
        <div className='mb-3'>
            <Row >

                <h4 className='resumen'>Precio energia electrica</h4>
            </Row>
            {
                formatedEnergy &&
                Object.keys(formatedEnergy).map((key) => {
                    return (
                        <Form onSubmit={submitChange}>
                            <div class="col-md-4">
                                <div class="cardddsfadsfd">
                                    <div class="icon-wrap px-4 pt-4">
                                        <div class="icon d-flex justify-content-center align-items-center bg-info rounded-circle">
                                            <span class="ion-logo-ionic text-light"></span>
                                        </div>
                                    </div>
                                    <div class="card-body pb-3 d-flex">
                                        <Col md={2}> 
                                            <div className='imgtkg mr-5'>
                                                <img src={energryy} alt="energy" />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='ml-5'>
                                                <h5 class="card-title">Energía electrica</h5>
                                                <Row className='mt-3'>
                                                    <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Precio de energia">
                                                        <Form.Control
                                                            type="number"
                                                            name="tracking_number"
                                                            placeholder="tracking_number"
                                                            value={energypricedd}
                                                            onChange={handleChange}
                                                        />
                                                    </FloatingLabel>
                                                </Row>

                                                {/* <input class="card-text" value={energypricedd} onChange={handleChange} /> */}
                                                {
                                                    ischanged &&
                                                    <Button className="mt-3 btn-log" variant="primary" type="submit" >
                                                        Editar precio
                                                    </Button>
                                                }
                                            </div>
                                        </Col>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )
                })
            }
        </div>
    )
}

export default EnergyComponent