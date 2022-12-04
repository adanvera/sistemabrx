import { useContext, useState } from "react"
import { Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { DataContext } from "../Commons/Context/DataContext"
const BTC_COTIZACION = 0.00005

const OperationsData = () => {

    const [typesOperations, setTypesOperations] = useState([{ label: "Compra", value: 1 }, { label: "Venta", value: 0 }])
    const currency = [{ label: "BTC", value: 1 }, { label: "USDT", value: 0 }]
    const [comision, setComision] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false);
    const { isBuying, setIsBuying, setModalStatus, typeCurrency, setTypeCurrency, setDataOperation, setIsSelling } = useContext(DataContext)
    const [currentCurrency, setCurrentCurrency] = useState('')
    const [amount, setAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const handleTypeChange = (e) => {
        const type = e.target.value;
        console.log("Cambiando");
        console.log(type);
        if (type === '1') {
            setIsBuying(true)
            setIsSelling(false)
        } else {
            setIsSelling(true)
            setIsBuying(false)
        }
    }

    const handleCurreyncyChange = (e) => {
        setCurrentCurrency(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Hice click');
        //calculamos el totalAMoun
        updateTotalAMount(amount, comision)
        let amountBTC = 0;
        if (currentCurrency === '1') {
            amountBTC = totalAmount * BTC_COTIZACION
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

    return (
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
                    <input className='inputshow client' required  onChange={(e) => handleComssion(e)} />
                </div>
            </Col>
            <Col>
                <div className='datashow mt-3'>
                    <label className='labeltk' >Monto transaccion</label>
                    <input className='inputshow client' required onChange={(e) => handleAmount(e)} />
                </div>
            </Col>
            <Col>
                <div className='datashow mt-3'>
                    <input type="submit" className=" btnadd" value={"Realizar operacion"} />
                </div>
            </Col>
        </form>
    )



}

export default OperationsData