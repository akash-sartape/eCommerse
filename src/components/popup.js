import React from "react"
import './popup.css'

function Popup (props) {
    return(props.trigger)?(<div className="popup">

    {props.children}
    </div>) : "";
} 

export default Popup