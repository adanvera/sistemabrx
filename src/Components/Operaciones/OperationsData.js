import { Fragment, useContext, useEffect, useState } from "react"
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { DataContext } from "../Commons/Context/DataContext"
const BTC_COTIZACION = 0.00005

const OperationsData = () => {

    const [typesOperations, setTypesOperations] = useState([{ label: "Seleccione", value: 2 }, { label: "Compra", value: 1 }, { label: "Venta", value: 0 }])
    const currency = [{ label: "Seleccione", value: 2 }, { label: "BTC", value: 1 }, { label: "USDT", value: 0 }]
    const [comision, setComision] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false);
    const { isBuying, setIsBuying, setModalStatus, typeCurrency, setTypeCurrency, setDataOperation, setIsSelling, showModalOperation, setShowModalOperation } = useContext(DataContext)
    const [currentCurrency, setCurrentCurrency] = useState('')
    const [amount, setAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [dataValidate, setDataVerify] = useState(false)
    const [isTypeOperationSelected, setIsTypeOperationSelected] = useState(false)
    const [isTypeCurrencySelected, setIsTypeCurrencySelected] = useState(false)
    const { subPermissons, setSubPermissons } = useContext(DataContext)

    const handleTypeChange = (e) => {
        const type = e.target.value;
        console.log("Cambiando");
        console.log(type);
        if (type === '1') {
            setIsTypeOperationSelected(true)
            setIsBuying(true)
            setIsSelling(false)
            return
        } else if (type === '0') {
            setIsTypeOperationSelected(true)

            setIsSelling(true)
            setIsBuying(false)
            return
        }
        setIsTypeOperationSelected(false)

    }

    const handleCurreyncyChange = (e) => {
        if (e.target.value === '2') {
            setIsTypeCurrencySelected(false)
        } else {
            setIsTypeCurrencySelected(true)
            setCurrentCurrency(e.target.value);

        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Hice click');

        if (isTypeOperationSelected === false) return alert("Seleccione el tipo de operacion")
        if (isTypeCurrencySelected === false) return alert("Seleccione el tipo de moneda")
        //calculamos el totalAMoun
        updateTotalAMount(amount, comision)

        //llamamos al api en caso de que la moneda sea BTC
        let amountBTC = 0;
        if (currentCurrency === '1') {
            const req = await fetch(`https://blockchain.info/tobtc?currency=USD&value=${totalAmount}`),
                res = await req.json()
            console.log("res ->>>>>>>>", req);
            if (req.ok) {
                amountBTC = res
            } else { //en caso de que la API explote ponemos valor por defecto
                amountBTC = totalAmount * BTC_COTIZACION
            }
        } else {
            setTypeCurrency(currentCurrency)
            amountBTC = totalAmount
        }

        console.log(`TotalAmount ${totalAmount} amounBTC ${amountBTC}`);
        setDataOperation({ amount, comision, totalAmount, amountBTC, isBuying, currentCurrency })

        if (isBuying) {
            setModalStatus(true)
            if (currentCurrency === '1') {
                setTypeCurrency(currentCurrency)
            } else {
                setTypeCurrency(currentCurrency)
            }

        } else {
            setIsBuying(false)
            setModalStatus(true)
        }
    }

    const handleAmount = (e) => {
        setAmount(e.target.value)
        updateTotalAMount(e.target.value, comision)
    }

    const handleComssion = (e) => {
        setComision(e.target.value)
        console.log('La comision es ', e.target.value);
        updateTotalAMount(amount, e.target.value)
    }

    function updateTotalAMount(amount, comision) {
        const amountCommission = (Number(amount)) * (comision / 100)
        console.log('comision');
        console.log(amountCommission);
        console.log('amount');
        console.log(Number(amount));
        setTotalAmount(amountCommission + Number(amount))
    }

    // const verifySubPermissons = (data) => {
    //     if (data === 1) {
    //         return (
    //             <Col>
    //                 <div className='datashow mt-3'>
    //                     <input type="submit" className=" btnadd" value={"Realizar operacion"} />
    //                 </div>
    //             </Col>
    //         )
    //     } else {
    //         return (
    //             <Col>
    //                 <div className='datashow mt-3 notallowed'>
    //                     <input type="submit" disabled className=" btnadd" disabled value={"Realizar operacion"} />
    //                 </div>
    //             </Col>
    //         )
    //     }
    // }

    const verifyRoleSub = (data) => {
        if (data === 1) {
            return (
                <Col className="">
                    <div className='datashow mt-3'>
                        <div type="submit" className="btnadd">
                            <input type="submit" className=" btnadd op" value={"Realizar operacion"} />
                        </div>
                    </div>
                </Col>
            )
        } else {
            return (
                <Col className=" notallowed">
                    <div className='datashow mt-3'>
                        <div className="btnadd-not-allowed">
                            <input type="submit" className=" btnadd" value={"Realizar operacion"} />
                        </div>
                    </div>
                </Col>
            )
        }
    }


    return (
        <Fragment>

            <form md={12} onSubmit={handleSubmit} >
                <h5 className="title-details ml-5 pt-3 ">Datos de operacion</h5>
                <Row className="mt-2">
                    <FloatingLabel className="tkt"
                        controlId="floatingSelectGrid"
                        label="Tipo de operacion">
                        <Form.Select aria-label="Seleccionar Tipo de operacion" onChange={(e) => handleTypeChange(e)} >
                            {typesOperations.map((option) => (
                                <option required value={option.value} >{option.label}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Row>

                <Row className="mt-2">
                    <FloatingLabel className="tkt"
                        controlId="floatingSelectGrid"
                        label="Tipo de moneda">
                        <Form.Select aria-label="Seleccionar Tipo de moneda" onChange={(e) => handleCurreyncyChange(e)} >
                            {currency.map((option) => (
                                <option required value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                </Row>
                <Col>
                    <div className='datashow mt-3'>
                        <label className='labeltk' >Comision</label>
                        <input className='inputshow client' required onChange={(e) => handleComssion(e)} />
                    </div>
                </Col>
                <Col>
                    <div className='datashow mt-3'>
                        <label className='labeltk' >Monto transaccion</label>
                        <input className='inputshow client' required onChange={(e) => handleAmount(e)} />
                    </div>
                </Col>
                {
                    verifyRoleSub(subPermissons)
                }


            </form>




        </Fragment>


    )



}

export default OperationsData