import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import './CreateCar.css'
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
            const customItems = await CustomItemsAPI.getCustomItems()

            const fetchByName = async (name) => {
                const item = customItems.find(i => i.name.toLowerCase() === name)
                if (item) return await CustomItemsAPI.getOptionsByCustomItemId(item.id)
                return []
            }

            const [exterior, roof, wheels, interior] = await Promise.all([
                fetchByName('exterior'),
                fetchByName('roof'),
                fetchByName('wheels'),
                fetchByName('interior'),
            ])
            console.log(exterior)
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
                        <button onClick={() => setShowExteriorModal(true)}>
                            Exterior
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setShowRoofModal(true)}>
                            Roof
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setShowWheelsModal(true)}>
                            Wheels
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setShowInteriorModal(true)}>
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

            {showExteriorModal && (
                <OptionsModal
                    title="Choose Exterior Color"
                    options={exteriorOptions}
                    currentSelection={car.exterior}
                    onDone={(option) => setCar({ ...car, exterior: option })}
                    onClose={() => setShowExteriorModal(false)}
                />
            )}
            {showRoofModal && (
                <OptionsModal
                    title="Choose Roof"
                    options={roofOptions}
                    currentSelection={car.roof}
                    onDone={(option) => setCar({ ...car, roof: option })}
                    onClose={() => setShowRoofModal(false)}
                />
            )}
            {showWheelsModal && (
                <OptionsModal
                    title="Choose Wheels"
                    options={wheelsOptions}
                    currentSelection={car.wheels}
                    onDone={(option) => setCar({ ...car, wheels: option })}
                    onClose={() => setShowWheelsModal(false)}
                />
            )}
            {showInteriorModal && (
                <OptionsModal
                    title="Choose Interior"
                    options={interiorOptions}
                    currentSelection={car.interior}
                    onDone={(option) => setCar({ ...car, interior: option })}
                    onClose={() => setShowInteriorModal(false)}
                />
            )}

            </div>
            <div className='price-box'>
                <ul>
                    <li><button>💵 ${totalPrice.toLocaleString()}</button></li>
                </ul>
            </div>
        </div>
    )
}

export default CreateCar
