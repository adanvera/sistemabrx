
export const formatedDataTicket = (data) => {
    let obData = {}

    if (data) {
        data?.map(item => {
            obData = {
                ...obData,
                [item?.ticketnumber]: {
                    ticketnumber: item.ticketnumber,
                    observacion: item.observacion,
                    registerdate: formatoDate(item.registerdate),
                    state: item.state,
                    createdby: item.createdby,
                    asigned: item.asigned,
                    update: formatoDate(item.update),
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