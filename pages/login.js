import React, { Component } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase-config"



export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {userProfile: {
            'email' : 'user5@sample.com',
            'password' : 'samplepassword',
            'type' : 'customer',
            'points' : 0,
            'recycles' : [],
            'QR code': 'sample stuff'

        }, auth : auth};
    }

    logInWithEmailAndPassword = () => {
        const email = this.state.userProfile.email
        const password = this.state.userProfile.password
       // this.verifyEmailAndPassword(email, password);
        signInWithEmailAndPassword(this.state.auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged In");
        })
      .catch((error) => {
        console.error(error);
      });
    }

    
    

    render() {
        return (
        <div> 
            <div>

                <button onClick={this.logInWithEmailAndPassword}>
                    Login
                </button>

            </div>
        </div>
        )
    }
}
