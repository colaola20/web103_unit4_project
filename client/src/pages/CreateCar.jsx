import { useState, useEffect } from 'react'
import '../App.css'
import './CreateCar.css'
import OptionsModal from '../components/OptionsModal'
import CustomItemsAPI from '../services/CustomItemsAPI'

const CreateCar = () => {
    const [exteriorOptions, setExteriorOptions] = useState([])

    useEffect(() => {
        const fetchExteriorOptions = async () => {
            const customItems = await CustomItemsAPI.getCustomItems()
            const exterior = customItems.find(item => item.name.toLowerCase() === 'exterior')
            if (exterior) {
                const options = await CustomItemsAPI.getOptionsByCustomItemId(exterior.id)
                setExteriorOptions(options)
                console.log(options)
            }
        }
        fetchExteriorOptions()
    }, [])

    const [car, setCar] = useState({
                                    "name": "",
                                    "convertible": false,
                                    "exterior": "",
                                    "roof": "",
                                    "wheels": "",
                                    "interior": "",
                                    "price": 65000
                                })
    const [showExteriorModal, setShowExteriorModal] = useState(false)

    return (
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
                            Exterior {car.exterior ? `— ${car.exterior.name}` : ''}
                        </button>
                    </li>
                    <li><a href='/roof' role='button'>Roof</a></li>
                    <li><a href='/wheels' role='button'>Wheels</a></li>
                    <li><a href='/interior' role='button'>Interior</a></li>
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
                    <li><a href='/create' role='button'>Create</a></li>
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
        </div>
    )
}

export default CreateCar
