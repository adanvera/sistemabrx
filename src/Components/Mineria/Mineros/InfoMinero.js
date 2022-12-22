import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { AMOUNT_MINER_BY_DAY, AMOUNT_POWER_BY_DAY, CONSUMO } from '../../Helpers/helper';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const InfoMinero = (props) => {
    const { data } = props
    const id_machine = data ? data?.id_machine : ''
    const power = data ? data?.consume_machine : ''

    const [chartData, setChartData] = useState({})

    // funcion para reemplazar "" y {} y : en un string
    const replaceData = (data) => {
        return JSON.stringify(data)?.replace(/"/g, " ").replace(/{/g, "\n").replace(/}/g, "").replace(/:/g, " ").replace(/\\/g, " ");
    }

    const parseData = data ? JSON.parse(data?.machinedata) : ''

    const useData = data ? parseData[0] : ''

    const [amountDay, setAmountDay] = useState()
    const [amountPower, setAmountPower] = useState()

    useEffect(() => {

        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            },
        }

        const getAmountDay = async () => {
            try {
                const res = await fetch(AMOUNT_MINER_BY_DAY, options),
                    json = await res.json()
                console.log(json);
                setAmountDay(json)
            } catch (error) {
                console.log(error);
            }
        }

        getAmountDay()

        const getPowerAmountByDay = async () => {
            try {
                const res = await fetch(AMOUNT_POWER_BY_DAY, options),
                    json = await res.json()
                setAmountPower(json)
            } catch (error) {
                console.log(error);
            }
        }

        getPowerAmountByDay()

        const id_machine = data?.id_machine 

        const optionsdd = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            },
        }

        const getConsumoId = async () => {
            try {
                const res = await fetch(CONSUMO + id_machine, optionsdd),
                    json = await res.json()
                console.log(json);
                setChartData(json)
            } catch (error) {
                console.log(error);
            }
        }

        getConsumoId()




    }, [id_machine])

    const filterPowerById = amountPower?.filter((item) => item?.id_machine === id_machine)
    const filterById = amountDay?.filter((item) => item?.id_machine === id_machine)
    const finalAmountDay = data ? filterById[0] : ''




    return (
        <>
            <Row className='pl-3'>
                <Col className='Box-article pb-3 mt-3 ml-3'>

                    {
                        data &&
                        <>
                            <Row>
                                <Col md={6} className="mt-3 mb-3">

                                    <div class="css-89u161">
                                        <div class="css-kb1ety"><dd class="css-pxccrj">{filterPowerById ? (filterPowerById[0]?.amount_day?.toFixed(2)) : '0'} USD</dd><dt class="css-6qnch9">Consume Energy 24hs</dt></div>
                                        <div class="css-kb1ety"><dd class="css-pxccrj">99.80%</dd><dt class="css-6qnch9">Share Efficiency</dt></div>
                                        <div class="css-kb1ety"><dd class="css-pxccrj">{finalAmountDay ? (finalAmountDay?.amount_day) : ''} BTC</dd><dt class="css-6qnch9">Mined Revenue 24hs</dt></div>
                                    </div>

                                </Col>

                            </Row>
                            <Row className='mt-3'>
                                <span>Articulo :  <strong>{useData?.name}</strong> </span>
                                <span>Marca :  <strong>{useData?.brand}</strong> </span>
                                <span>type :  <strong>{useData?.type}</strong> </span>
                            </Row>
                            <Row className='mt-3'><h6>Algorithms </h6></Row>
                            <Row>
                                <span>
                                    <strong>
                                        {replaceData(useData?.algorithms)}
                                    </strong>
                                </span>
                            </Row>
                            <Row className='mt-3'><h6>specs </h6></Row>
                            <Row>
                                <span><strong>{replaceData(useData?.specs)}</strong> </span>
                            </Row>
                        </>
                    }
                </Col>
            </Row>
            <Row>
                {/* <Col md={6}>
                    <div className='ticketchart'>
                        <div className="col-xl w-100" id='datapie'>
                            <Row className='labeldata'>Ticket timeline</Row>
                            <Line options={options} data={dataCoins} />
                        </div>
                    </div>
                </Col> */}
            </Row>
        </>

    )
}

export default InfoMinero
