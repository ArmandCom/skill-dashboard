import { useState } from 'react'
import './Modal.css'

const COLORS = [
  '#7b68ee',
  '#4f8ef7',
  '#3ecfb4',
  '#f76fa0',
  '#f7a44f',
  '#5dde7d',
  '#ff6b6b',
  '#f7d64f',
]

const EMOJIS = ['🎯', '🎸', '💪', '🧠', '🎨', '📚', '🏃', '💻', '🎵', '🌱', '✍️', '🔬', '🏋️', '🎤', '🍳', '📷']

function AddGroupModal({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🎯')
  const [color, setColor] = useState(COLORS[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ name: name.trim(), emoji, color })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <h3 className="modal-title">New Skill Group</h3>

        <div className="emoji-grid">
          {EMOJIS.map(e => (
            <button
              key={e}
              className={`emoji-btn ${emoji === e ? 'selected' : ''}`}
              style={emoji === e ? { background: color + '28', borderColor: color + '99' } : {}}
              onClick={() => setEmoji(e)}
              type="button"
            >
              {e}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="modal-input"
            type="text"
            placeholder="Group name (e.g. Guitar)"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            maxLength={30}
          />

          <div className="color-row">
            {COLORS.map(c => (
              <button
                key={c}
                type="button"
                className={`color-dot ${color === c ? 'selected' : ''}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={c}
              />
            ))}
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn primary"
              style={{ background: color }}
              disabled={!name.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGroupModal
