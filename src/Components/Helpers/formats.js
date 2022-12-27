import { USER } from "./helper"

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
                    id_machine_to: item.id_machine,
                    created_at: formatoDate(item.created_at),
                    created_at_filter: item.created_at,
                    created_by_user: item.id_user,
                    status: formateddStaatus(item.status),
                    priority: item.priority,
                    assigned_to: item.assigned_to,
                    updated_at: formatoDate(item.updated_at),
                }

            }
        })
    }
    return obData
}

export const formatedParametersList = (data) => {

    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.codigo]: {
                    codigo: item.codigo,
                    name: item.name,
                    value: item.value,
                    actions: "x x",
                }

            }
        })
    
    }
    
    return obData
}

export const formatedEnerdffdsafdgy = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id]: {
                    id____: item.id,
                    precio: item.precio,
                    created_at: formatoDate(item.created_at),
                    updated_at: formatoDate(item.updated_at),
                    actions: "x x",
                }

            }
        })
    }
    return obData
}

export const formateddStaatus = (data) => {
    if (data === "0") {
        return <span className="statusinfo failtxt">ELIMINADO</span>
    }
    if (data === "PENDING") {
        return <span className="statusinfo offtxt">PENDIENTE</span>
    }
    if (data === "INPROGRESS") {
        return <span className="statusinfo prgrss">EN PROGRESO</span>
    }
    if (data === "ONHOLD") {
        return <span className="statusinfo failtxt">DETENIDO</span>
    }
    if (data === "CLOSED") {
        return <span className="statusinfo online">FINALIZADO</span>
    }
}

export const formatTex = (text) => {
    if (text === null) {
        return 'Sin asignar'
    } else {
        return <span className="assignedto">{text}</span>
    }
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
                    id_machine_tex: item.id_machine,
                    machine_name: item.machine_name,
                    id_machine: item.id_machine,
                    status: verifyStatusMachine(item.status),
                    name: item.name,
                    uptime: item.uptime,
                }
            }
        })
    }
    return obData

}

export const verifyStatusMachine = (data) => {
    if (data === 0) {
        return (
            <span className='statusinfo online'>En linea</span>
        )
    } else if (data === 1) {
        return (
            <span className='statusinfo offline'>Fuera de linea</span>
        )
    }
    else if (data === 3) {
        return (
            <span className="statusinfo offtxt">En mantenimiento</span>
        )
    }
    else if (data === 4) {
        return (
            <span className="statusinfo failtxt">De baja</span>
        )
    }
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

export const formatComments = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.comment_at]: {
                    comment: item?.comment,
                    comment_at: formatoDate(item?.comment_at),
                    id_user: (item?.id_user),
                    userdata: item?.userdata,
                }

            }
        })
    }

    return obData
}

export const formatHistorial = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.historilal_id]: {
                    historial_action: item?.historial_action,
                    historial_date: formatoDate(item?.historial_date),
                    id_user: (item?.id_user),
                    userdata: item?.userdata,
                }

            }
        })
    }

    return obData
}

export const formatHistorialimp = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {

            obData = {
                ...obData,
                [item?.historilal_id]: {
                    historial_action: item?.historial_action,
                    historial_date: formatoDate(item?.historial_date),
                    id_user: (item?.id_user),
                    userdata: item?.userdata,
                }

            }
        })
    }

    return obData
}

export const formatNowShoertTciket = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_ticket]: {
                    ticket_name: item?.ticket_name,
                    created_at: formatoDate(item?.created_at),
                    priority: item?.priority,
                }

            }
        })
    }

    return obData
}

export const formatedDataImportaciones = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_importacion]: {
                    id_importacion: item?.id_importacion,
                    id_cliente: item?.id_cliente + " - " + item?.client,
                    id_proveedor: item?.id_proveedor,
                    empresa_envio: item?.empresa_envio,
                    tracking_number: item?.tracking_number,
                    valor_envio: item?.valor_envio + " USD",
                    fecha_envio: formatoDate(item?.fecha_envio),
                    fecha_arribo: formatoDate(item?.fecha_arribo),
                    articulos: (item?.articulos),
                    created_at_imp: item.created_at,
                    days_counter: counterDays(item?.fecha_arribo),
                }

            }
        })
    }

    return obData

}

// export const showDaysToArrive = (data, dateToCompare) => {

//     /**format dateToCompare to dd/mm/yyy  */
//     const dateToCompareFormated = dateToCompare ? dateToCompare.toLocaleDateString() : ""

//     if (diffDays > 0) {
//         return (
//             <p className="">Faltan {diffDays} días para que llegue</p>
//         )
//     } else if (diffDays === 0) {
//         return (
//             <p className="">Importación llegó hoy</p>
//         )
//     } else if (diffDays < 0) {
//         return (
//             <p className="">Llegó hace {Math.abs(diffDays)} días</p>
//         )
//     }

// }

export const counterDays = (date) => {

    const dateToCompare = date ? new Date(date) : ""
    const actualDate = new Date()
    /**diff on days between actualDate and dateToCompare*/
    const diffDays = Math.ceil((dateToCompare - actualDate) / (1000 * 60 * 60 * 24));

    console.log("diffDays", diffDays);

    // let days = 0
    // if (date) {
    //     const dateArrivo = new Date(date)
    //     const dateNow = new Date()
    //     const diffTime = Math.abs(dateNow - dateArrivo);
    //     days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // }

    // if (days === 0) return (<span className="days today">Llegó hoy</span>)
    // if (days === 1) return (<span className=" days tommorrow">Llega mañana</span>)
    // else return (<span className="days counting">Faltan {days} dias</span>)

    if (diffDays > 0) {
        return (
            <span className="days counting">Faltan {diffDays} días para que llegue</span>
        )
    } else if (diffDays === 0) {
        return (
            <span className="days today">Llegó hoy</span>
        )
    } else if (diffDays < 0) {
        return (
            <span className="days past">Llegó hace {Math.abs(diffDays)} días</span>
        )
    }



}

export const formatImpShort = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_importacion]: {
                    tracking_number: item?.tracking_number,
                    id_cliente: item?.id_cliente,
                    id_proveedor: item?.id_proveedor,
                    valor_envio: item?.valor_envio,
                }

            }
        })
    }

    return obData
}

export const formatedShortOp = (data) => {

    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_operations]: {
                    cliente: item?.id_client,
                    monto: item?.amount,
                    comision: item?.commission,
                    tipoOperaciones: item?.id_operations,
                    tipoMoneda: item?.type,
                }

            }
        })
    }

    return obData

}

export const formatedCoins = (data) => {

    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id]: {
                    icon: addIcon(item.coin),
                    name: item?.name,
                    coin: item?.coin,
                    reward: item?.reward,
                    reward_block: item?.reward_block,
                    price: item?.price,
                    volume: item?.volume,
                    updated: item?.updated,
                }

            }
        })
    }

    return obData

}

const addIcon = (name) => {
    // const setname = name.toLowerCase()
    // console.log(setname)


    // return <img src={api    } alt={name} />

}

export const formatMachines = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id]: {
                    name: item?.name,
                    type: item?.type,
                    brand: item?.brand,
                    status: item?.status,
                }

            }
        })
    }

    return obData
}

export const formatedOperationsData = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_operations]: {
                    id_operations: item?.id_operations,
                    cliente: item?.id_client,
                    monto: (item?.btc !== '0' ? item.btc : item.amount),
                    comision: item?.commission,
                    tipoOperaciones: item?.type,
                    tipoMoneda: (item?.btc !== '0' ? 'BTC' : 'USDT'),
                    fecha: formatoDate(item?.created),
                    created: item?.created,
                }

            }
        })
    }

    return obData
}


/**
 * @param dataList Lista de Objetos con datos a ser filtrados
 * @param filter Objeto con los filtros que debe ser iterado y filtrado el dataList
* */
export const filteredDataOperations = (dataList, filter) => {
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
                        const fechaTicket = new Date(filteredData[item].created)
                        const fechaFiltro = filter[filtro]
                        return fechaTicket.toISOString().substring(0, 10) <= fechaFiltro.toISOString().substring(0, 10)
                    }

                    if (filtro === 'desde') {
                        const fechaTicket = new Date(filteredData[item].created)
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
export const filteredDataImportations = (dataList, filter) => {
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
                        const fechaImportacion = new Date(filteredData[item].created_at_imp)
                        const fechaFiltro = filter[filtro]
                        return fechaImportacion.toISOString().substring(0, 10) <= fechaFiltro.toISOString().substring(0, 10)
                    }

                    if (filtro === 'desde') {
                        const fechaImportacion = new Date(filteredData[item].created_at_imp)
                        const fechaFiltro = filter[filtro]
                        return fechaImportacion.toISOString().substring(0, 10) >= fechaFiltro.toISOString().substring(0, 10)
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

export const gastosFormated = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_gasto]: {
                    id_gasto: item?.id_gasto,
                    description: item?.description,
                    amount: formatNumber(item?.amount),
                    type: item?.type,
                    created_at: formatoDate(item?.created_at),
                    updated_at: formatoDate(item?.updated_at),
                    created_at_gasto: item?.created_at,
                    actions: 'x x',
                }
            }
        })
    }

    return obData
}

export const formatNumber = (number) => {
    return new Intl.NumberFormat("de-DE").format(number) + ' PYG'
}

/**
 * @param dataList Lista de Objetos con datos a ser filtrados
 * @param filter Objeto con los filtros que debe ser iterado y filtrado el dataList
* */
export const filteredDataGastos = (dataList, filter) => {
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
                        const fechaGasto = new Date(filteredData[item].created_at_gasto)
                        const fechaFiltro = filter[filtro]
                        return fechaGasto.toISOString().substring(0, 10) <= fechaFiltro.toISOString().substring(0, 10)
                    }

                    if (filtro === 'desde') {
                        const fechaGasto = new Date(filteredData[item].created_at_gasto)
                        const fechaFiltro = filter[filtro]
                        return fechaGasto.toISOString().substring(0, 10) >= fechaFiltro.toISOString().substring(0, 10)
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

export const formatCoins = (data, dollar) => {

    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id]: {
                    logo: formatLogo(item?.logo),
                    name: item?.name,
                    symbol: item?.symbol,
                    price: dollar + " USD",
                }
            }
        })
    }

    return obData
}

export const formatLogo = (logo) => {
    return <img src={logo} alt="logo" width="30" height="30" />
}


export const coinMinigFormated = (data, btcValue, logoBitcoin) => {
    let obData = {}

    if (data) {
        data?.map(item => {

            obData = {
                ...obData,
                [item?.id_coinmining]: {
                    amount: formatBtcData(logoBitcoin, item?.amount),
                    dollar: formatNumberrrr(item?.amount, btcValue),
                    created_at: formatoDate(item?.created_at),
                    creatted_at_temp: item?.created_at,
                }
            }
        })
    }

    /**ORDER BY DATE */
    const sorted = Object.values(obData).sort((a, b) => {

        return new Date(a.creatted_at_temp) - new Date(b.creatted_at_temp);
    });

    return sorted
}

export const formatNumberrrr = (number, btcValue) => {
    const btcvalue = Number(number)
    const price = Number(btcValue)

    const total = btcvalue * price

    return new Intl.NumberFormat("de-DE").format(total) + ' USD'

}


export const formatBtcData = (logoBitcoin, number) => {
    return <span>{formatLogo(logoBitcoin)}  {"  " + number} BTC </span>
}


/**
 * @param dataList Lista de Objetos con datos a ser filtrados
 * @param filter Objeto con los filtros que debe ser iterado y filtrado el dataList
* */
export const filteredDataMiners = (dataList, filter) => {
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
                        const fechaMineer = new Date(filteredData[item].creatted_at_temp)
                        const fechaFiltro = filter[filtro]
                        return fechaMineer.toISOString().substring(0, 10) <= fechaFiltro.toISOString().substring(0, 10)
                    }

                    if (filtro === 'desde') {
                        const fechaMineer = new Date(filteredData[item].creatted_at_temp)
                        const fechaFiltro = filter[filtro]
                        return fechaMineer.toISOString().substring(0, 10) >= fechaFiltro.toISOString().substring(0, 10)
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
