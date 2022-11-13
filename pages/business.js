import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import {ref, onValue} from "firebase/database";
import {db, auth, app} from "../firebase-config"
import {onAuthStateChanged } from "firebase/auth";

export default class business extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : "", 
            scannerOn : false, 
            pointsUpload: false, 
            delay: 100, 
            loading: true,
            result: 'No result', 
            auth: auth}
    }

    componentDidMount(){
        onAuthStateChanged(this.state.auth, (user) => {
            this.setState({user: user}, () => {
                if (user){
                    this.setState({user: user}) 
                    const userRef = ref(db, `users/business/${user.uid}/`);
                    onValue(userRef, (snapshot) => {
                        this.setState({businessValues: snapshot.exists()? snapshot.val(): {}}, () => {this.setState({loading: false});})
                    })
                
                }
            });
    
    }
    )
    }

    getUser =  (uid) => {
        const userRef = ref(db, `users/customer/${uid}/`);
        onValue(userRef, (snapshot) => {
            this.setState({customerVal: snapshot.exists()? snapshot.val(): {}}, () => {
                this.setState({})
            })
            
        })
    }

    getCustPoint = (method) => {
       this.setState({scannerOn: true})
       var points = this.state.user.points
       var userId = this.state.qrCode
       console.log(userId)

    }

    redeem = () => {
        var points = this.state.user.points
        var userId = this.state.user.userID
    }

    scan = async (result) => {
        this.setState({qrCode : result},  () => {
            this.getUser(this.state.qrCode)
            this.setState({scannerOn: false, pointsUpload: true})
        });
        
       // text field:
       // user: user.name
       // points

    }

    handleAddPoints = (e) => {
        this.setState({noOfBottles : e.target.value})
    }

    addBottles = () => {
        //get the qr code
        //update the points of the user
        var points = 0
        var totalBottles = 0
        var pointsUrl = `users/customer/${this.state.qrCode}/points`
        var businessBottlesUrl = `users/business/${this.state.user.uid}/totalBottles`
        const noOfBottles = this.state.noOfBottles
        const pointsPerBottle = this.state.pointsPerBottle

        const customerRef = ref(db, pointsUrl);
        onValue(customerRef, (snapshot) => {
           points = snapshot.val()
        })

        const businessRef = ref(db, businessBottlesUrl);
        onValue(businessRef, (snapshot) => {
           totalBottles = snapshot.val()
        })

        const updates  = {}
        updates[pointsUrl] = points += noOfBottles * pointsPerBottle;
        updates[businessBottlesUrl]  =  totalBottles += 1


        return update(ref(db), updates)

    }


    
  render() {
    const previewStyle = {
        height: 240,
        width: 320,
      }
    return (
        
      <div>
        {this.state.loading? <></> :
             <div>
        {this.state.scannerOn? 
        <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={(err) => console.error(err)}
            onScan={this.scan}
        />
          : <></>
         
         }
        
        <button  onClick={() => this.getCustPoint("add")}>Collect bottles</button>
            {this.state.pointsUpload? 
                <form>
                    <label>
                        User {this.getUser(this.state.qrCode)}
                    </label>
                    <label>
                        Number of points:
                        <input type="text" name="name" onChange={this.addBottlePoints}/>
                    </label>
                    <input type="submit" value="Submit" onClick={this.addBottles} />
                </form> :<></>
            }
        
        <button>Apply voucher</button>
        </div>
        }
      </div>
    )
  }
}
