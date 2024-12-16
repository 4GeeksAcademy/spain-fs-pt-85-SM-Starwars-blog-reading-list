import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

//se me ocurre crear un objeto enorme con los nombres de los personajes de starwars como key y como valor poner la ruta de la imágen

export const CharacterDetails = () => {
	const { store, actions } = useContext(Context);
	// console.log(store.characterSpecificDetails.result.properties, "aqui");
	const characterSpecificDetails = store.characterSpecificDetails.result.properties
	
	return (
		<div>
			<div>
				<div className="col-11 d-flex justify-content-around">
					<img className="col-6" src="https://static.wikia.nocookie.net/esstarwars/images/d/d9/Luke-rotjpromo.jpg/revision/latest?cb=20071214134433"></img>
					<p className="col-6 text-center">
						Lorem ipsum dolor sit amet. Aut quod velit in doloremque animi qui iusto animi est laborum porro aut vero commodi
						aut recusandae cumque nam cumque necessitatibus. Id sapiente esse et sunt galisum hic omnis quas aut omnis cumque
						in nostrum praesentium eum adipisci veritatis. Et fuga necessitatibus quo corrupti provident est voluptatibus omnis
						sed blanditiis recusandae quo quia laboriosam.
						<br></br>
						Non facilis nulla ab galisum facilis sit minus dicta et voluptatem praesentium! Eos voluptas provident aut tempore
						molestiae est consequuntur pariatur sit iusto consequatur ut molestiae ipsa a natus accusantium non fugiat dolor.
						Est repellat similique vel accusamus assumenda est illum reiciendis id magni fugit.
						<br></br>
						Ab labore cupiditate 33 dicta earum et corrupti esse ab eveniet asperiores et voluptatem officia quo magni praesentium.
						Et atque ipsa id assumenda cumque aut vero ullam non voluptas fugit et veritatis voluptatum. Sed impedit repellendus
						non fugiat voluptates et quaerat sunt sit culpa tempora sit perspiciatis velit aut asperiores suscipit.
					</p>
				</div>
				<div className="d-flex justify-content-around ">

					<span>{characterSpecificDetails.name}</span>
					<span>{characterSpecificDetails.birth_year}</span>
					<span>{characterSpecificDetails.gender}</span>
					<span>{characterSpecificDetails.height}</span>
					<span>{characterSpecificDetails.skin_color}</span>
					<span>{characterSpecificDetails.eye_color}</span>
				</div>
			</div>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
