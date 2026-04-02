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

export default {
    getAllCars,
    getCarById
}