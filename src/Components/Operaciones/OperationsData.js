import { useContext, useState } from "react"
import { Col } from "react-bootstrap"
import { DataContext } from "../Commons/Context/DataContext"

const OperationsData = ()=>{

    const [typesOperations,setTypesOperations] = useState([{ label: "Compra", value: 1 }, { label: "Venta", value: 0 }])
    const currency = [{ label: "BTC", value: 1 }, { label: "USDT", value: 0 }]
    const [comision,setComision ] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false);
    const {isBuying,setIsBuying,setModalStatus,typeCurrency,setTypeCurrency} = useContext(DataContext)
    const [currentCurrency,setCurrentCurrency] = useState('')

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
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('Hice click');
        if(isBuying){
            setModalStatus(true)
            if(currentCurrency === '1'){
                setTypeCurrency(currentCurrency)
            }else{
                setTypeCurrency(currentCurrency)

            }

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
                                    <input className='inputshow' value={comision} onChange={(e)=>setComision(e.target.value)} />

                                </div>
                            </Col>
                            
                            <Col
                            >
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Monto transaccion</label>
                                    <input className='inputshow' value={""} />

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