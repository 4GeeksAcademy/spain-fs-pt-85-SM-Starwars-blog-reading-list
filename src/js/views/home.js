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
	const [characterInfo, setCharacterInfo] = useState({});
	const navigate = useNavigate();

	const characterCardGenerator = characters.map((character) => {
		return (
			<HomeCard
			key={character.uid}
			name={character.name}
			learnMoreOnClick={() => learnMore(character)}
			/>
		)
	})

	async function learnMore(targetCharacter){
		const url = targetCharacter.url;
		await actions.getCharacterInfoViaApi(url)
		navigate("/characterDetails")
	}

	async function getInfo() {
		console.log( await actions.getCharacterInfoViaApi("https://www.swapi.tech/api/people/1"));
		console.log(store.characterSpecificDetails.result.properties);
		
	}

	return (
		<div className="mt-5">
			<h1>Characters</h1>
			<div className="d-flex flex-row overflow-scroll">
				{characterCardGenerator}
			</div>
			<button onClick={getInfo}>Info</button>
			<a href="#" className="btn btn-success">
				If you see this green button, bootstrap is working
			</a>
		</div>
	);
}

export { Home };