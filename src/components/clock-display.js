import PropTypes from 'prop-types'

const ClockDisplay = (props) => {
  return <div>{props.currentTimeObj.toLocaleString()}</div>
}

export default ClockDisplay

ClockDisplay.propTypes = {
  currentTimeObj: PropTypes.object
}
