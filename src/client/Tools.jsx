import React, { useState } from 'react';
import './app.css';
import { useNavigate } from 'react-router-dom';

const Tools = () => {
    const [countryData, setCountryData] = useState("France")
    const [regionData, setRegionData] = useState("R1")
    const [plantData, setPlantData] = useState("P1")
    const navigate = useNavigate();

    const handleToolData = (e) => {
        e.preventDefault();
        const data = handleData()
        navigate('/Add', { state: data });
    }
    const handleEditPageNavigation = (e) => {
        e.preventDefault();
        const data = handleData()
        navigate('/Edit', { state: data });
    }
    const handleDeleteItemPageNavigation = (e) => {
        e.preventDefault();
        const data = handleData()
        navigate('/Remove', { state: data });
    }
    const handleData = () => {
        const temp = {
            countryData: countryData,
            regionData: regionData,
            plantData: plantData
        }
        setCountryData("France")
        setRegionData("R1")
        setPlantData("P1")
        return temp
    }
    return (

        <div className="container">
            <div className="headContainer">
                <h1>Manage Locations</h1>
            </div>
            <div className="formSelector">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <select defaultValue={countryData} className="form-control" onChange={(e) => { setCountryData(e.target.value) }}>
                                <option disabled value="defaultCountry">Select Country</option>
                                <option value="France">France</option>
                                <option value="Poland">Poland</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Czechia">Czechia</option>
                                <option value="Spain">Spain</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Germany">Germany</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <select defaultValue={regionData} className="form-control" onChange={(e) => { setRegionData(e.target.value) }}>
                                <option disabled value="defaultRegion">Select Region</option>
                                <option value="R1">R1</option>
                                <option value="R2">R2</option>
                                <option value="R3">R3</option>

                            </select>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <select defaultValue={plantData} className="form-control" id="location" onChange={(e) => { setPlantData(e.target.value) }}>
                                <option disabled value="defaultPlant">Select Plant</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                                <option value="P3">P3</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttonContainer">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <button className="btn btn-danger btnFunction" onClick={handleEditPageNavigation}>Edit Plant</button>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <button className="btn btn-primary btnFunction" onClick={handleToolData}>Add Plant</button>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <button className="btn btn-secondary btnFunction" onClick={handleDeleteItemPageNavigation}>Remove Plant</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tools;