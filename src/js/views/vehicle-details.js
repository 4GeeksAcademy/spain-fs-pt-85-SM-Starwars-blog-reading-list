import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/details-view.css";

//se me ocurre crear un objeto enorme con los nombres de los personajes de starwars como key y como valor poner la ruta de la imágen

export const VehicleDetails = () => {
    const { store, actions } = useContext(Context);
    const vehiclesSpecificDetails = store.vehicleSpecificDetails.result.properties
    // verificador de existencia en favoritos
    const isFavourite = store.favourites.some(
        (fav) => fav.name === vehiclesSpecificDetails.name
    )

    // variable para el manejo de cambio del botón de favorito dependiendo de si se encuentra en favoritos o no
    const favButtonClass = isFavourite
        ? "btn btn-secondary btn-lg fa-solid fa-heart-crack mt-1 p-2 h-50"
        : "btn btn-danger btn-lg fa-regular fa-heart mt-1 p-2 h-50 "
    // funcion para el manejo de cambio de función del botón favorito
    function favouriteHandler() {
        vehiclesSpecificDetails.key = vehiclesSpecificDetails.name
        const character = store.vehicles.find(
            (char) => char.name === vehiclesSpecificDetails.name
        );
        if (character) {
            vehiclesSpecificDetails.uid = character.uid;
        }
        if (isFavourite) {
            actions.deleteFavourite(vehiclesSpecificDetails);
            return;
        }
        actions.addFavourite(vehiclesSpecificDetails, "vehicle")
    }

    return (
        <div>
            <div>
                <div className="col-11 d-flex justify-content-around align-items-center mt-6 mx-auto border border-black rounded shadow-sm">
                    <img className="col-6 max-heigth-600px align-items-center" src={actions.getSpecificVehicleImage(vehiclesSpecificDetails)} alt="vehicle image"></img>
                    <div className="col-6 text-center">
                        <div className="d-flex justify-content-around align-items-center mx-2">
                            <h1 className="my-3">{vehiclesSpecificDetails.name}</h1>
                            <button className={favButtonClass} onClick={favouriteHandler}></button>
                        </div>
                        <p className="droid-font m-3">
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
                <div className="d-flex flex-wrap justify-content-around mt-3">
                    <span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
                        NAME <br></br>
                        {vehiclesSpecificDetails.name}
                    </span>
                    <span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
                        MODEL <br></br>
                        {vehiclesSpecificDetails.model}
                    </span>
                    <span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
                        VEHICLE CLASS <br></br>
                        {vehiclesSpecificDetails.vehicle_class}
                    </span>
                    <span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
                        COST <br></br>
                        {vehiclesSpecificDetails.cost_in_credits}
                    </span>
                    <span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
                        CREW <br></br>
                        {vehiclesSpecificDetails.crew}
                    </span>
                    <span className="text-center mt-2 px-2 border border-top-0 border-bottom-0">
                        PASSENGERS <br></br>
                        {vehiclesSpecificDetails.passengers}
                    </span>
                </div>
            </div>
        </div>
    );
};
