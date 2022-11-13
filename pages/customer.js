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
                this.setState({loading: false});
                if (user){
                    this.setState({user: user})
                    const userRef = ref(db, `users/customers/${user.uid}/`);
                    onValue(userRef, (snapshot) => {
                        this.setState({userValues: snapshot.exists()? snapshot.val(): {}})
                    })
                }
            });
    
            this.forceUpdate()
    }
    )
    }



  render() {
    return (
        
      <div>
        {this.state.loading? <></>: 
        <div>
        <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={this.state.user.uid}
            viewBox={`0 0 256 256`}
            />
        <div>
            <p>Points : {this.state.userValues.points}</p>
        </div>
      </div> }
      </div>
    )
  }
}
