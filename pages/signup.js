import React, { Component } from 'react'
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import {db, auth, app} from "../firebase-config"
import { emailCheck } from '../Backend/email checker';
import { withRouter } from 'next/router'
import Link from 'next/link';



export default class Signup extends Component {

    constructor({router}){
        super();
        this.state = {userProfile: {
            'email' : 'user7@sample.com',
            'password' : 'samplepassword',
            'type' : 'business',
            'points' : 0,
            'QR code': 'sample stuff',
            

        }, auth : auth, db: db, count: 10, loading: true,
            type : "customer"};
    }
   
    componentDidMount(){
      //  this.setState({user: auth.currentUser});
        onAuthStateChanged(this.state.auth, (user) => {
            this.setState({user: user}, () => {
                this.setState({loading: false});
                console.log(user)
            });
    })

}
    initialiseUserProfile = (user, profile) => {
        console.log("initialise profile called")
        profile = {
            'name': this.state.name,
            'points' : 0
        }
        console.log(this.state.type)
        
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
                this.setState({user: user})
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
        console.log("Dropdown value " + e.target.value)
        this.setState({type:e.target.value})
  
      }

  render() {
    return this.state.loading? <></> : 
    this.state.user? 
    <div>
        <p>Welcome </p> 
        <Link href={`/${this.state.type}`}> Let's go </Link>
    
    </div> :
     (
      <div>

    <div class="cream" >
        <input type="text" className="form_input" name="name" onChange={this.setName} autofocus placeholder='Name'/><br/><br/>
            <input type="text" className="form_input" name="username" onChange={this.setEmail} autofocus placeholder='Username'/><br/><br/>
            <input type="password" className="form_inputP" name="pword" onChange={this.setPassword} autofocus placeholder='Password' /><br/><br/>
            <div>
            <select value={this.state.type}  onChange={this.setType} name="type">
                <option value="customer">Customer</option>
                <option value="business">Business</option>
                <option value="supplier">Supplier</option>
            </select>
            </div>
          
            <p className="forgot_password">Forgot Password</p>
            <p className="bussiness">Business</p>
            <button class="form_submit" value="Sign In" onClick={this.signUpWithEmailAndPassword}> Sign up </button>
      </div> 
        
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
