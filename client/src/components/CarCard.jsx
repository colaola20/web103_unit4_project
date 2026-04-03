import { useNavigate } from 'react-router-dom'
import '../css/CarCard.css'

const CarCard = ({ car }) => {
    const navigate = useNavigate()

    return (
        <div className="car-card">
            <div className="car-card-header">
                <h3>{car.name}</h3>
            </div>
            <div className="car-card-body">
                <div className="car-spec">
                    <span className="spec-label">Convertible</span>
                    <span className="spec-value">{car.convertible ? 'Yes' : 'No'}</span>
                </div>
                <div className="car-spec">
                    <span className="spec-label">Exterior</span>
                    <span className="spec-value">{car.exterior}</span>
                </div>
                <div className="car-spec">
                    <span className="spec-label">Roof</span>
                    <span className="spec-value">{car.roof}</span>
                </div>
                <div className="car-spec">
                    <span className="spec-label">Wheels</span>
                    <span className="spec-value">{car.wheels}</span>
                </div>
                <div className="car-spec">
                    <span className="spec-label">Interior</span>
                    <span className="spec-value">{car.interior}</span>
                </div>
            </div>
            <div className="car-card-footer">
                <span className="car-price">${car.price?.toLocaleString()}</span>
                <button onClick={() => navigate(`/customcars/${car.id}`)}>View Details</button>
            </div>
        </div>
    )
}

export default CarCard
