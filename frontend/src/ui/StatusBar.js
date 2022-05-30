import React from 'react'
const StatusBar = ({ items }) => {
  return (
    <div className='status-bar'>
      { items ? items.map((item, i) =>
        // using index as key is not ideal:
        // https://reactjs.org/docs/lists-and-keys.html#keys
        <p key={i} className='status-bar-field'>{item}</p>
      ) : <></> }
    </div>
  )
}

export default StatusBar
