import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import CarCard from '../components/CarCard'
import '../css/ViewCars.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCars = async () => {
            const data = await CarsAPI.getAllCars()
            setCars(data)
            setLoading(false)
        }
        fetchCars()
    }, [])

    return (
        <div className="view-cars-wrapper">
            <div className='page-title'>
                <h1>Custom Cars</h1>
            </div>
            {loading ? (
                <p className="view-cars-status">Loading cars...</p>
            ) : cars.length === 0 ? (
                <p className="view-cars-status">No cars yet. <span onClick={() => navigate('/')} className="view-cars-link">Create one!</span></p>
            ) : (
                <div className="cars-grid">
                    {cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars
