import { useContext, useState } from "react"
import { Col } from "react-bootstrap"
import { DataContext } from "../Commons/Context/DataContext"
const BTC_COTIZACION = 0.00005

const OperationsData = ()=>{

    const [typesOperations,setTypesOperations] = useState([{ label: "Compra", value: 1 }, { label: "Venta", value: 0 }])
    const currency = [{ label: "BTC", value: 1 }, { label: "USDT", value: 0 }]
    const [comision,setComision ] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false);
    const {isBuying,setIsBuying,setModalStatus,typeCurrency,setTypeCurrency,setDataOperation} = useContext(DataContext)
    const [currentCurrency,setCurrentCurrency] = useState('')
    const [amount,setAmount] = useState(0)
    const [totalAmount,setTotalAmount] = useState(0)

    const handleTypeChange = (e)=>{
        const type = e.target.value;
        if(type === '1'){
            
            setIsBuying(true)
        }else{
            setIsBuying(false)

        }   

    }
    const handleCurreyncyChange = (e)=>{
        setCurrentCurrency(e.target.value);   
   
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log('Hice click');
        //calculamos el totalAMoun
        const amountCommission = amount*(comision/100)
        console.log(amount);
        console.log(comision);
        console.log(amountCommission);
        await setTotalAmount((amount+amountCommission))
        let amountBTC = 0;
        if(currentCurrency === '1'){
            amountBTC = totalAmount*BTC_COTIZACION
        }else{
            setTypeCurrency(currentCurrency)
            amountBTC = totalAmount


        }
        console.log(`TotalAmount ${totalAmount} amounBTC ${amountBTC}`);
        setDataOperation({amount,comision,totalAmount,amountBTC,isBuying,currentCurrency})

        if(isBuying){
            setModalStatus(true)
            if(currentCurrency === '1'){
                setTypeCurrency(currentCurrency)
            }else{
                setTypeCurrency(currentCurrency)

            }

        }else{
            setIsBuying(false)
            setModalStatus(true)

        }


    }
    
    return (
        <form md={12} onSubmit={handleSubmit} >
                            <h5 className="title-details ml-5 pt-3 ">Datos de operacion</h5>
                            <Col>
                                <div className='datashow mt-3'>
                                    <label className='labeltk'>Tipo de operacion</label>
                                    <select onChange={(e) => handleTypeChange(e)} >

                                        {typesOperations.map((option) => (

                                            <option value={option.value} >{option.label}</option>

                                        ))}

                                    </select>

                                </div>

                            </Col>
                            <Col>
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Tipo de moneda</label>
                                    <select onChange={(e)=>handleCurreyncyChange(e)}>

                                        {currency.map((option) => (

                                            <option value={option.value}>{option.label}</option>

                                        ))}

                                    </select>

                                </div>

                            </Col>
                            
                            
                            <Col>
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Comision</label>
                                    <input className='inputshow' value={comision} onChange={(e)=>setComision(Number(e.target.value))} />

                                </div>
                            </Col>
                            
                            <Col
                            >
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Monto transaccion</label>
                                    <input className='inputshow' value={amount} onChange={(e)=>setAmount(Number(e.target.value))} />

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