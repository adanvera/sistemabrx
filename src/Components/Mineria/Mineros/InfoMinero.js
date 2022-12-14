import React, { useContext, useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { AMOUNT_MINER_BY_DAY, AMOUNT_POWER_BY_DAY, COINMINIG, CONSUMO, CONSUMO_MACHINE_ULTIMO, CONSUMO_MACHINE_ULTIMO_30_DIAS } from '../../Helpers/helper';
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
import Table from '../../Commons/Table/Table';
import { coinMinigFormated, filteredDataMiners } from '../../Helpers/formats';
import { DataContext } from '../../Commons/Context/DataContext';
import FilterMinerCoins from './FilterMinerCoins';

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
    const { mineroGloabl, setMineroGlobal } = useContext(DataContext)
    const [databtc, setDatabtc] = useState()
    const [chartData, setChartData] = useState({})

    // funcion para reemplazar "" y {} y : en un string
    const replaceData = (data) => {
        return JSON.stringify(data)?.replace(/"/g, " ").replace(/{/g, "\n").replace(/}/g, "").replace(/:/g, " ").replace(/\\/g, " ");
    }

    const parseData = data ? JSON.parse(data?.machinedata) : ''
    const useData = data ? parseData[0] : ''
    const [amountDay, setAmountDay] = useState()
    const [amountPower, setAmountPower] = useState()
    const [coinmining, setCoinmining] = useState()
    const [valueBTC, setValueBTC] = useState('')
    const [ultimostrinta, setUltimostrinta] = useState()
    const [coins, setCoins] = useState()
    const idFinal = props ? props?.datID : ''
    const [dayBtc, setByDay] = useState()

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
                const res = await fetch(CONSUMO + props?.datID, optionsdd),
                    json = await res.json()
                setChartData(json)
            } catch (error) {
                console.log(error);
            }
        }

        getConsumoId()

        const coinmining = async () => {
            try {
                const res = await fetch(COINMINIG + props?.datID, options),
                    json = await res.json()
                setCoinmining(json);
            } catch (error) {
                console.log(error);
            }
        }

        coinmining()

        const getBtc = async () => {
            const optionns = {
                method: 'GET',
            }
            try {
                const res = await fetch("https://api.minerstat.com/v2/coins?list=BTC", optionns),
                    json = await res.json()
                setValueBTC(json)
            } catch (error) {
                console.log(error);
            }
        }

        getBtc()

        const getConsumoUltimos = async () => {
            const optionfdsadfsdd = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'token': token
                },
            }
            try {
                const res = await fetch(CONSUMO_MACHINE_ULTIMO + props?.datID, optionfdsadfsdd),
                    json = await res.json()
                setUltimostrinta(json)
            } catch (error) {
                console.log(error);
            }
        }

        getConsumoUltimos()

        const databtc = async () => {
            const opptionss = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
            try {
                const res = await fetch("https://api.minerstat.com/v2/coins?list=BTC", opptionss),
                    json = await res.json()
                setDatabtc(json)
            } catch (error) {
                console.log(error);
            }
        }

        databtc()

        const getCurrencies = async () => {
            const optionns = {
                method: 'GET',
            }
            try {
                const res = await fetch("https://es.beincrypto.com/wp-json/ceranking/v2/filter-data?val=&filter=coinid-with-fiat", optionns),
                    json = await res.json()
                setCoins(json)
            } catch (error) {
                console.log(error);
            }

        }

        getCurrencies()

        const getMiningByDay = async () => {
            const optionns = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'token': token
                },
            }
            try {
                const res = await fetch(COINMINIG + "get/day/coins/" + props?.datID, optionns),
                    json = await res.json()
                setByDay(json)
            } catch (error) {
                console.log(error);
            }

        }

        getMiningByDay()


    }, [id_machine, props?.datID])

    /**filtrar por Bitcoin */
    const filterByBitcoin = coins ? coins?.filter((item) => item.name === 'Bitcoin') : ''
    const logoBitcoin = filterByBitcoin ? filterByBitcoin[0]?.logo : ''
    const priceBtc = databtc ? databtc[0].price : ''
    const filterPowerById = amountPower?.filter((item) => item?.id_machine === id_machine)
    const filterById = amountDay?.filter((item) => item?.id_machine === id_machine)
    const finalAmountDay = data ? filterById[0] : ''

    const btcValue = valueBTC ? valueBTC[0].price : ''

    const formatedData = id_machine ? coinMinigFormated(coinmining, btcValue, logoBitcoin) : ''

    const headers = {
        amount: "MINADO",
        dollar: "DOLARES",
        created_at: "RECIBIDO EL",
    }

    const initialState = {
        filtros: {
            desde: '',
            hasta: ''
        }
    }

    const [state, setState] = useState(initialState)

    //funcion para limpiar los valores de las variables a utilizar
    const onCleanFilter = (data) => {
        setState((prevState) => {
            return {
                ...prevState,
                filtros: {
                    ...data,
                }
            }
        })
    }


    //funcion para setear y pasar que filtro se selecciono
    const handleFilter = (data) => {

        setState((prevState) => {
            return {
                ...prevState,
                filtros: {
                    ...prevState.filtros,
                    [data.key]: data.value
                }
            }
        })
    }


    const NumberToshow = (coinmining) => {

        var sum = 0

        if (coinmining) {
            Object.keys(coinmining)?.map((item) => {
                const amount = Number(coinmining[item].amount)
                /**cast string to number */
                sum += amount
            })
        }
        return sum
    }


    const consumoEnergia = ultimostrinta ? ultimostrinta[0]?.consumo?.toFixed(2) : ''

    const getGanancia = (coinmining, priceBtc) => {

        var sum = 0

        if (coinmining) {
            Object.keys(coinmining)?.map((item) => {
                const amount = Number(coinmining[item].amount)
                /**cast string to number */
                sum += amount
            })
        }

        const castToDollar = sum * priceBtc

        return castToDollar
    }

    const castGanancia = getGanancia(coinmining, priceBtc)
    const ganancia = castGanancia.toFixed(2)
    const gananciaMinando = Number(castGanancia.toFixed(2))
    const consumoo = Number(consumoEnergia)

    const gananciaNeta = (gananciaMinando, consumoo) => {

        if (consumoo === undefined) { return 0 }
        else {
            const gananciaNeta = gananciaMinando - consumoo
            return gananciaNeta
        }
    }

    const gananciaNetaClienteMes = coinmining ? gananciaNeta(gananciaMinando, consumoEnergia).toFixed(2) : ''

    const getMinadoDolarDia = (data) => {
        var sum = 0
        if (data) {
            Object.keys(data)?.map((item) => {
                const amountDolar = Number(data[item].todollar)
                sum += amountDolar
            })
        }
        return sum
    }

    const derfds = getMinadoDolarDia(dayBtc)
    const minadoDolarDia = derfds.toFixed(2)


    const getMindadoBtcDia = (data) => {
        var sum = 0
        if (data) {
            Object.keys(data)?.map((item) => {
                const amountBtc = Number(data[item].amount)
                sum += amountBtc
            })
        }
        return sum
    }


    const mindadoBtcDia = getMindadoBtcDia(dayBtc)

    const filteredDataConsumoMes = (data) => {
        if (data === undefined) { return <strong>0</strong> }
        else {
            return <strong>{data}</strong>
        }

    }

    

    return (
        <>
            <Row className='pl-3'>
                <Col className='Box-article pb-3 mt-3 ml-3'>

                    {
                        data &&
                        <>
                            <Row>
                                <Col md={6} className="mt-3 mb-3">
                                    <Row className='mt-3'>
                                        <span className='dete'> <ion-icon name="hardware-chip-outline"></ion-icon> <strong> {useData?.name}</strong> </span>
                                        <span>Marca :  <strong>{useData?.brand}</strong> </span>
                                        <span>type :  <strong>{useData?.type}</strong> </span>
                                    </Row>
                                    <Row className='mt-3'>
                                        <span className='dete'><ion-icon name="code-working-outline"></ion-icon></span>
                                        <h6> Algorithms </h6>
                                    </Row>
                                    <Row>
                                        <span>
                                            <strong>
                                                {replaceData(useData?.algorithms)}
                                            </strong>
                                        </span>
                                    </Row>
                                    <Row className='mt-3'>
                                        <span className='dete'><ion-icon name="diamond-outline"></ion-icon></span>
                                        <h6>specs </h6>
                                    </Row>
                                    <Row>
                                        <span><strong>{replaceData(useData?.specs)}</strong> </span>
                                    </Row>
                                </Col>

                                <Col md={6} className="mt-3 mb-3">

                                    <div class="css-89u161">
                                        <div class="css-kb1ety">
                                            <dd class="css-pxccrj">
                                                <strong> {gananciaNetaClienteMes}</strong> USD</dd>
                                            <dt class="css-6qnch9">GANANCIA DEL MES NETA DEl CLIENTE</dt>
                                        </div>
                                    </div>
                                    <Row className='mt-1 mb-1'></Row>

                                    <div class="css-89u161">
                                        <div class="css-kb1ety">
                                            <dd class="css-pxccrj">
                                                <strong> {mindadoBtcDia + " "}</strong>BTC  <strong>{' <-> ' + minadoDolarDia}</strong> USD</dd>
                                            <dt class="css-6qnch9">Minado ultimos 24 horas</dt>
                                        </div>
                                    </div>


                                    <Row className='mt-1 mb-1'></Row>
                                    <div class="css-89u161">
                                        <div class="css-kb1ety">
                                            <dd class="css-pxccrj">{filterPowerById ? (filteredDataConsumoMes(filterPowerById[0]?.amount_day?.toFixed(2))) : '0'} USD</dd>
                                            <dt class="css-6qnch9">Consumo energ??a ultimos 30 d??as</dt>
                                        </div>
                                        <div class="css-kb1ety">
                                            <dd class="css-pxccrj">
                                                <strong>{NumberToshow(coinmining) + " "}</strong> BTC</dd>
                                            <dt class="css-6qnch9">Minado ultimos 30 d??as</dt>
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                        </>
                    }
                </Col>
            </Row>
            {
                formatedData &&
                <>
                    <h4 class="resumen">Ultimos bloques minados</h4>
                    <FilterMinerCoins onCleanFilter={onCleanFilter} getFilter={handleFilter} />
                    <Container>

                        <Table headers={headers} data={filteredDataMiners(formatedData, state?.filtros)} exportdata={true} title="minero" />

                    </Container>
                </>
            }

        </>

    )
}

export default InfoMinero
