import React, { Component } from 'react'
import { QrReader } from 'react-qr-reader';

export default class business extends Component {
    constructor(props){
        super(props)
        this.state = {user : "", scannerOn : false}
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


    
  render() {
    return (
      <div>
             
        {this.state.scannerOn? <QrReader
            onResult = { (result, error) => {
            if (!!result) {
                this.setState({qrCode : result?.text});
                this.getCustPoint()
            }

            if (!!error) {
                console.info(error);
            }
            }}
            style={{ width: '100%' }}
         /> : <></>}
        
        <button  onClick={() => this.getCustPoint("add")}>Collect bottles</button>
        <button>Apply voucher</button>
      </div>
    )
  }
}
