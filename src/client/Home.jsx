import React from 'react';
import './app.css';
import { Link } from "react-router-dom"

const Home = () => {

  return (
    <>
      <div className="container">
        <div class="row">
          <div class="headContainer">
            <h1>What Do You Want To Manage?</h1>
            <p>Select from the list below</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <Link to="/Tools" class="btn btn-primary btnFunction">Tools</Link>
          </div>
          <div class="col-sm-3">
            <Link to="/Api" class="btn btn-primary btnFunction">AI Content</Link>
          </div>
          <div class="col-sm-3">
            <Link to="/Reporting" class="btn btn-primary btnFunction">Reporting</Link>
          </div>
          <div class="col-sm-3">
            <Link to="/Api" class="btn btn-primary btnFunction">API Management</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;