import React from 'react';
import {Links} from 'react-router-dom';

function Niv(props){

    function setdata() {
        if (document.getElementById("notification").hidden==false)
        document.getElementById("notification").hidden=true;
        else
        document.getElementById("notification").hidden=false;
       
      }
    return  <div className="topbar">
    <div className="topbarWrapper">
      <div className="topLft">
          <span className="lgo">{props.name}</span>
      </div>
      <div className="topRgt">

          <div className="topIcon">
              Hi!
              <span className="topIconbadge"></span>
          </div>
      </div>
     
    </div>
    
  </div>
}
export default Niv;


    
