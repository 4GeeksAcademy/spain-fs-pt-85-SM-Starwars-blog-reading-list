import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LiItem from "./favourite-li.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/navbar.css"

export const Navbar = () => {
	const { store, actions } = useContext(Context)

	const favourites = store.favourites
	const [favouritesDisplay, setFavouritesDisplay] = useState("btn btn-primary dropdown-toggle d-none")
	const [dropDownMenuDisplay, setDropDownMenuDisplay] = useState("dropdown-menu dropdown-menu-end")

	let liItemGenerator = store.favourites.map((item) => {	
		return (
			<LiItem
				key={item.name}
				name={item.name}
				uid={item.uid}
				type={item.type}
				deleteOnClick={() => actions.deleteFavourite(item)}
			/>
		)
	});

	useEffect(() => {
		liItemGenerator = store.favourites.map((item) => {
			return (
				<LiItem
					key={item.name}
					name={item.name}
					uid={item.uid}
					deleteOnClick={() => actions.deleteFavourite(item)}
				/>
			)
		});
	}, [store.favourites])

	useEffect(() => {
		if (favourites.length < 1) {
			setFavouritesDisplay("btn btn-primary dropdown-toggle d-none")
			setDropDownMenuDisplay("dropdown-menu dropdown-menu-end d-none")
		}
		else {
			setFavouritesDisplay("btn btn-primary dropdown-toggle")
			setDropDownMenuDisplay("dropdown-menu dropdown-menu-end")
		}

	}, [favourites])

	return (
		<nav className="navbar navbar-light bg-light mb-5 p-3 navbar-top">
			<Link to="/">
				<img src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-1-1.png" alt="star-wars-logo" style={{ width: "6rem" }} />
			</Link>
			<div className="ml-auto">
				{/* <Link to="/demo"> */}
				<div className="dropdown">
					<button className={favouritesDisplay} type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-boundary="viewport">
						Favourites
					</button>
					<ul className={dropDownMenuDisplay}>
						{liItemGenerator}
					</ul>
				</div>
				{/* </Link> */}
			</div>
		</nav>
	);
};
