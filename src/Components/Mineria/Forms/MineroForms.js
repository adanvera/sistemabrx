import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { CLIENT, MACHINES, MACHINES_API, MINING_MACHINES } from '../../Helpers/helper'

const MineroForms = (props) => {

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
    speed: '',
  }

  const [state, setState] = useState(initialState)
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataList, setDataList] = useState('')
  const [error, setError] = useState(null);
  const { modalstatus, setModalStatus, dataidrow, setDataIdRow } = useContext(DataContext)
  const [machineList, setMachineList] = useState()
  const [externalData, setExternalData] = useState()
  const { modalType, setModalType } = useContext(DataContext)
  const [machineItem, setMachineItem] = useState()
  let navigate = useNavigate();

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
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        token: token
      },

    }

    const gettingAllMachines = async () => {
      try {
        const res = await fetch(MACHINES, apiOptions),
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
      const extractData = ((externalData.filter((item) => item.id === state.datamachine)));
      const exxt = JSON.parse(extractData[0]?.algorithms)
      const der = Object.keys(exxt).map((key) => {
        return {
          name: key,
          value: exxt[key]
        }
      })

      const createMiner = {
        machinedata: JSON.stringify(externalData.filter((item) => item.id === state.datamachine)),
        document: state.documento,
        ip: state.ip,
        machine_name: state.ip + " / " + state.machine_name,
        porcentaje: 90,
        consume_machine: der[0]?.value?.power,
        hashrate: 102,
        tempmax: 100,
        maxfan: 9150,
        speed: der[0]?.value?.speed,

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

    setTimeout(() => {
      navigate('/mineros')
      window.location.reload()
    }, 1500)


  }

  const handleSubmitAlta = (e) => {
    e.preventDefault();
    const id_machine = props?.datID ? props?.datID : ''
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({ status: 0 })
    }
    const darDeAlta = async () => {
      try {
        const res = await fetch(MINING_MACHINES + id_machine, options),
          json = await res.json();
      } catch (error) {
        console.log(error.msg);
      }
    }
    darDeAlta()
    setTimeout(() => {
      navigate('/mineros')
    }, 2500);
  }


  const handleSubmitBaja = (e) => {
    e.preventDefault();
    const id_machine = props?.datID ? props?.datID : ''
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({ status: 4 })
    }
    const darDeBaja = async () => {
      try {
        const res = await fetch(MINING_MACHINES + id_machine, options),
          json = await res.json();
      } catch (error) {
        console.log(error.msg);
      }
    }
    darDeBaja()

    setTimeout(() => {
      navigate('/mineros')
    }, 2500);

  }

  if (modalType === "Add") {
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
                <option disabled selected >Seleccionar maquina</option>
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

  if (modalType === 'Alta') {
    return (
      <Form onSubmit={handleSubmitAlta}>
        <div className='dataIsOk'>
          <Row className='dataIsOkContent'>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <span>¿Estas seguro de que quieres dar de alta a esta maquina?</span>
          </Row>
          <Row className='addusr mt-3'>
            <Col id='create'>
              <Button type="submit">Aceptar</Button>
            </Col>
            <Col id='closeone' className='closee'>
              <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
            </Col>
          </Row>
        </div>
      </Form>
    )
  }

  if (modalType === 'Baja') {
    return (
      <Form onSubmit={handleSubmitBaja}>
        <div className='dataIsOk'>
          <Row className='dataIsOkContent'>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <span>¿Estas seguro de que quieres dar de baja a esta maquina?</span>
          </Row>
          <Row className='addusr mt-3'>
            <Col id='create'>
              <Button type="submit">Aceptar</Button>
            </Col>
            <Col id='closeone' className='closee'>
              <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
            </Col>
          </Row>
        </div>
      </Form>
    )
  }
}

export default MineroForms