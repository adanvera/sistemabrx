import React, { useEffect, useState } from 'react'
import { GET_MACHINES } from '../../Helpers/helper'

const SelectMachine = (props) => {

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

    return (
        <>
            <option>Seleccionar maquina</option>
            {
                machineList?.map((item) => {
                    return (<option value={item?.id_model}>{item?.description_model}</option>)
                })
            }
        </>
    )
}

export default SelectMachine