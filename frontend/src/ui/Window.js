import { useState } from 'react'
import StatusBar from './StatusBar'

const Window = ({ id, title, children, statusItems, closeHandler }) => {
  const [ minimized, setMinimized ] = useState(false)
  return (
    <div className='window' id={id}>
      <div className='title-bar'>
        <span className='title-bar-text'>{ title }</span>
        <span className='title-bar-controls'>
          <button aria-label="Minimize" onClick={() => setMinimized(!minimized)}></button>
          <button aria-label="Maximize" onClick={() => setMinimized(false)}></button>
          <button aria-label="Close" onClick={closeHandler}></button>
        </span>
      </div>
      <div
        className='window-body'
        style={
          minimized
          ? { display: 'none' }
          : { display: 'block' }
        }
      >
      {
        children
      }
      </div>
      { statusItems ? <StatusBar items={statusItems} /> : <></> }
    </div>
  )
}

export default Window
