import {pool} from './database.js'
import './dotenv.js'
import customItems from '../data/customItems.js'
import options from '../data/options.js'

const createCustomItemsTable = async () => {
    const createCustomItemsQuery = `
        DROP TABLE IF EXISTS customItems;

        CREATE TABLE IF NOT EXISTS customItems (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createCustomItemsQuery)
        console.log('🎉 Custom Items table created successfully')
    } catch (err) {
        console.error('⚠️ error creating Custom Items table', err)
    }
}

const seedCustomItemsTable = async () => {
    await createCustomItemsTable()

    customItems.forEach((item) => {
        const insertQuery = {
            text: 'INSERT INTO customItems (name) VALUES ($1)'
        }

        const values = [
            item.name
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting item', err)
                return
            }
            console.log(`✅ ${item.name} item added successfully`)
        })
    })
}

const createOptionsTable = async () => {
    const createOptionsTableQuery = `
        DROP TABLE IF EXISTS options;

        CREATE TABLE IF NOT EXISTS options (
            id SERIAL PRIMARY KEY,
            customItemId INTEGER NOT NULL,
            name VARCHAR(255) NOT NULL,
            price NUMERIC(10,2),
            requiresConvertible BOOLEAN
        )
    `

    try {
        const res = await pool.query(createOptionsTableQuery)
        console.log('🎉 options table created successfully')
    } catch (err) {
        console.error('⚠️ error creating options table', err)
    }
}

const seedOptionsTable = async () => {
    await createOptionsTable()

    options.forEach((option) => {
        const insertQuesry = {
            text: 'INSERT INTO options (customItemId, name, price, requiresConvertible) VALUES ($1, $2, $3, $4)'
        }

        const values = [
            option.category_id,
            option.name,
            option.price,
            option.requires_convertible
        ]

        pool.query(insertQuesry, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting option', err)
                return
            }
            console.log(`✅ ${option.name} option added successfully`)
        })
    })
}

const createCarTable = async () => {
    const createCarQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            convertible BOOLEAN NOT NULL DEFAULT FALSE,
            exterior VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL,
            price NUMERIC(10,2)
        )
    `

    try {
        const res = await pool.query(createCarQuery)
        console.log('🎉 Cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating Car table', err)
    }
}

seedCustomItemsTable()
seedOptionsTable()
createCarTable()