import { useState, useEffect } from 'react'
import GroupCard from './components/GroupCard'
import AddGroupModal from './components/AddGroupModal'
import './App.css'

const STORAGE_KEY = 'skill-dashboard-v1'

function App() {
  const [groups, setGroups] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [showAddGroup, setShowAddGroup] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups))
  }, [groups])

  const addGroup = ({ name, emoji, color }) => {
    setGroups(prev => [...prev, {
      id: crypto.randomUUID(),
      name, emoji, color,
      skills: []
    }])
  }

  const deleteGroup = (id) => {
    setGroups(prev => prev.filter(g => g.id !== id))
  }

  const addSkill = (groupId, name) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, skills: [...g.skills, { id: crypto.randomUUID(), name, confidence: 0 }] }
        : g
    ))
  }

  const deleteSkill = (groupId, skillId) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, skills: g.skills.filter(s => s.id !== skillId) }
        : g
    ))
  }

  const updateConfidence = (groupId, skillId, confidence) => {
    setGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, skills: g.skills.map(s => s.id === skillId ? { ...s, confidence } : s) }
        : g
    ))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Skills</h1>
        <button className="app-add-btn" onClick={() => setShowAddGroup(true)} aria-label="Add group">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      <main className="app-main">
        {groups.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◈</div>
            <p className="empty-title">No skill groups yet</p>
            <p className="empty-sub">Tap + to start tracking your progress</p>
          </div>
        ) : (
          <div className="groups-list">
            {groups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onAddSkill={(name) => addSkill(group.id, name)}
                onDeleteSkill={(skillId) => deleteSkill(group.id, skillId)}
                onUpdateConfidence={(skillId, val) => updateConfidence(group.id, skillId, val)}
                onDeleteGroup={() => deleteGroup(group.id)}
              />
            ))}
          </div>
        )}
      </main>

      {showAddGroup && (
        <AddGroupModal
          onAdd={(data) => { addGroup(data); setShowAddGroup(false) }}
          onClose={() => setShowAddGroup(false)}
        />
      )}
    </div>
  )
}

export default App
