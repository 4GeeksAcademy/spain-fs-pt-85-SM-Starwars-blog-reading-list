import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/details-view.css";

//se me ocurre crear un objeto enorme con los nombres de los personajes de starwars como key y como valor poner la ruta de la imágen

export const PlanetDetails = () => {
	const { store, actions } = useContext(Context);
	// console.log(store.characterSpecificDetails.result.properties, "aqui");
	const planetSpecificDetails = store.planetSpecificDetails.result.properties
	
	return (
		<div>
			<div>
				<div className="col-11 d-flex justify-content-around mt-6">
					<img className="col-6" src="https://cdn.ncbi.nlm.nih.gov/corehtml/query/egifs/https:--ashpublications.org-images-blood-pubmed.jpg"></img>
					<div className="col-6 text-center">
						<h1>{planetSpecificDetails.name}</h1>
						<p className="aurek-font">
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
				</div>
				<div className="d-flex flex-wrap justify-content-around ">
					<span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
						NAME <br></br>
						{planetSpecificDetails.name}
					</span>
					<span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
						DIAMETER <br></br>
						{planetSpecificDetails.diameter}
					</span>
					<span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
						ROTATION PERIOD <br></br>
						{planetSpecificDetails.rotation_period}
					</span>
					<span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
						ORBITAL PERIOD <br></br>
						{planetSpecificDetails.orbital_period}
					</span>
					<span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
						GRAVITY <br></br>
						{planetSpecificDetails.gravity}
					</span>
					<span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
						CLIMATE <br></br>
						{planetSpecificDetails.climate	}
					</span>
				</div>
			</div>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
