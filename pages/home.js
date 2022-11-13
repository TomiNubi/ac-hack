import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <header id = "main-header">
          <button color={"MediumSeaGreen"}>Points</button>
          <button color={"green"}>Reedem</button>
      </header>
        <header>
          <h1>
            {"Your points..."}</h1>
            </header>
            <div className=" something">
              <button onClick={() => {
                navigate("/QR")
              }} color= 'white'> QR Access </button>
              </div>home</div>
    )
  }
}
