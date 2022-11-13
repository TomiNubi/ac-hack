import React, { Component } from 'react'
import logo from ".././pictures/./logo.png";

export default class Home extends Component {
  render() {
    return (
        <div className='contaier'>
          <div className='header'>
            <div className='navbar'>
            <img src='../pictures/logo.png' alt="logo">
            </img>
              Company name 
            </div>
              <div>
                <div className='navbar'>
                  <a>
                    <button className='btn'>Points</button>
                  </a>
                  <a>
                    <button className='btn'>Redeem</button>
                  </a>
                  <a>
                    <button className='btn'>Location</button>
                  </a>
                  <a>
                    <button className='btn'>Account</button>
                  </a>
                </div>
            {/* <div className='logoimg'>
            <img className="logoimg" src={logo} alt="logo"/>
             </div>
            
             <div className='companyname'>
              Company Name
             </div>
             <div>
             <button className='btn'>Points</button>
             <button className='btn'>Points</button>
             <button className='btn'>Points</button>
             <button className='btn'>Points</button> */}

             </div>

      </div>
      </div>
      )
    }
}
