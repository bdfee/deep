const DisplayToggle = ({ setShowSection, showSection }) => {
  return (
    <div>
      <button onClick={() => setShowSection(showSection === 'session' ? '' : 'session')}>
        session
      </button>
      <button onClick={() => setShowSection(showSection === 'log' ? '' : 'log')}>log</button>
      <button onClick={() => setShowSection(showSection === 'categories' ? '' : 'categories')}>
        categories
      </button>
    </div>
  )
}

export default DisplayToggle
