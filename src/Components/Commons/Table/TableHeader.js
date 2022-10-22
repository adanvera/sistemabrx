function TableHeader(props) {
    const header = props?.headers

    const handleOnClick = e => {
        e.preventDefault()
        props.onChange(e.currentTarget.id)
    }

    return (
        <thead>
            <tr className="table-header">
                {Object.keys(header).map(item => {
                    return (
                        <th className="al" key={item}>
                            <div className='is-inline-flex'>
                                <a className="btnSort" id={item} onclick={e => handleOnClick(e)} >
                                    <span className="is-uppercase">{header[item]}</span>
                                    <ion-icon name="caret-down-outline"></ion-icon>
                                </a>
                            </div>
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}

export default TableHeader;