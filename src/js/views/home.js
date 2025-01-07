import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import HomeCard from "../component/home-card.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
// import { useContext } from "react";

const Home = () => {
	// destructuración de context
	const { store, actions } = useContext(Context);
	const characters = store.characters;
	const vehicles = store.vehicles;
	const planets = store.planets;
	// const [characterInfo, setCharacterInfo] = useState({});
	const navigate = useNavigate();

	const characterCardGenerator = characters.map((character) => {
		return (
			<HomeCard
				key={character.name}
				name={character.name}
				learnMoreOnClick={() => learnMoreCharacter(character)}
				addFavouriteOnCLick={() => actions.addFavourite(character, "character")}
				image={actions.getSpecificCharacterImage(character)}
			/>
		)
	})

	async function learnMoreCharacter(targetCharacter) {
		const uid = targetCharacter.uid;
		await actions.getCharacterInfoViaApi(uid)
		console.log(targetCharacter);
		navigate(`/characterDetails/${targetCharacter.uid}`)
	}

	const vehicleCardGenerator = vehicles.map((vehicle) => {
		return (
			<HomeCard
				key={vehicle.name}
				name={vehicle.name}
				learnMoreOnClick={() => learnMoreVehicle(vehicle)}
				addFavouriteOnCLick={() => actions.addFavourite(vehicle, "vehicle")}
			/>
		)
	})

	async function learnMoreVehicle(targetVehicle) {
		const uid = targetVehicle.uid;
		await actions.getVehicleInfoViaApi(uid)
		console.log(targetVehicle);
		navigate(`/vehicleDetails/${targetVehicle.uid}`)
	}

	const planetCardGenerator = planets.map((planet) => {
		return (
			<HomeCard
				key={planet.name}
				name={planet.name}
				learnMoreOnClick={() => learnMorePlanet(planet)}
				addFavouriteOnCLick={() => actions.addFavourite(planet, "planet")}
			/>
		)
	})

	async function learnMorePlanet(targetPlanet) {
		const uid = targetPlanet.uid;
		await actions.getPlanetInfoViaApi(uid)
		console.log(targetPlanet);
		navigate(`/planetDetails/${targetPlanet.uid}`)
	}

	async function getInfo() {
		console.log(store.characterImages);

	}

	const handleCharactersScroll = (event) => {
		const target = event.target;
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			console.log("Cerca del final, cargando más...");
			actions.getCharacters();
		}
	};

	const handleVehiclesScroll = (event) => {
		const target = event.target;
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			console.log("Cerca del final, cargando más...");
			actions.getVehicles();
		}
	}

	const handlePlanetsScroll = (event) => {
		const target = event.target;
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			console.log("Cerca del final, cargando más...");
			actions.getPlanets();
		}
	}

	return (
		<div className="d-flex flex-column mt-5">
			<h1 className="text-center">Characters</h1>
			<span className="mb-2 text-center">Showing {store.characters.length} out of 82 characters</span>
			<div className="mb-5 d-flex flex-row custom-scroll-bar" onScroll={handleCharactersScroll}>
				{characterCardGenerator}
			</div>
			<h1 className="mt-5 text-center">Vehicles</h1>
			<span className="mb-2 text-center">Showing {store.vehicles.length} out of 39 vehicles</span>
			<div className="mb-5 d-flex flex-row custom-scroll-bar" onScroll={handleVehiclesScroll}>
				{vehicleCardGenerator}
			</div>
			<h1 className="mt-5 text-center">Planets</h1>
			<span className="mb-2 text-center">Showing {store.planets.length} out of 60 planets</span>
			<div className="d-flex flex-row custom-scroll-bar" onScroll={handlePlanetsScroll}>
				{planetCardGenerator}
			</div>
			<button onClick={getInfo}>Info</button>
			<a href="#" className="btn btn-success">
				If you see this green button, bootstrap is working
			</a>
		</div>
	);
}

export { Home };