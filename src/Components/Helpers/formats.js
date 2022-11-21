
export const formatedDataTicket = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,

                
                [item?.id_ticket]: {
                    icon: 'construct-outline',
                    id_ticket: item.id_ticket,
                    ticket_name: item.ticket_name,
                    id_machine: item.id_machine,
                    created_at: formatoDate(item.created_at),
                    created_at_filter: item.created_at,
                    created_by_user: item.id_user,
                    status: (item.status),
                    priority: item.priority,
                    updated_at: formatoDate(item.updated_at),
                }

            }
        })
    }
    return obData
}

export const formatedDataClient = (data) => {
    let obData = {}
    console.log(data);

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_client]: {
                    id_cliente: item.id_client,
                    documento: item.document,
                    name: item.name + " " + item.last_name,
                    direccion: item.address,
                    telefono: item.phone,
                    actions: 'x x',
                }

            }
        })
    }
    return obData
}

export const formatoDate = (fecha) => {

    if (fecha != null) {
        const date = new Date(fecha)
        const dateFormat = date.getDate().toString().padStart(2, '0') + '/' +
            (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
            date.getFullYear()
            + ' ' + date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0') + 'hs'

        return dateFormat.toString()

    }
    return null

}

/**funcion para limitar listado por paginas */
export const perPage = (data, page) => {

    const initialRange = (page === 1 ? 0 : ((page - 1) * 10));
    const FinalRange = 10 * page;

    return Object.keys(data).filter(item => {
        return Object.keys(data).slice(initialRange, FinalRange).includes(item)
    }).map(item => data[item])

}

export const formatedDataUsers = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_user]: {
                    id_user: item.id_user,
                    name: item.name + ' ' + item.last_name,
                    document: item.document,
                    email: item.email,
                    register: formatoDate(item.register),
                    created_at_user: item.register,
                    rol: item.rol,
                    estado: formatStatus(item.status),
                    update_data: formatoDate(item.update_data),
                    actions: 'x x',
                }

            }
        })
    }
    return obData
}

/**funcion para formatear estado de cuenta del usuario */
export const formatStatus = (data) => {

    if (data === 1) {
        return (
            <div className="status">
                <div className="activeus">ACTIVA</div>
            </div>
        )
    } else if (data === 0) {
        return (
            <div className=" status">
                <div className="blockedus">BLOQUEADA</div>
            </div>
        )
    }
}

/**
 * @param dataList Lista de Objetos con datos a ser filtrados
 * @param filter Objeto con los filtros que debe ser iterado y filtrado el dataList
* */
export const filteredData = (dataList, filter) => {
    /**
     * Se asigna a la variables @filteredData para poder ir modificando
     * */
    let filteredData = dataList;

    /**
     * Se elimina los filtros vacios del objeto
     * Dejando un objeto solo con los atributos con valores asignados.
     * */
    for (let key in filter) {
        if (filter[key] === '') {
            delete filter[key]
        }
    }

    Object.keys(filter).forEach(filtro => {
        /**
         * Si el Filtro es distinta al valor TODAS procedera a filtrar, ya que TODAS implica que debe devolver el objeto
         * tal cual se mando inicialmente
         * */
        (filter[filtro] !== 'TODAS') && (
            filteredData =
            // se obtiene array de keys para poder iterar el objeto
            Object.keys(filteredData)
                // Se verifica si el objeto del vendedor cumple con el filtro seleccionado
                .filter(item => {

                    if (filtro === 'hasta') {
                        const fechaTicket = new Date(filteredData[item].created_at_filter)
                        const fechaFiltro = filter[filtro]
                        return fechaTicket.toISOString().substring(0, 10) <= fechaFiltro.toISOString().substring(0, 10)
                    }

                    if (filtro === 'desde') {
                        const fechaTicket = new Date(filteredData[item].created_at_filter)
                        const fechaFiltro = filter[filtro]
                        return fechaTicket.toISOString().substring(0, 10) >= fechaFiltro.toISOString().substring(0, 10)
                    }

                    return (filteredData[item][filtro].toLowerCase().includes(filter[filtro].toLowerCase()))
                })
                // se devuelve el objeto del vendedor que cumplio con el filtro
                .map(id => filteredData[id])
        )

    })

    // Finalmente se retorna los datos filtrados
    return filteredData

}


export const takeDataSearch = (data, page) => {
    const initialRange = (page === 1 ? 0 : ((page - 1) * 10));
    const FinalRange = 1000000;

    return Object.keys(data).filter(item => {
        return Object.keys(data).slice(initialRange, FinalRange).includes(item)
    }).map(item => data[item])

}


export const formatedDataMiners = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_machine]: {
                    id_machine: item.id_machine,
                    client: item.name,
                    description_model: item.description_model,
                    status: item.status,
                    actions: 'x x',
                }

            }
        })
    }
    return obData
}

export const formatedDataRoles = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_role]: {
                    id_role: item?.id_role,
                    description: item?.description,
                    access: dataAccess(item.access),
                    subpermissons: subPermissonsFormat(item.sub_permissons),
                    status: dataStatus(item.status),
                    actions: 'x x',
                }

            }
        })
    }
    return obData
}


export const dataAccess = (data) => {
    if (data) {

        const dete = data ? data : ''

        const accessTo = JSON.parse("[" + dete + "]")

        /**filtramos y guardamos los accesos de los roles */
        const clientes = accessTo ? accessTo.filter((item) => { return item?.title?.includes("CLIENTES") }) : ''
        const seguridad = accessTo ? accessTo.filter((item) => { return item?.title?.includes("SEGURIDAD") }) : ''
        const usuarios = accessTo ? accessTo.filter((item) => { return item?.title?.includes("USUARIOS") }) : ''
        const mineria = accessTo ? accessTo.filter((item) => { return item?.title?.includes("MINERIA") }) : ''
        const operaciones = accessTo ? accessTo.filter((item) => { return item?.title?.includes("OPERACIONES") }) : ''

        return `${seguridad[0]?.title === undefined ? '' : seguridad[0]?.title + ","} 
    ${clientes[0]?.title === undefined ? '' : clientes[0]?.title + ","} ${operaciones[0]?.title === undefined ? '' : operaciones[0]?.title + ","}
     ${usuarios[0]?.title === undefined ? '' : usuarios[0]?.title + ","} ${mineria[0]?.title === undefined ? '' : mineria[0]?.title}`
    }

}

export const subPermissonsFormat = (data) => {
    if (data === 1) {
        return <div className="">SI</div>
    } else {
        return <div className="">NO</div>
    }

}

export const dataStatus = (data) => {

    if (data !== 1) {
        return <div>INACTIVO</div>
    } else { return <div>ACTIVO</div> }

}



/**
 * @param dataList Lista de Objetos con datos a ser filtrados
 * @param filter Objeto con los filtros que debe ser iterado y filtrado el dataList
* */
export const filteredDataUsers = (dataList, filter) => {
    /**
     * Se asigna a la variables @filteredData para poder ir modificando
     * */
    let filteredData = dataList;

    /**
     * Se elimina los filtros vacios del objeto
     * Dejando un objeto solo con los atributos con valores asignados.
     * */
    for (let key in filter) {
        if (filter[key] === '') {
            delete filter[key]
        }
    }

    Object.keys(filter).forEach(filtro => {
        /**
         * Si el Filtro es distinta al valor TODAS procedera a filtrar, ya que TODAS implica que debe devolver el objeto
         * tal cual se mando inicialmente
         * */
        (filter[filtro] !== 'TODAS') && (
            filteredData =
            // se obtiene array de keys para poder iterar el objeto
            Object.keys(filteredData)
                // Se verifica si el objeto del vendedor cumple con el filtro seleccionado
                .filter(item => {

                    if (filtro === 'hasta') {
                        const fechaTicket = new Date(filteredData[item].created_at_user)
                        const fechaFiltro = filter[filtro]
                        return fechaTicket.toISOString().substring(0, 10) <= fechaFiltro.toISOString().substring(0, 10)
                    }

                    if (filtro === 'desde') {
                        const fechaTicket = new Date(filteredData[item].created_at_user)
                        const fechaFiltro = filter[filtro]
                        return fechaTicket.toISOString().substring(0, 10) >= fechaFiltro.toISOString().substring(0, 10)
                    }

                    return (filteredData[item][filtro].toLowerCase().includes(filter[filtro].toLowerCase()))
                })
                // se devuelve el objeto del vendedor que cumplio con el filtro
                .map(id => filteredData[id])
        )

    })

    // Finalmente se retorna los datos filtrados
    return filteredData

}



/**
 * @param dataList Lista de Objetos con datos a ser filtrados
 * @param filter Objeto con los filtros que debe ser iterado y filtrado el dataList
* */
export const filteredDataRole = (dataList, filter) => {
    /**
     * Se asigna a la variables @filteredData para poder ir modificando
     * */
    let filteredData = dataList;

    /**
     * Se elimina los filtros vacios del objeto
     * Dejando un objeto solo con los atributos con valores asignados.
     * */
    for (let key in filter) {
        if (filter[key] === '') {
            delete filter[key]
        }
    }

    Object.keys(filter).forEach(filtro => {
        /**
         * Si el Filtro es distinta al valor TODAS procedera a filtrar, ya que TODAS implica que debe devolver el objeto
         * tal cual se mando inicialmente
         * */
        (filter[filtro] !== 'TODAS') && (
            filteredData =
            // se obtiene array de keys para poder iterar el objeto
            Object.keys(filteredData)
                // Se verifica si el objeto del vendedor cumple con el filtro seleccionado
                .filter(item => {
                    return (filteredData[item][filtro].toLowerCase().includes(filter[filtro].toLowerCase()))
                })
                // se devuelve el objeto del vendedor que cumplio con el filtro
                .map(id => filteredData[id])
        )

    })

    // Finalmente se retorna los datos filtrados
    return filteredData

}

export const formmrmr = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_role]: {
                    description: item?.description,
                }

            }
        })
    }
    
    return obData
}

