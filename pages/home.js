import React, { Component } from 'react'
import logo from "../pictures/logo.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div class="header">
          <img src={logo} alt="logo" width="100" height="100"/>
          Money Tree
        </div>
      <div class="header">
          <button class= "btn">Points</button>
          <button class= "btn">Redeem</button>
          <button class= "btn">Location</button>
          <button class= "btn">Account</button>
      </div>
      <div>
        <header>
          <h1>
            {"Your points..."}</h1>
            </header>
            <div>
              <button onClick={() => {
                navigate("/QR")
              }} color= 'white'> QR Access </button>
              </div>
      </div>home</div>

    )
  }
}
