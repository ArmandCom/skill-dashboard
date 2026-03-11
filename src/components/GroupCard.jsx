import { useState } from 'react'
import SkillBar from './SkillBar'
import AddSkillModal from './AddSkillModal'
import './GroupCard.css'

function GroupCard({ group, onAddSkill, onDeleteSkill, onUpdateConfidence, onDeleteGroup }) {
  const [showAddSkill, setShowAddSkill] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const avgConfidence = group.skills.length > 0
    ? Math.round(group.skills.reduce((sum, s) => sum + s.confidence, 0) / group.skills.length)
    : null

  return (
    <div className="group-card">
      <div className="group-header">
        <div className="group-meta">
          <span className="group-emoji">{group.emoji}</span>
          <div className="group-title-block">
            <h2 className="group-name">{group.name}</h2>
            {avgConfidence !== null && (
              <span className="group-avg" style={{ color: group.color }}>
                {avgConfidence}% avg confidence
              </span>
            )}
          </div>
        </div>
        <div className="group-controls">
          <button className="ctrl-btn" onClick={() => setShowAddSkill(true)} aria-label="Add skill">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="options-wrap">
            <button className="ctrl-btn" onClick={() => setShowOptions(v => !v)} aria-label="Options">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="3" r="1.3" fill="currentColor"/>
                <circle cx="8" cy="8" r="1.3" fill="currentColor"/>
                <circle cx="8" cy="13" r="1.3" fill="currentColor"/>
              </svg>
            </button>
            {showOptions && (
              <>
                <div className="options-backdrop" onClick={() => setShowOptions(false)} />
                <div className="options-menu">
                  <button
                    className="options-item danger"
                    onClick={() => { onDeleteGroup(); setShowOptions(false) }}
                  >
                    Delete group
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {group.skills.length === 0 ? (
        <div className="no-skills">
          <button className="add-first-btn" onClick={() => setShowAddSkill(true)}>
            + Add your first skill
          </button>
        </div>
      ) : (
        <div className="skills-row">
          {group.skills.map(skill => (
            <SkillBar
              key={skill.id}
              skill={skill}
              color={group.color}
              onUpdate={(val) => onUpdateConfidence(skill.id, val)}
              onDelete={() => onDeleteSkill(skill.id)}
            />
          ))}
        </div>
      )}

      {showAddSkill && (
        <AddSkillModal
          onAdd={(name) => { onAddSkill(name); setShowAddSkill(false) }}
          onClose={() => setShowAddSkill(false)}
        />
      )}
    </div>
  )
}

export default GroupCard
