import React, { } from 'react';
import loading from './loading.gif';

const Spinner = ()=> {
 
    return (
      <div className="spinner-container my-3" >
        <img src={loading} alt="Loading..." className="spinner-image" style={{ width: "106px",
        height: "106px",textAlign:"center",    marginLeft: "38vw"}}/>
      </div>
    );
  
}

export default Spinner;
