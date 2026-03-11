import { useState, useRef } from 'react'
import './SkillBar.css'

const SEGMENTS = 10

function SkillBar({ skill, color, onUpdate, onDelete }) {
  const [showDelete, setShowDelete] = useState(false)
  const longPressTimer = useRef(null)
  const didLongPress = useRef(false)

  const filledCount = Math.round((skill.confidence / 100) * SEGMENTS)

  const handleSegmentClick = (segmentFromBottom) => {
    if (didLongPress.current) return
    const newConfidence = Math.round(((segmentFromBottom + 1) / SEGMENTS) * 100)
    onUpdate(newConfidence)
    setShowDelete(false)
  }

  const handlePointerDown = () => {
    didLongPress.current = false
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true
      setShowDelete(v => !v)
    }, 550)
  }

  const handlePointerUp = () => clearTimeout(longPressTimer.current)
  const handlePointerLeave = () => clearTimeout(longPressTimer.current)

  return (
    <div className="skill-wrapper">
      {showDelete && (
        <button
          className="delete-badge"
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          aria-label="Delete skill"
        >
          ×
        </button>
      )}
      <div
        className="skill-column"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        {Array.from({ length: SEGMENTS }).map((_, visualIndex) => {
          const segmentFromBottom = SEGMENTS - 1 - visualIndex
          const isFilled = segmentFromBottom < filledCount
          const isTopFilled = isFilled && segmentFromBottom === filledCount - 1
          return (
            <div
              key={visualIndex}
              className={`seg ${isFilled ? 'seg-filled' : 'seg-empty'}`}
              style={isFilled ? {
                background: color,
                boxShadow: isTopFilled ? `0 0 12px ${color}99` : 'none',
              } : {}}
              onClick={() => handleSegmentClick(segmentFromBottom)}
            />
          )
        })}
      </div>
      <div className="skill-info">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-pct" style={{ color: skill.confidence > 0 ? color : undefined }}>
          {skill.confidence}%
        </span>
      </div>
    </div>
  )
}

export default SkillBar
