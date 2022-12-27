import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DataContext } from '../../Commons/Context/DataContext'
import { CLIENT, OPERATION_PROD, USER } from '../../Helpers/helper'
import DatosCliente from './DatosCliente'
import DatosOperacion from './DatosOperacion'
import DatosUsuario from './DatosUsuario'

function DetailsOperations() {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const {id} = useParams()
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const idClient = (new URLSearchParams(window.location.search)).get("idClient")
    const [clients, setClients] = useState();
    const [operations, setOperations] = useState();
    const [user, setUser] = useState();
    const [isloading,setIsLoading] = useState(true)
    const [isloadingOperation,setIsLoadingOperation] = useState(true)
    const [isloadingUser,setIsLoadingUser] = useState(true)
    
    const getUser = async (idUser)=>{
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token,
                'content-type': 'application/json'
            },
        }
        try {
            const req = await fetch(USER+idUser,options),
            res = await req.json()
            console.log(req);
            console.log(res);
            setUser(res)
            setIsLoadingUser(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    const getClient = async ()=>{
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token,
                'content-type': 'application/json'
            },
        }
        try {
            const res = await fetch(CLIENT+idClient,options),
                json = await res.json()
            /**seteamos loading */
            console.log(json);

            /**seteamos el listado de tickets */
            setClients(json);
            setIsLoading(false)
        } catch (error) {

            console.log("Esto es el error" + error);
        }
    }

    
    const getOperations = async ()=>{
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token,
                'content-type': 'application/json'
            },
        }
        try {
            const res = await fetch(OPERATION_PROD+'all/'+id,options),
                json = await res.json()
            /**seteamos loading */
            console.log(json);

            /**seteamos el listado de tickets */
            setOperations(json);
            setIsLoadingOperation(false)
            getUser(json.operation.id_user)
        } catch (error) {

            console.log("Esto es el error" + error);
        }
    }
    
    console.log("ID DE LA OPERACION" , id);
    useEffect(()=>{
          getClient()  
          getOperations()
    },[])

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true}>
                <Row className='mt-3'>
                    <h2 className='text-center'>Detalles de la operacion</h2>
                </Row>
                {isloading?'':<DatosCliente data = {clients}/>}
                {isloadingOperation?'':<DatosOperacion data={operations}/>}
                {isloadingUser?'':<DatosUsuario data={user}/>}
                <br/>
            </Container>
        </div>
    )
}

export default DetailsOperations