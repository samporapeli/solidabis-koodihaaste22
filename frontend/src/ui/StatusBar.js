const StatusBar = ({ items }) => {
  return (
    <div className='status-bar'>
      { items.map(item => 
        <p className='status-bar-field'>{item}</p>
      ) }
    </div>
  )
}

export default StatusBar
