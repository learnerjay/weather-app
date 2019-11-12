import React from "react";
import "./style.scss";

//import WindSpeed from "../../components/resources/images/windspeed.gif"
export default class Weatherdetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        const {wind_speed} = this.props;
        return <div className="weatherdetails-container">
         <div className="text">{wind_speed}KMPH</div>  
        </div>;
    }
}
