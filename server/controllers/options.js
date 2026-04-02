import {pool} from '../config/database.js'

const getOptions = async (req, res) => {
    try {
        const customItemId = parseInt(req.params.id)
        const result = await pool.query('SELECT * FROM options ORDER BY id ASC WHERE customItemId = $1', [customItemId])
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('getOptions error:', error)
        res.status(409).json({error: error.message})
    }
}

export default {
    getOptions
}