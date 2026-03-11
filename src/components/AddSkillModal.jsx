import { useState } from 'react'
import './Modal.css'

function AddSkillModal({ onAdd, onClose }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name.trim())
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <h3 className="modal-title">New Skill</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="modal-input"
            type="text"
            placeholder="Skill name (e.g. Strumming)"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            maxLength={30}
          />
          <div className="modal-actions">
            <button type="button" className="modal-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn primary"
              disabled={!name.trim()}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSkillModal
