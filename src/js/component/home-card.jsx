import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

function HomeCard(props) {
    return (
        
        <div className="mx-3 card col-2">
            <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-center">{props.name}</h5>
                    <div className="mt-3 d-flex justify-content-around">
                        <button className="btn btn-primary" onClick={props.learnMoreOnClick}>Learn more</button>
                        <button className="btn btn-outline-danger fa-regular fa-heart p-2" onClick={props.addFavouriteOnCLick}></button>
                    </div>
                </div>
        </div>
    )
}

export default HomeCard;