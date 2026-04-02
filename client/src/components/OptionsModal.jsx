import React, { useState } from 'react'
import './OptionsModal.css'

const OptionsModal = ({ title, options, currentSelection, onDone, onClose }) => {
    const [selected, setSelected] = useState(currentSelection || null)

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <ul className="modal-options">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className={`modal-option ${selected?.id === option.id ? 'selected' : ''}`}
                            onClick={() => setSelected(option)}
                        >
                            <span>{option.name}</span>
                            <span>${option.price.toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button
                        className="done-btn"
                        disabled={!selected}
                        onClick={() => { onDone(selected); onClose() }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OptionsModal
