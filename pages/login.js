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
        const email = this.state.email
        const password = this.state.password
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

    setEmail = (e) => {

      this.setState({email:e.target.value})

    }

    setPassword = (e) => {

      this.setState({password:e.target.value})

    }

    
    

    render() {
        return (
        <form class="cream" action="home">
        <input type="text" class="form_input" name="username" onChange={this.setEmail} autofocus placeholder='Username'/><br/><br/>
        <input type="password" class="form_inputP" name="pword" onChange={this.setPassword} autofocus placeholder='Password' /><br/><br/>
        <input type="checkbox" class="remember_me" name="rememberme"></input>
        <p class="remember_me_text">Remember Me</p>
        <p class="forgot_password">Forgot Password</p>
        <p class="bussiness">Bussiness</p>
        <input class="form_submit" type="submit" value="Sign In"/>
      </form> 
      

        )
    }
}
