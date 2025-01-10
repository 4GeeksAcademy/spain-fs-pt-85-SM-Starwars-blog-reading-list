import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import HomeCard from "../component/home-card.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";

const Home = () => {
	// destructuración de context
	const { store, actions } = useContext(Context);
	const characters = store.characters;
	const vehicles = store.vehicles;
	const planets = store.planets;
	const navigate = useNavigate();
	const [classCursorGrabing, setClassCursorGrabing] = useState("custom-scroll-bar-hover")
	// hooks necesarios para el click and drag
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const characterCardGenerator = characters.map((character) => {
		const isFavourite = store.favourites.some(
			(fav) => fav.name === character.name
		);
		
		return (
			<HomeCard
				key={character.name}
				name={character.name}
				isFavourite={isFavourite}
				learnMoreOnClick={() => learnMoreCharacter(character)}
				addFavouriteOnCLick={() => favouriteHandler(character, "character")}
				image={actions.getSpecificCharacterImage(character)}
			/>
		)
	})

	function favouriteHandler(targetItem, typeOfItem){
		for (let i = 0; i < store.favourites.length; i++){
			if (targetItem.name == store.favourites[i].name) {
				targetItem.key = targetItem.name;
				actions.deleteFavourite(targetItem)
				return
			}
		}
		actions.addFavourite(targetItem, typeOfItem)
	}

	async function learnMoreCharacter(targetCharacter) {
		const uid = targetCharacter.uid;
		await actions.getCharacterInfoViaApi(uid)
		console.log(targetCharacter);
		navigate(`/characterDetails/${targetCharacter.uid}`)
	}

	const vehicleCardGenerator = vehicles.map((vehicle) => {
		const isFavourite = store.favourites.some(
			(fav) => fav.name === vehicle.name
		);
		return (
			<HomeCard
				key={vehicle.name}
				name={vehicle.name}
				isFavourite={isFavourite}
				learnMoreOnClick={() => learnMoreVehicle(vehicle)}
				addFavouriteOnCLick={() => favouriteHandler(vehicle, "vehicle")}
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
		const isFavourite = store.favourites.some(
			(fav) => fav.name === planet.name
		);
		return (
			<HomeCard
				key={planet.name}
				name={planet.name}
				isFavourite={isFavourite}
				learnMoreOnClick={() => learnMorePlanet(planet)}
				addFavouriteOnCLick={() => favouriteHandler(planet, "planet")}
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
		setScrollLeft(target.scrollLeft);
		setClassCursorGrabing("custom-scroll-bar-active");	
	}

	const handleMouseUp = () => {
		setIsMouseDown(false);
		setClassCursorGrabing("custom-scroll-bar-hover");
	}

	const handleMouseLeave = () => {
		setIsMouseDown(false);
		setClassCursorGrabing("custom-scroll-bar-hover");
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
		<div className="d-flex flex-column mt-6 col-11 mx-auto border rounded shadow-sm">
			<h1 className="text-center mt-5">Characters</h1>
			<span className="mb-2 text-center">Showing {store.characters.length} out of 82 characters</span>
			<div className={`mb-5 d-flex flex-row custom-scroll-bar ${classCursorGrabing}`} 
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
			<div className={`mb-5 d-flex flex-row custom-scroll-bar ${classCursorGrabing}`}
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
			<div className={`mb-5 d-flex flex-row custom-scroll-bar ${classCursorGrabing}`}
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