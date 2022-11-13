import React, { Component } from 'react'
//import QrReader from 'react-qr-reader'
import QrScanner from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup
import {ref, onValue, update} from "firebase/database";
import {db, auth, app} from "../firebase-config"
import {onAuthStateChanged } from "firebase/auth";

export default class business extends Component {
    constructor(props){
        super(props)
        this.videoElem = React.createRef(); 
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
            this.setState({customerVal: snapshot.exists()? snapshot.val(): {}})
            console.log(snapshot.val())
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

    scan = () => {
    
        this.setState({scannerOn: true}, () => {
            if (QrScanner.hasCamera()){
                const qrScanner = new QrScanner(
                    this.videoElem.current, 
                    (result) => {
                        console.log('decoded qr code:', result);
                        this.setState({qrCode : result.data},  
                            () => {
                            console.log(this.state.qrCode)
                            this.getUser(this.state.qrCode)
                            this.setState({pointsUpload: true})
                            this.setState({scannerOn: false})
                           qrScanner.stop();
                   }
                    )
                    }
                 
    
                
                ,
                    { highlightScanRegion : true },
                );
    
                qrScanner.start();  
                
            }
            else {
                console.log("No camera")
            }
        })
        
        

    }

    handleAddPoints = (e) => {
        this.setState({noOfBottles : e.target.value})
    }

    updatePoints = (method) => {
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
           console.log(points);
        })

        const businessRef = ref(db, businessBottlesUrl);
        onValue(businessRef, (snapshot) => {
           totalBottles = snapshot.val()
        })

        const updates  = {}

        if (method == "add"){
            updates[pointsUrl] = points += noOfBottles * pointsPerBottle;
            updates[businessBottlesUrl]  =  totalBottles += 1
        }
        else if (method == "remove") {
            updates[pointsUrl] = points -= 10;
        }

       
        return update(ref(db), updates)

    }


    
  render() {
    return (
        
      <div>
        {this.state.loading? <></> :
             <div>
        {this.state.scannerOn? 
        // <QrReader
        //     delay={this.state.delay}
        //     style={previewStyle}
        //     onError={(err) => console.error(err)}
        //     onScan={this.scan}
        // />

           <video ref={this.videoElem}></video>
          : <></>
         
         }
        
        <button  onClick={this.scan}>Collect bottles</button>
            {this.state.pointsUpload? 
                <form>
                    <label>
                        User 
                    </label>
                    <label>
                        Number of points:
                        <input type="text" name="name" onChange={this.handleAddPoints}/>
                    </label>
                    <input type="submit" value="Submit" onClick={this.updatePoints("add")} />
                </form> :<></>
            }
        
        <button>Apply voucher</button>
        </div>
        }
      </div>
    )
  }
}
