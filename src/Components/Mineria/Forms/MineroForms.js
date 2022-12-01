import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { CLIENT, MACHINES, MACHINES_API, MINING_MACHINES } from '../../Helpers/helper'
import SelectMachine from './SelectMachine'

function MineroForms() {

  const initialState = {
    datamachine: "",
    documento: "",
    ip: "",
    machine_name: Math.random().toString(36).slice(-2) + ":" + Math.random().toString(36).slice(-2) + ":" + Math.random().toString(36).slice(-2) + ":" + Math.random().toString(36).slice(-2),
    porcentaje: 90,
    consume_machine: 15000,
    hashrate: 102,
    tempmax: 100,
    maxfan: 9150,
  }

  const [state, setState] = useState(initialState)
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataList, setDataList] = useState('')
  const [error, setError] = useState(null);
  const { modalstatus, setModalStatus } = useContext(DataContext)
  const [machineList, setMachineList] = useState()
  const [externalData, setExternalData] = useState()

  const [machineItem, setMachineItem] = useState()

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
        setIsLoaded(true);
        /**seteamos el listado de tickets */
        setDataList(json);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
        console.log("Esto es el error" + error);
      }
    }

    getClient()


    const getMachines = async () => {
      try {
        const res = await fetch(MACHINES, options),
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

    const apiOptions = {
      method: 'POST',

    }
    const gettingAllMachines = async () => {
      try {
        const res = await fetch(MACHINES_API, apiOptions),
          json = await res.json()
        setExternalData(json)
      } catch (error) {
        console.log(error);
      }
    }

    gettingAllMachines()


  }, [])

  const handleChange = (e) => {

    setState(prevState => {
      const updatedValues = {
        ...prevState,

        [e.target.name]: e.target.value,
      }
      return { ...updatedValues };
    });
  }

  const submitMinero = (e) => {
    e.preventDefault()

    const createMinero = async () => {

      const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

      const createMiner = {
        machinedata: JSON.stringify(externalData.filter((item) => item.id === state.datamachine)),
        document: state.documento,
        ip: state.ip,
        machine_name: state.ip + " / " + state.machine_name,
        porcentaje: 90,
        consume_machine: 15000,
        hashrate: 102,
        tempmax: 100,
        maxfan: 9150,
      }

      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(createMiner)
      }

      try {
        const res = await fetch(MINING_MACHINES, options),
          json = await res.json()
        console.log(json);


      } catch (error) {
        console.log(error);
      }
    }

    createMinero()

  }

  return (
    <>
      <Form onSubmit={submitMinero}>
        <Row md className="mt-2">
          <FloatingLabel className="tkt" controlId="documento" label="Seleccionar cliente">
            <Form.Select aria-label="Seleccionar cliente" name="documento" onChange={handleChange} value={state.documento} >
              <option value="" selected disabled>Seleccionar</option>
              {
                Object.keys(dataList).map((item => {
                  return <option value={dataList[item]?.document}>{dataList[item]?.name + " " + dataList[item]?.last_name}</option>
                }))
              }
            </Form.Select>
          </FloatingLabel>
        </Row>
        <Row className='mt-3'>
          <FloatingLabel
            controlId="ip"
            label="Agregar IP"
            className="mb-3"
            name="ip"
            value={state.ip}
            onChange={handleChange}
          >
            <Form.Control type="text" name='ip' placeholder="agregar ip" />
          </FloatingLabel>
        </Row>
        <Row className="mt-2">
          <FloatingLabel className="tkt"
            controlId="floatingSelectGrid"
            label="Seleccionar maquina"
          >
            <Form.Select aria-label="Seleccionar maquina" name="datamachine" onChange={handleChange} value={state.datamachine} >
              <option>Seleccionar maquina</option>
              {
                externalData?.map((item) => {
                  return (<option value={item.id} onClick={() => machineItem(item)} > {item?.name} {item?.brand} </option>)
                })
              }
            </Form.Select>
          </FloatingLabel>
        </Row>

        <Row className='addusr' >
          <Col id='create'>
            <Button type="submit">Agregar minero</Button>
          </Col>
          <Col id='closeone' className='closee'>
            <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default MineroForms