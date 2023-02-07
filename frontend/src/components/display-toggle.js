const DisplayToggle = ({ setShowSection, showSection }) => {
  const style = { background: 'black', color: 'white' }
  return (
    <div>
      <button
        onClick={() => setShowSection(showSection === 'audio' ? '' : 'audio')}
        style={showSection === 'audio' ? style : null}>
        audio
      </button>
      <button
        onClick={() => setShowSection(showSection === 'session' ? '' : 'session')}
        style={showSection === 'session' ? style : null}>
        session
      </button>
      <button
        onClick={() => setShowSection(showSection === 'log' ? '' : 'log')}
        style={showSection === 'log' ? style : null}>
        log
      </button>
      <button
        onClick={() => setShowSection(showSection === 'categories' ? '' : 'categories')}
        style={showSection === 'categories' ? style : null}>
        categories
      </button>
    </div>
  )
}

export default DisplayToggle
