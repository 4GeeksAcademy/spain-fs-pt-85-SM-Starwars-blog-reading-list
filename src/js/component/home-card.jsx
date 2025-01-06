import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/home.css"

function HomeCard(props) {
    return (
        
        <div className="mx-3 card col-lg-2 col-md-3 col-sm-6 col-7 d-flex justify-content-center">
            <div className="ratio ratio-1x1">
                <img src={props.image} className="card-img-top max-heigth-400px" alt={props.image} />
            </div>
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