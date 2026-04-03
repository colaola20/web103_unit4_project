import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/App.css'
import '../css/CreateCar.css'
import OptionsModal from '../components/OptionsModal'
import CustomItemsAPI from '../services/CustomItemsAPI'
import CarsAPI from '../services/CarsAPI'

const CreateCar = () => {
    const navigate = useNavigate()
    const [exteriorOptions, setExteriorOptions] = useState([])
    const [roofOptions, setRoofOptions] = useState([])
    const [wheelsOptions, setWheelsOptions] = useState([])
    const [interiorOptions, setInteriorOptions] = useState([])

    useEffect(() => {
        const fetchOptions = async () => {
            const [exterior, roof, wheels, interior] = await Promise.all([
                CustomItemsAPI.getOptionsByCategory('exterior'),
                CustomItemsAPI.getOptionsByCategory('roof'),
                CustomItemsAPI.getOptionsByCategory('wheels'),
                CustomItemsAPI.getOptionsByCategory('interior'),
            ])
            setExteriorOptions(exterior)
            setRoofOptions(roof)
            setWheelsOptions(wheels)
            setInteriorOptions(interior)
        }
        fetchOptions()
    }, [])

    const BASE_PRICE = 65000

    const [car, setCar] = useState({
                                    "name": "",
                                    "convertible": false,
                                    "exterior": null,
                                    "roof": null,
                                    "wheels": null,
                                    "interior": null,
                                    "price": BASE_PRICE
                                })

    const totalPrice = BASE_PRICE +
        (car.convertible ? 10000 : 0) +
        (parseInt(car.exterior?.price) || 0) +
        (parseInt(car.roof?.price) || 0) +
        (parseInt(car.wheels?.price) || 0) +
        (parseInt(car.interior?.price) || 0)
    const handleCreate = async () => {
        const newCar = await CarsAPI.createCar({
            name: car.name,
            convertible: car.convertible,
            exterior: car.exterior?.name,
            roof: car.roof?.name,
            wheels: car.wheels?.name,
            interior: car.interior?.name,
            price: totalPrice
        })
        navigate(`/customcars/${newCar.id}`)
    }

    const [showExteriorModal, setShowExteriorModal] = useState(false)
    const [showRoofModal, setShowRoofModal] = useState(false)
    const [showWheelsModal, setShowWheelsModal] = useState(false)
    const [showInteriorModal, setShowInteriorModal] = useState(false)

    return (
        <div className='container-wraper'>
            <div className="create-car-container">
                <div className="custom-items">
                    <label>
                        <input
                            type="checkbox"
                            checked={car.convertible}
                            onChange={(e) => setCar({ ...car, convertible: e.target.checked })}
                        />
                        Convertible
                    </label>
                    <ul>
                        <li>
                            <button className={car.exterior ? 'option-selected' : ''} onClick={() => setShowExteriorModal(true)}>
                                Exterior
                            </button>
                        </li>
                        <li>
                            <button className={car.roof ? 'option-selected' : ''} onClick={() => setShowRoofModal(true)}>
                                Roof
                            </button>
                        </li>
                        <li>
                            <button className={car.wheels ? 'option-selected' : ''} onClick={() => setShowWheelsModal(true)}>
                                Wheels
                            </button>
                        </li>
                        <li>
                            <button className={car.interior ? 'option-selected' : ''} onClick={() => setShowInteriorModal(true)}>
                                Interior
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="actions">
                    <input
                        type="text"
                        value={car.name}
                        onChange={(e) => setCar({ ...car, name: e.target.value })}
                        placeholder="My New Car"
                    />
                    <ul>
                        <li><button onClick={handleCreate}>Create</button></li>
                    </ul>
                </div>
            </div>

            <div className="preview-area">
                <div className="car-specs">
                    <h3>{car.name || 'Unnamed Car'}</h3>
                    <ul className="specs-list">
                        <li>
                            <span className="spec-label">Convertible</span>
                            <span className="spec-value">{car.convertible ? 'Yes' : 'No'}</span>
                        </li>
                        <li>
                            <span className="spec-label">Exterior</span>
                            <span className={`spec-value ${!car.exterior ? 'spec-empty' : ''}`}>
                                {car.exterior ? car.exterior.name : 'Not selected'}
                            </span>
                        </li>
                        <li>
                            <span className="spec-label">Roof</span>
                            <span className={`spec-value ${!car.roof ? 'spec-empty' : ''}`}>
                                {car.roof ? car.roof.name : 'Not selected'}
                            </span>
                        </li>
                        <li>
                            <span className="spec-label">Wheels</span>
                            <span className={`spec-value ${!car.wheels ? 'spec-empty' : ''}`}>
                                {car.wheels ? car.wheels.name : 'Not selected'}
                            </span>
                        </li>
                        <li>
                            <span className="spec-label">Interior</span>
                            <span className={`spec-value ${!car.interior ? 'spec-empty' : ''}`}>
                                {car.interior ? car.interior.name : 'Not selected'}
                            </span>
                        </li>
                    </ul>
                    <div className="specs-price">
                        ${totalPrice.toLocaleString()}
                    </div>
                </div>
            </div>

            {showExteriorModal && (
                <OptionsModal
                    title="Choose Exterior Color"
                    options={exteriorOptions}
                    currentSelection={car.exterior}
                    onDone={(option) => setCar({ ...car, exterior: option })}
                    onClose={() => setShowExteriorModal(false)}
                    isConvertible={car.convertible}
                />
            )}
            {showRoofModal && (
                <OptionsModal
                    title="Choose Roof"
                    options={roofOptions}
                    currentSelection={car.roof}
                    onDone={(option) => setCar({ ...car, roof: option })}
                    onClose={() => setShowRoofModal(false)}
                    isConvertible={car.convertible}
                />
            )}
            {showWheelsModal && (
                <OptionsModal
                    title="Choose Wheels"
                    options={wheelsOptions}
                    currentSelection={car.wheels}
                    onDone={(option) => setCar({ ...car, wheels: option })}
                    onClose={() => setShowWheelsModal(false)}
                    isConvertible={car.convertible}
                />
            )}
            {showInteriorModal && (
                <OptionsModal
                    title="Choose Interior"
                    options={interiorOptions}
                    currentSelection={car.interior}
                    onDone={(option) => setCar({ ...car, interior: option })}
                    onClose={() => setShowInteriorModal(false)}
                    isConvertible={car.convertible}
                />
            )}
        </div>
    )
}

export default CreateCar
