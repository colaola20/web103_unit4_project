import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarsAPI from '../services/CarsAPI'
import '../css/CarDetails.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const data = await CarsAPI.getCarById(id)
            if (!data || data.error) {
                setError('Car not found.')
            } else {
                setCar(data)
            }
            setLoading(false)
        }
        fetchCar()
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${car.name}"? This cannot be undone.`)) return
        await CarsAPI.deleteCar(id)
        navigate('/customcars')
    }

    if (loading) return <p className="car-details-status">Loading...</p>
    if (error)   return <p className="car-details-status">{error}</p>

    return (
        <div className="car-details-wrapper">
            <div className="car-details-card">
                <div className="car-details-header">
                    <h1>{car.name}</h1>
                </div>

                <div className="car-details-body">
                    <div className="car-details-spec">
                        <span className="spec-label">Convertible</span>
                        <span className="spec-value">{car.convertible ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="car-details-spec">
                        <span className="spec-label">Exterior</span>
                        <span className="spec-value">{car.exterior}</span>
                    </div>
                    <div className="car-details-spec">
                        <span className="spec-label">Roof</span>
                        <span className="spec-value">{car.roof}</span>
                    </div>
                    <div className="car-details-spec">
                        <span className="spec-label">Wheels</span>
                        <span className="spec-value">{car.wheels}</span>
                    </div>
                    <div className="car-details-spec">
                        <span className="spec-label">Interior</span>
                        <span className="spec-value">{car.interior}</span>
                    </div>
                </div>

                <div className="car-details-footer">
                    <span className="car-details-price">${car.price?.toLocaleString()}</span>
                    <div className="car-details-actions">
                        <button className="btn-edit" onClick={() => navigate(`/edit/${car.id}`)}>
                            Edit
                        </button>
                        <button className="btn-delete" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails
