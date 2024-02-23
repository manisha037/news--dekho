import React, { Component } from 'react'


export class Spiner extends Component {
  render() {
    return (
      <div className= "container text-center">
        <img className="my-3" src="./images/loading.gif" alt = "loading"></img>
      </div>
    )
  }
}

export default Spiner;
