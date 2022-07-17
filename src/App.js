import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	//state that changes only after the data has Loaded
	const [isLoading, setIsLoading] = React.useState(true);

	//String of a city that will be fixed into the API request
	const [searchCity, setSearchCity] = React.useState("San Jose");

	//API data
	const [weatherData, setWeatherData] = React.useState({});

	React.useEffect(() => {
		getData(searchCity);
	}, []);
	//API call
	const getData = (searchCity) => {
		const endpoint = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + searchCity + "&appid=093596bfcdb03d6033e75f89920801d6";
		axios(endpoint)
			.then((response) => {
				console.log(response.data);
				setWeatherData(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.log("error has occurred");
			});
	};

	function handleInput(value) {
		setSearchCity(value);
	}

	function handleSearch() {
		setIsLoading(true);
		// setInputCity("", setSearchCity(inputCity, getData()));

		//setSearchCity(inputCity);

		getData(searchCity);
		setSearchCity("");
	}
	//Loading content to be displayed until isLoading is false
	const content = isLoading ? (
		<h1> content is is loading...</h1>
	) : (
		<div className="page-container">
			<input
				className="input"
				type="text"
				onChange={(e) => {
					handleInput(e.target.value);
				}}
				value={searchCity}
			/>
			<button
				className="button"
				onClick={() => {
					handleSearch();
				}}>
				Search
			</button>
			<h1 className="location">{weatherData.name}</h1>
			<h4 className="temp">{weatherData.main.temp}</h4>
			<h4 className="weather">{weatherData.weather[0].main}</h4>
		</div>
	);
	return (
		<div className="App">
			<div>{content}</div>
		</div>
	);
}

export default App;
