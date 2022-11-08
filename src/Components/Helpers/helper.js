/**declaramos las apis correspondientes y asignamos su dirección correspondiente*/
const URL_AUTH_USER = 'http://backend.brxsgo.com/api/auth/login'
const USER = 'http://backend.brxsgo.com/api/user/'
const ROLES = "http://backend.brxsgo.com/roles/"
const ROLEID = "http://backend.brxsgo.com/roles/get/"
const ASSIGNROLE = "http://backend.brxsgo.com/roles/roleadd/"
const TICKETS = "http://backend.brxsgo.com/api/tickets/"
const MINING_MACHINES = "http://backend.brxsgo.com/api/mining/"
const MACHINES = "http://backend.brxsgo.com/api/machines/"
const CLIENT = 'http://backend.brxsgo.com/api/client/'


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
}