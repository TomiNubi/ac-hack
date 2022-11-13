import React, { Component } from 'react'
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import {db, auth, app} from "../firebase-config"
import { emailCheck } from '../Backend/email checker';

export default class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {userProfile: {
            'email' : 'user7@sample.com',
            'password' : 'samplepassword',
            'type' : 'business',
            'points' : 0,
            'QR code': 'sample stuff',

        }, auth : auth, db: db, count: 10};
    }


    initialiseUserProfile = (user, profile) => {
        console.log("initialise profile called")
        profile = {
            'name': this.state.name,
            'points' : 0
        }
        
        set(ref(this.state.db, `users/${this.state.type}/${user.uid}/`) , profile).then(() => {
            console.log("Updated profile")
        }).catch((e) => console.error(e))

    }

    signUpWithEmailAndPassword = () => {
        const email = this.state.email;
        const password = this.state.password;
        const profile = this.state.userProfile;
      //  emailCheck(email)
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

    increaseCount = () => {
        this.setState({count: this.state.count + 1})
        console.log(this.state.count)
    }

    setEmail = (e) => {

        this.setState({email : e.target.value})
  
      }
  
      setPassword = (e) => {
  
        this.setState({password:e.target.value})
      }

      setName = (e) => {
  
        this.setState({name:e.target.value})
  
      }
      
      setType = (e) => {
  
        this.setState({type:e.target.value})
  
      }

  render() {
    return (
      <div>

        <form class="cream" action="home">
        <input type="text" class="form_input" name="name" onChange={this.setName} autofocus placeholder='Name'/><br/><br/>
            <input type="text" class="form_input" name="username" onChange={this.setEmail} autofocus placeholder='Username'/><br/><br/>
            <input type="password" class="form_inputP" name="pword" onChange={this.setPassword} autofocus placeholder='Password' /><br/><br/>
            <div>
            <select onChange={this.setType} name="type">
                <option value="customer">Customer</option>
                <option value="business">Business</option>
                <option value="supplier">Supplier</option>
            </select>
            </div>
          
            <p class="forgot_password">Forgot Password</p>
            <p class="bussiness">Business</p>
            <button class="form_submit" value="Sign In" onClick={this.signUpWithEmailAndPassword}> Sign up </button>
      </form> 
        
        <button onClick={this.signUpWithEmailAndPassword}>
            signup
        </button>

        <button onClick={this.increaseCount}>
            increaseCount
        </button>
      </div>
    )
  }
}
