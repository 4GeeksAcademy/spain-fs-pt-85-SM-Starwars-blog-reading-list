import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import "../../styles/demo.css"

function LiItem(props) {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);

    async function goToFavouriteOnClick() {
        if (props.type === "character") {
            await actions.getCharacterInfoViaApi(props.uid);
            navigate(`/characterDetails/${props.uid}`);
        }
        if (props.type === "vehicle") {
            await actions.getVehicleInfoViaApi(props.uid);
            navigate(`/vehicleDetails/${props.uid}`);
        }
        if (props.type === "planet") {
            await actions.getPlanetInfoViaApi(props.uid);
            navigate(`/planetDetails/${props.uid}`);
        }
    }

    return (
        <div className="d-flex justify-content-between align-items-center dropdown-item px-3 py-2 g-2">
            <li className="link" onClick={goToFavouriteOnClick}>{props.name}</li>
            <button className="btn btn-danger fa-solid fa-trash ms-1" onClick={(e) => {
                e.stopPropagation();
                props.deleteOnClick();
            }}></button>
        </div>
    )
}

export default LiItem;