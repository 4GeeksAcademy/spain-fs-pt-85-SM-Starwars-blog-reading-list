import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import LiItem from "./favourite-li.jsx";
import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	let liItemGenerator = store.favourites.map((character) => {
		return (
			<LiItem
				key={character.uid}
				name={character.name}
				uid={character.uid}
				deleteOnClick={() => actions.deleteFavourite(character)}
			/>
		)
	});

	useEffect(() => {
		liItemGenerator = store.favourites.map((character) => {
			return (
				<LiItem
					key={character.uid}
					name={character.name}
					uid={character.uid}
					deleteOnClick={() => actions.deleteFavourite(character)}
				/>
			)
		});
	}, [store.favourites])

	return (
		<nav className="navbar navbar-light bg-light mb-3 mx-3">
			<Link to="/">
				<img src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-1-1.png" alt="star-wars-logo" style={{ width: "6rem" }} />
			</Link>
			<div className="ml-auto">
				{/* <Link to="/demo"> */}
				<div className="dropdown">
					<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Dropdown button
					</button>
					<ul className="dropdown-menu">
						{liItemGenerator}
					</ul>
				</div>
				{/* </Link> */}
			</div>
		</nav>
	);
};
