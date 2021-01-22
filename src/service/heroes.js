import Axios from "axios";

const baseurl = 'http://localhost:3003/heroes'

/**VISUALIZZA */
const getAll = () => {
    const request = Axios.get(baseurl)

    return request.then(response => response.data)
}

/**CREA */
const create = newObj => {
    const request = Axios.post(baseurl, newObj)
    return request.then(response => response.data)
}

/**MODIFICA */

const update = (id, newObj) => {
    const request = Axios.put(`${baseurl}/${id}`, newObj)
    return request.then(response => response.data)
}

/**ELIMINA */
const deleteHero = id => {
    const request = Axios.delete(`${baseurl}/${id}`)
    return request.then(response => response.data)
}
export default {getAll,create,update,deleteHero}