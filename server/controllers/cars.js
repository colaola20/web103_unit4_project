const createCar = async (req, res) => {
    try {
        const { name, exterior, roof, wheels, interior, price } = req.body

        const results = await pool.query(`
            INSERT INTO cars (name, exterior, roof, wheels, interior, price)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [name, exterior, roof, wheels, interior, price]
            )

        res.status(201).json(results.rows[0])

    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, exterior, roof, wheels, interior, price } = req.body
        const result = await pool.query(`
            UPDATE cars SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, price = $6 WHERE id = $8`,
            [name, exterior, roof, wheels, interior, price, id]
        )
        res.status(200).json(results.rows[0])

    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pool.query('DELETE FROM cars WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const getCars = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getCarById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT *
            FROM cars
            WHERE id = $1
        `

        const eventId = req.params.eventId
        const results = await pool.query(selectQuery, [eventId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message} )
    }
}

export default {
    createCar,
    updateCar,
    deleteCar,
    getCars,
    getCarById
}