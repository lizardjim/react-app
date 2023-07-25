import React from 'react';
import { useLocation } from "react-router-dom"
import './DisplayPage.css'

const DisplayPage = () => {
    const location = useLocation()
    return (
        <>
        <div className="container">
            <div className="main-div">
                <div className="left-section">
                    <div>
                        <h1 className="d-flex">{location?.state?.PlantName}</h1>
                        <p className="d-flex">{location?.state?.PlantAddressLine1}, {location?.state?.PlantTown}, {location?.state?.Country}, {location?.state?.PlantPostCode}</p>
                    </div>
                    <hr />
                    <div>
                        <h6 className="mb-3">Contact Details</h6>
                        <p className="d-flex mt-2 mb-2">Position:</p>
                        <p className="d-flex mt-2 mb-2">Name: {location?.state?.PlantManagerName}</p>
                        <p className="d-flex mt-2 mb-2">Phone: <a href={`tel.${location?.state?.PlantManagerPhone}`}>{location?.state?.PlantManagerPhone}</a></p>
                        <p className="d-flex mt-2 mb-2">Email: {location?.state?.PlantManagerEmail}</p>
                        <button className="primary-button">Get A Quote</button>
                    </div>
                </div>
                <div className="right-section">
                    <div className="map-container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.1086030407087!2d-122.41941588420315!3d37.77492987975516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e26f4dbde63%3A0x3f4ee68b73701242!2sGoogleplex!5e0!3m2!1sen!2sus!4v1623155290170!5m2!1sen!2sus" frameBorder="0" style={{ border: "none" }} allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default DisplayPage;