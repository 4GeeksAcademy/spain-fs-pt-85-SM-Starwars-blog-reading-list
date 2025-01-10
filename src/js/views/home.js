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
	// hook para clase de cursor
	const [classCursorGrabing, setClassCursorGrabing] = useState("custom-scroll-bar-hover")
	// hooks necesarios para el click and drag
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	// generador de cartas de personaje
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

	// función de manejo de cambio de boton  de favoritos de dentro de cartas
	function favouriteHandler(targetItem, typeOfItem) {
		for (let i = 0; i < store.favourites.length; i++) {
			if (targetItem.name == store.favourites[i].name) {
				targetItem.key = targetItem.name;
				actions.deleteFavourite(targetItem)
				return
			}
		}
		actions.addFavourite(targetItem, typeOfItem)
	}

	// función para obtener info detallada del personaje despues de dar al botón learn more
	async function learnMoreCharacter(targetCharacter) {
		const uid = targetCharacter.uid;
		await actions.getCharacterInfoViaApi(uid)
		navigate(`/characterDetails/${targetCharacter.uid}`)
	}

	// generador de cartas de vehículos
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
				image={actions.getSpecificVehicleImage(vehicle)}
			/>
		)
	})

	// función para obtener info detallada del vehículo despues de dar al botón learn more
	async function learnMoreVehicle(targetVehicle) {
		const uid = targetVehicle.uid;
		await actions.getVehicleInfoViaApi(uid)
		navigate(`/vehicleDetails/${targetVehicle.uid}`)
	}

	// generador de cartas de planeta
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
				image={actions.getSpecificPlanetImage(planet)}
			/>
		)
	})

	// función para obtener info detallada del planeta despues de dar al botón learn more
	async function learnMorePlanet(targetPlanet) {
		const uid = targetPlanet.uid;
		await actions.getPlanetInfoViaApi(uid)
		navigate(`/planetDetails/${targetPlanet.uid}`)
	}

	// constantes para permitir la carga progresiva de cartas
	const handleCharactersScroll = (e) => {
		const target = e.target;
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			actions.getCharacters();
		}
	};

	const handleVehiclesScroll = (e) => {
		const target = e.target;
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			actions.getVehicles();
		}
	}

	const handlePlanetsScroll = (e) => {
		const target = e.target;
		if (target.scrollLeft + target.offsetWidth >= target.scrollWidth - 400) {
			actions.getPlanets();
		}
	}
	// fin constantes para permitir la carga progresiva de cartas
	// inicio constantes para permitir clicar y arrastrar para el desplazamiento horizontal
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
	// fin constantes para permitir clicar y arrastrar para el desplazamiento horizontal
	return (
		<div className="d-flex flex-column mt-6 col-11 mx-auto border rounded shadow-sm">
			{/* inicio carrusel de cartas de personajes */}
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
			{/* fin carrusel de cartas de personajes */}
			{/* inicio carrusel de cartas de vehículos */}
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
			{/* fin carrusel de cartas de vehículos */}
			{/* inicio carrusel de cartas de planetas */}
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
			{/* fin carrusel de cartas de planetas */}
		</div>
	);
}

export { Home };