/**declaramos las apis correspondientes y asignamos su dirección correspondiente*/
const URL_AUTH_USER = 'https://backend.brxsgo.com/api/auth/login'
const USER = 'https://backend.brxsgo.com/api/user/'
const USER_PSW =  'https://backend.brxsgo.com/api/user/psw/'
const ROLES = "https://backend.brxsgo.com/api/roles/"
const ROLEID = "https://backend.brxsgo.com/api/roles/get/"
const TICKETS = "https://backend.brxsgo.com/api/tickets/"
const MINING_MACHINES = "https://backend.brxsgo.com/api/mining/"
const MACHINES = "https://backend.brxsgo.com/api/machines/"
const CLIENT = 'https://backend.brxsgo.com/api/client/'
const ASSIGNROLE = "https://backend.brxsgo.com/api/roles/roleadd/"

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
}