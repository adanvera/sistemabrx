import React, { useState } from "react";

const SearchTable = props => {

    const [busqueda, setBusqueda] = useState('')

    const handleOnChange = data => {
        setBusqueda(data)
        props.handleChange(data)
    }

    return (
        <div className="columns w-100" id="buscador">
            <div className="column d-flex align">
                <div className="control has-icons-left has-icons-right input-size d-g ">
                    <input value={busqueda}
                        onChange={e => handleOnChange(e.target.value)}
                        placeholder={props.placeholder}
                        className="input is-normal searchinput"
                        type="text"
                    />
                </div>
                <button className=" button btn-buscar ml-2">Buscar</button>
            </div>
        </div>
    )

}

export default SearchTable