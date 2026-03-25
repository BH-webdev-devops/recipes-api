


export const checkID = (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        if (id < 1 || id > 100 || typeof id !== 'number') {
            return res.status(401).json(`No id provided`)
        }
        next()
    }
    catch (err) {
        console.log(err)
        return res.json(err)
    }
}