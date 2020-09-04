export const sortById = array => {
    let sortedById = {};
     array.map( el => {
         sortedById = {...sortedById, ...{[el._id] : el }}
    })
    return sortedById
}

export const getMapId = array => {
     return array.map(el =>
        {
            return el._id
        }
    )
}