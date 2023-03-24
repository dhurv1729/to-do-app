import React from 'react'

const PriorityCircle = ({color}) => {
  return (
    <svg height="16" width="16">
    <circle cx="8" cy="10" r="6" fill={color} />
  </svg>
  )
}

export default PriorityCircle