const Toggle = ({ setState, state }) => {
  return (
    <div className="toggle-timer">
      <span>timer</span>
      <label className="switch">
        <input type="checkbox" onClick={() => setState(!state)}></input>
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default Toggle
