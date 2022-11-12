import React, { Component } from 'react'
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import {db, auth, app} from "../firebase-config"

export default class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {userProfile: {
            'email' : 'user5@sample.com',
            'password' : 'samplepassword',
            'type' : 'customer',
            'points' : 0,
            'recycles' : [],
            'QR code': 'sample stuff'

        }, auth : auth, db: db};
    }

    initialiseUserProfile = (user, profile) => {
        console.log("initialise profile called")
        set(ref(this.state.db, `users/${profile.type}/${user.uid}/`) , this.state.userProfile).then(() => {
            console.log("Updated profile")
        }).catch((e) => console.error(e))

    }

    signUpWithEmailAndPassword = () => {
        const email = this.state.userProfile.email;
        const password = this.state.userProfile.password;
        const profile = this.state.userProfile;
       // this.verifyEmailAndPassword(email, password);
        createUserWithEmailAndPassword(this.state.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                this.initialiseUserProfile(user, profile); 
                console.log("signed up") 
                this.setState({user: this.state.auth.currentUser})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }   

  render() {
    return (
      <div>
        
        <button onClick={this.signUpWithEmailAndPassword}>
            signup
        </button>
      </div>
    )
  }
}
