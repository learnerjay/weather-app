import React, {Component} from "react";

import "./App.css";

import "./sass/app.scss";

import TopSection from "./components/top/index"
import BottomSection from "./components/bottom/index";

import axios from "axios";
//import { EventEmitter } from "events";
const WEATHER_KEY = "a34d45875d8d51720f36285f0d1008503";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
       cityName: "hyderabad",
       //forecastDays: 5,
       //isLoading: true,
    };
  }

  updateWeather(){
    const {cityName, forecastDays} = this.state;

    const URL = `http://api.weatherstack.com/current?access_key=${WEATHER_KEY}&query=${cityName}&days=${forecastDays}`;
    axios
    .get(URL)
    .then(res => {
      return res.data;
    }).then((data) =>{
      this.setState({  location:data.location.region,temperature:data.current.temperature, is_day: data.current.is_day,
       weather_descriptions: data.current.weather_descriptions, weather_icons: data.current.weather_icons, wind_speed: data.current.wind_speed })
    })
    .catch(err => {
      if(err) console.error("Cannot fetch Weather Data from API", err);
    });
  }

  componentDidMount() {
    const { eventEmitter } = this.props; 
    
    this.updateWeather();

    eventEmitter.on("updateWeather", data =>{
      this.setState({cityName: data }, () => this.updateWeather());
      console.log("locationName", data);
    });
  }
  render() {
    const { isLoading, cityName, temperature, is_day, weather_descriptions, weather_icons, wind_speed } = this.state;
   
    return (
      <div className="app-container">
       <div className= "main-container">
         {isLoading && <h3>Loading weather...</h3>}
         {!isLoading && 
          <div className="top-section"><TopSection location={cityName} temperature={temperature} is_day={is_day} weather_descriptions={weather_descriptions} weather_icons={weather_icons} eventEmitter={this.props.eventEmitter}/></div>}
          <div className="bottom-section"><BottomSection wind_speed={wind_speed} eventEmitter={this.props.eventEmitter}/></div>
       </div>
      </div>
    );
  } 
}
export default App;
