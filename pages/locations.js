import React, { Component } from 'react';
// import Background from "../pictures/map.png";

export default class Locations extends Component {
    render() {
      var sectionStyle={
        backgroundImage: "url(https://developers.google.com/static/maps/documentation/android-sdk/images/camera-angle-0-shot_2x.png)",
        height:"90%",
        position: "absolute",
        width:"100%",
        bottom:"0",
        // left: "-166px",
        // top: "-10px",
        backgroundSize: 'cover',
      };

      var search_bar={
        height:"20px",
        position: "absolute",
        width:"100%",
        // left: "-166px",
        // top: "-10px",
      };

      const footer={
        backgroundColor: "#FDF3D1",
        borderTop:"#FDF3D1",
        position: "absolute",
        width: "100%",
        bottom: "0px",
        color: "",
        fontSize: "10px",
      };


      const banner_rectangle={
        backgroundColor: "#FDF3D1",
        border:"black",
        position: "absolute",
        // bottom: "0",
        // padding: "10px 24px", 
        cursor: "pointer",
        width: "390px",
        height: "100px",
        color: "black",
        fontSize: "20px",
        marginRight: "5px",
      };


      const rectangle={
        color: "black",
        display: "inline-block",
        width: "130px",
        height: "40px",
        background: "#52A046",
        bottom: "10px",
      }


        return (
          
          <div>

            <main>
              <div style={sectionStyle}>
              </div>
              <div style={search_bar} >
                ekcjnw

              </div>
              <div style={banner_rectangle}>
                <button style={rectangle}>
                  Nearby
                </button>
                <button style={rectangle}>
                  Recent
                </button>
                <button style={rectangle}>
                  Favourites
                </button>
              </div>
            </main>
      
            <footer>
              <div style={footer}>
              </div>
            </footer>
          
          </div>

      )
    }
}