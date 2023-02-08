const DisplayToggle = ({ setShowSection, showSection }) => {
  const style = { background: 'black', color: 'white' }
  return (
    <div className="display-toggle">
      <button
        className="display-toggle-btn"
        onClick={() => setShowSection(showSection === 'audio' ? '' : 'audio')}
        style={showSection === 'audio' ? style : null}>
        audio
      </button>
      <button
        className="display-toggle-btn"
        onClick={() => setShowSection(showSection === 'session' ? '' : 'session')}
        style={showSection === 'session' ? style : null}>
        session
      </button>
      <button
        className="display-toggle-btn"
        onClick={() => setShowSection(showSection === 'log' ? '' : 'log')}
        style={showSection === 'log' ? style : null}>
        log
      </button>
      <button
        className="display-toggle-btn"
        onClick={() => setShowSection(showSection === 'categories' ? '' : 'categories')}
        style={showSection === 'categories' ? style : null}>
        categories
      </button>
    </div>
  )
}

export default DisplayToggle
