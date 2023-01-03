import PropTypes from 'prop-types'

const ClockDisplay = (props) => {
  return <div>{props.currentTime.toLocaleString()}</div>
}

export default ClockDisplay

ClockDisplay.propTypes = {
  currentTime: PropTypes.object
}
