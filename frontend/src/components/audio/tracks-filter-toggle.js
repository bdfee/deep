const TracksFilterToggle = ({ showFilter, setShowFilter, params }) => {
  const { id } = params

  const selectStyle = {
    background: showFilter === id ? 'black' : 'transparent',
    color: showFilter === id ? 'white' : 'black'
  }

  return (
    <div
      style={selectStyle}
      onClick={() => {
        setShowFilter(showFilter === id ? '' : id)
      }}>
      {id}
    </div>
  )
}

export default TracksFilterToggle
