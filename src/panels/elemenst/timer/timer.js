import React from 'react'
import PropTypes from 'prop-types';
import CountDown from './countdown'
import CountUp from './countup'

function Timer ({ countDown, startTime }) {
  if (countDown && startTime > 0) return <CountDown startTime={startTime} />
  if (!countDown) return <CountUp />
  return <span/>
}
Timer.propTypes = {
  countDown: PropTypes.bool,
  startTime: PropTypes.number
}
export default Timer
