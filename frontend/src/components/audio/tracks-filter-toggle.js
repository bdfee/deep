import { isMobile } from 'react-device-detect'

const TracksFilterToggle = ({ showFilter, setShowFilter, params }) => {
  const { id } = params

  const selectStyle = {
    background: showFilter === id ? 'black' : 'transparent',
    color: showFilter === id ? 'white' : 'black'
  }

  const mobileClass = isMobile ? '-mobile' : ''

  return (
    <div
      className={`filter-toggle${mobileClass}`}
      style={selectStyle}
      onClick={() => {
        setShowFilter(showFilter === id ? '' : id)
      }}>
      {id}
    </div>
  )
}

export default TracksFilterToggle
