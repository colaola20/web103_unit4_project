const createCar = async (carData) => {
    const response = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    })
    const data = await response.json()
    return data
}

const getAllCars = async () => {
    const response = await fetch('/api/cars')
    const data = await response.json()
    return data
}

const getCarById = async (id) => {
    const response = await fetch (`/api/cars/${id}`)
    const data = await response.json()
    return data
}

const deleteCar = async (id) => {
    const response = await fetch(`/api/cars/${id}`, { method: 'DELETE' })
    return response.ok
}

export default {
    createCar,
    getAllCars,
    getCarById,
    deleteCar
}