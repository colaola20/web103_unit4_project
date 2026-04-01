import {pool} from '../config/database.js'

// get, create, edit, and delete cars from your custom items table
const getCustomItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customItems ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('getCustomItems error:', error)
        res.status(409).json({error: error.message})
    }
}

const getCustomItemsById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT *
            FROM options
            WHERE customItemId = $1
        `

        const customItemId = req.params.customItemId
        const results = await pool.query(selectQuery, [customItemId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message} )
    }
}

export default {
    getCustomItems,
    getCustomItemsById
}