import React, {useContext} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";

function LiItem(props) {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context);

    async function goToFavouriteOnClick(){
        await actions.getCharacterInfoViaApi(props.uid)
        navigate(`/characterDetails/${props.uid}`);
    }

    return (
        <div className="d-flex justify-content-between px-3">
            <li onClick={goToFavouriteOnClick}>{props.name}</li>
            <button className="btn btn-danger fa-solid fa-trash" onClick={props.deleteOnClick}></button>
        </div>
    )
}

export default LiItem;