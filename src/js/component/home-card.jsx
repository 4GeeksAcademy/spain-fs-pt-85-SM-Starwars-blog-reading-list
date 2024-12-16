import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

function HomeCard(props) {
    return (
        
        <div className="mx-3 card col-2">
            <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-center">{props.name}</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    {/* <Link to="/characterDetails"> */}
                        <button className="btn btn-primary" onClick={props.learnMoreOnClick}>Learn more</button>
                    {/* </Link> */}
                </div>
        </div>
    )
}

export default HomeCard;