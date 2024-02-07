import cloudImageIcon from "../assets/cloudImageIcon.webp";
import searchImageIcon from "../assets/searchImageIcon.jpg";
import { GiWhirlwind } from "react-icons/gi";
import humidityIconImage from "../assets/humidityIconImage.png";
import rainyweatherIcon from "../assets/rainyweatherIcon.png";
import scatterImageicon from "../assets/scatterImageicon.png";
import snowWeatherIcon from "../assets/snowWeatherIcon.jpg";
import sunImage from "../assets/sunImage.jpg";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [wIcon, setWIcon] = useState(cloudImageIcon);

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ab5c12ae15f3261a63509e987f2e9a92&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res.data);
          if (res.data.weather[0].icon === "01d") {
            setWIcon(sunImage);
          } else if (res.data.weather[0].icon == "02d") {
            setWIcon(cloudImageIcon);
          } else if (res.data.weather[0].icon == "03d") {
            setWIcon(scatterImageicon);
          } else if (res.data.weather[0].icon == "04d") {
            setWIcon(scatterImageicon);
          } else if (res.data.weather[0].icon == "09d") {
            setWIcon(rainyweatherIcon);
          } else if (res.data.weather[0].icon == "10d") {
            setWIcon(rainyweatherIcon);
          } else if (res.data.weather[0].icon == "13d") {
            setWIcon(snowWeatherIcon);
          } else {
            setWIcon(sunImage);
          }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setError("Invalid City Name");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="w-full h-screen bg-blue-300 flex justify-center items-center">
      <div className="bg-gradient-to-r from-cyan-700 to-blue-700  w-96  rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center mt-3">
          <input
            type="text"
            placeholder="Enter City Name"
            className="px-12 py-3 m-4 rounded-full outline-none hover:scale-105 duration-200"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="hover:cursor-pointer bg-white rounded-full w-12 h-12 flex justify-center items-center hover:scale-105 duration-200 
          "
            onClick={handleClick}
          >
            <img
              src={searchImageIcon}
              alt=""
              className="w-8 h-8 mix-blend-multiply "
            />
          </button>
        </div>

        <div className="text-red-800 mx-10">
          <p>{error}</p>
        </div>

        <div className="mt-6">
          <img
            src={wIcon}
            alt=""
            className="w-34 h-32 ml-32 mix-blend-multiply "
          />
          <h1 className="text-white text-center text-5xl mt-3">
            {Math.round(data.celcius)}°c
          </h1>
          <h2 className="text-white text-center text-4xl mt-2">{data.name}</h2>

          {/* Humidity & wind */}
          <div className="flex flex-row items-center justify-between mx-6 mt-24 mb-8">
            <div className="flex ">
              <img src={humidityIconImage} alt="" className="h-14 w-14   " />
              <div className="ml-1 text-xl font-semibold">
                <p className="text-white ">{Math.round(data.humidity)}%</p>
                <p className="text-white pt-1">Humidity</p>
              </div>
            </div>
            <div className="flex">
              <GiWhirlwind size={65} color="white" />
              <div className="ml-1 text-xl font-semibold">
                <p className="text-white ">{Math.round(data.speed)} km/h</p>
                <p className="text-white pt-1">Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
