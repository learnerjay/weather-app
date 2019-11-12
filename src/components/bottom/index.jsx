import React from "react";
import "./style.scss";
import Weatherdetails from "./weatherdetails";
export default class BottomSection extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return <div>
        <Weatherdetails {...this.props} />
        </div>;
    }
}