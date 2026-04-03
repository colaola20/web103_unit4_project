import React, { useState } from 'react'
import '../css/OptionsModal.css'

const OptionsModal = ({ title, options, currentSelection, onDone, onClose, isConvertible }) => {
    const [selected, setSelected] = useState(currentSelection || null)

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <ul className="modal-options">
                    {options.map((option) => {
                        const locked = option.requiresconvertible && !isConvertible
                        return (
                        <li
                            key={option.id}
                            className={`modal-option ${selected?.id === option.id ? 'selected' : ''} ${locked ? 'option-locked' : ''}`}
                            onClick={() => !locked && setSelected(option)}
                            title={locked ? 'Requires convertible' : undefined}
                        >
                            <span>{option.name}</span>
                            <span className="option-right">
                                {locked && <span className="convertible-warning">Convertible only</span>}
                                <span>${option.price.toLocaleString()}</span>
                            </span>
                        </li>
                        )
                    })}
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
