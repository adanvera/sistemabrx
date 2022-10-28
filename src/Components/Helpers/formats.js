
export const formatedDataTicket = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.id_ticket]: {
                    icon: 'construct-outline',
                    id_ticket: item.id_ticket,
                    id_machine: item.id_machine,
                    created_at: formatoDate(item.created_at),
                    id_user: (item.id_user),
                    description_ticket: item.description_ticket,
                    status: item.status,
                    updated_at: formatoDate(item.updated_at),
                    actions: 'x x',
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
                    name: item.name + ' ' + item.last_name,
                    document: item.document,
                    email: item.email,
                    register: formatoDate(item.register),
                    rol: item.rol,
                    status: formatStatus(item.status),
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

