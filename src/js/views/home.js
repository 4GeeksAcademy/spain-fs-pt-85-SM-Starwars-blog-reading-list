import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import HomeCard from "../component/home-card.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { throttle } from "lodash";

const Home = () => {
	// destructuración de context
	const { store, actions } = useContext(Context);
	const characters = store.characters;
	const vehicles = store.vehicles;
	const planets = store.planets;
	const navigate = useNavigate();
	// hooks necesarios para el click and drag
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

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

	const handleCharactersScroll = (e) => {
		const target = e.target;
		// console.log("Scroll event:", e.target.scrollLeft);
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			console.log("Cerca del final, cargando más...");
			actions.getCharacters();
		}
	};

	const handleVehiclesScroll = (e) => {
		const target = e.target;
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			console.log("Cerca del final, cargando más...");
			actions.getVehicles();
		}
	}

	const handlePlanetsScroll = (e) => {
		const target = e.target;
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			console.log("Cerca del final, cargando más...");
			actions.getPlanets();
		}
	}

	const handleMouseDown = (e) => {
		const target = e.currentTarget;
		e.preventDefault();
		setIsMouseDown(true);
		setStartX(e.pageX - target.offsetLeft);
		setScrollLeft(target.scrollLeft)		
	}

	const handleMouseUp = () => {
		setIsMouseDown(false);
	}

	const handleMouseLeave = () => {
		setIsMouseDown(false);
	}

	const handleMouseMove = (e) => {
		const target = e.currentTarget;
		if (!isMouseDown) return;
		e.preventDefault();
		const x = e.pageX - target.offsetLeft
		const walk = (x - startX) * 2
		target.scrollLeft = scrollLeft - walk
	}

	return (
		<div className="d-flex flex-column mt-6">
			<h1 className="text-center mt-5">Characters</h1>
			<span className="mb-2 text-center">Showing {store.characters.length} out of 82 characters</span>
			<div className="mb-5 d-flex flex-row custom-scroll-bar custom-scroller" 
			onScroll={handleCharactersScroll}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			>
				{characterCardGenerator}
			</div>
			<h1 className="mt-5 text-center">Vehicles</h1>
			<span className="mb-2 text-center">Showing {store.vehicles.length} out of 39 vehicles</span>
			<div className="mb-5 d-flex flex-row custom-scroll-bar custom-scroller" 
			onScroll={handleVehiclesScroll}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			>
				{vehicleCardGenerator}
			</div>
			<h1 className="mt-5 text-center">Planets</h1>
			<span className="mb-2 text-center">Showing {store.planets.length} out of 60 planets</span>
			<div className="d-flex flex-row custom-scroll-bar custom-scroller" 
			onScroll={handlePlanetsScroll}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			>
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