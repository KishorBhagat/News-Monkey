import React, { Component } from 'react'

export class Logo extends Component {
  render() {
    return (
      <div>
        <span style={{border: '2px solid white', boxSizing: 'border-box', backgroundColor: 'white', display: 'flex', alignItems: 'center',}}><span style={{color: '#dc3545', fontWeight: '700'}}> News&nbsp;</span> <span style={{backgroundColor: '#dc3545', color: 'white'}}>&nbsp;Monkey&nbsp;</span></span>
      </div>
    )
  }
}

export default Logo