import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [climate, setClimate] = useState({});
  const [centigrade,setCentigrade]=useState(true)
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a92a0382ce32f4d19d7a67f9eb431e86`
        )
        .then((res) => setClimate(res.data));
    }
  }, []);

  

  document.body.style = "background :rgb(107, 172, 204);";
  const min =climate.main?.temp_min-273.15;
  const new_min=min.toFixed(2)
  const new_max=climate.main?.temp_max- 273.15;
  const new_data=new_max.toFixed(2)
  let flotante = climate.main?.temp - 273.15;
  let newnumber = flotante.toFixed(2);

 const change= ()=>{
  setCentigrade(!centigrade)

 }
 const farenheit = (climate.main?.temp - 273.15)*9/5+32
 const newfareheit=farenheit.toFixed(2)

  return (
    <div className="App">
      <div className="container">
        <div className="first_Item">
          <div className="container_country">
            <h1>
              {climate.name}|{climate.sys?.country}
            </h1>
          </div>
        </div>
        <div className="second_Item">
          <div className="side_img">
            <img
              src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}.png`}
              alt="img_clima"
            />
          </div>
          <div className="data">
            <div className="container_items">
              <div className="first_item">
                <p className="texto">temperature</p>
                <b className="number">{centigrade?`${newnumber}`:`${newfareheit}`} {centigrade? '°C':'°f'}</b>
                <button className="button"  onClick={change} >change to {centigrade?'°f':'°C'}</button>
              </div>
              <div className="second_item">
                <p className="texto">winds</p>
                <b className="number">{climate.wind?.speed} m/s</b>
              </div>
              <div className="second_item">
            <p className="texto">humedaty</p>
                <b className="number">{climate.main?.humidity}%</b>
            </div>
            </div>
         
          </div>
        </div>
        <div className="third_Item">

          <div className="max-min">
            <p>max <i className="fa-solid fa-temperature-three-quarters"></i></p> <b>{new_data}°C</b>
            
            <p>min<i className="fa-solid fa-temperature-empty"></i></p> <b>{new_min}°C</b>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
