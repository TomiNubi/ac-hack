import React, { Component } from 'react'
import {getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {ref, onValue} from "firebase/database";
import {db, auth, app} from "../firebase-config"
import QRCode from "react-qr-code";

export default class Customer extends Component {

    constructor(props){
        super(props);
        this.state = {loading: true, auth: auth}
    }

    componentDidMount(){
        onAuthStateChanged(this.state.auth, (user) => {
            this.setState({user: user}, () => {
                
                if (user){
                    this.setState({user: user})
                   
                    const userRef = ref(db, `users/customer/${user.uid}/`);
                    onValue(userRef, (snapshot) => {
                        this.setState({userValues: snapshot.exists()? snapshot.val(): {}}, () => {this.setState({loading: false});})
                    })
                
                }
            });
    
            this.forceUpdate()
    }
    )
    }

    logout = () => {
        signOut(this.state.auth).then(() => {
            //this.setState({user: this.state.auth.currentUser})
            console.log("signed out")
          }).catch((error) => {
            console.error(error)
          });
    }



  render() {
    return (
        
      <div>
         {this.state.loading? <></>: <div>

<div className='contaier'>
          <div className='header'>
            <div className='navbar'>
            <img src='pictures/logo.png' width={50} height={50} alt="logo">
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
             </div>

      </div>
      <div>
        <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "20%" }}
            value={this.state.user.uid}
            viewBox={`0 0 256 256`}
            />
        <div>
            <p>Points : {this.state.userValues.points}</p>
        </div>
      </div> 
      </div>

        
      
      </div>} 
      </div>
    )
  }
}
