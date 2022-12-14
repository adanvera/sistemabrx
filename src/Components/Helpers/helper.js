/**declaramos las apis correspondientes y asignamos su dirección correspondiente*/
const URL_AUTH_USER = 'https://backend.brxsgo.com/api/auth/login'
const USER = 'https://backend.brxsgo.com/api/user/'
const USER_PSW = 'https://backend.brxsgo.com/api/user/psw/'
const RESET_USER_PASS = "https://backend.brxsgo.com/api/user/reset/"
const ROLES = "https://backend.brxsgo.com/api/roles/"
const ROLEID = "https://backend.brxsgo.com/api/roles/get/"
const TICKETS = "https://backend.brxsgo.com/api/tickets/"
const MINING_MACHINES = "https://backend.brxsgo.com/api/mining/"
const MACHINES = "https://backend.brxsgo.com/api/machines/"
const CLIENT = 'https://backend.brxsgo.com/api/client/'
const ASSIGNROLE = "https://backend.brxsgo.com/api/roles/roleadd/"
const OPERATION_PROD = "https://backend.brxsgo.com/api/operation/"
const OPERATION_TEST = "http://localhost:4000/api/operation/"
const TICKET_SUMMARY = "https://backend.brxsgo.com/api/tickets/get/summary"
const MINING_SUMMARY = "https://backend.brxsgo.com/api/mining/get/summary/"
const MACHINES_API = "https://api.minerstat.com/v2/hardware?brand=antminer"
const API_COINS = "https://api.minerstat.com/v2/coins?list=BTC,BCH,BINANCE BTC,2MINERS FLUX,DOGE"
const IMPORTACIONES = "https://backend.brxsgo.com/api/importaciones/"
const DOLLAR_API = "https://dolar.melizeche.com/api/1.0/"
const USER_SUMMARY_ONE = "https://backend.brxsgo.com/api/user/get/summary/"
const PROVEEDORES = "https://backend.brxsgo.com/api/proveedores/"
const GASTOS = "https://backend.brxsgo.com/api/gastos/"
const AMOUNT_MINER_BY_DAY = "https://backend.brxsgo.com/api/mining/get/day/coins/"
const AMOUNT_POWER_BY_DAY = "https://backend.brxsgo.com/api/mining/get/power/amount/"
const CONSUMO = "https://backend.brxsgo.com/api/consumos/"
const COINMINIG = "https://backend.brxsgo.com/api/coinmining/"
const CONSUMO_MACHINE_ULTIMO= "https://backend.brxsgo.com/api/mining/get/power/mes/"
const PARAMETRIZACIONES = "https://backend.brxsgo.com/api/parametrizaciones/"
const PARAMS_API = 'https://backend.brxsgo.com/api/params/'
const ENERGIA = "https://backend.brxsgo.com/api/energias/"

/**exportamos nuestras declaraciones de valores
 * para poder utilizarlas en donde se requieran
 */
export {
    URL_AUTH_USER,
    USER,
    ROLES,
    ROLEID,
    ASSIGNROLE,
    TICKETS,
    MINING_MACHINES,
    MACHINES,
    CLIENT,
    USER_PSW,
    RESET_USER_PASS,
    OPERATION_PROD,
    OPERATION_TEST,
    TICKET_SUMMARY,
    MINING_SUMMARY,
    MACHINES_API,
    API_COINS,
    IMPORTACIONES,
    DOLLAR_API,
    USER_SUMMARY_ONE,
    PROVEEDORES,
    GASTOS,
    AMOUNT_MINER_BY_DAY,
    AMOUNT_POWER_BY_DAY,
    CONSUMO,COINMINIG,
    CONSUMO_MACHINE_ULTIMO,
    PARAMETRIZACIONES,
    ENERGIA,
    PARAMS_API
}