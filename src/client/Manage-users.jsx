import React from 'react';
import './app.css';

const Manage = () => {

  return (
    <>
        <div className="container">
            <div className="row">
            <div className="col-xs-12">
            <h1>Manage Users</h1>
            </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <input type="text" name="userName" id="userName" placeholder="Enter User Name" className="form-control" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <select className="form-control" name="userRights" id="userRights">
                            <option selected disabled>Select User Access</option>
                            <option>Admin</option>
                            <option>User</option>
                            <option>Read Only</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <input type="text" name="password" id="password" className="form-control" placeholder="Enter password" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <input type="text" name="password" id="password" className="form-control" placeholder="Enter password Again" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <div className="form-group">
                        <input type="submit" value="Submit" name="Submit" className="btn btn-primary btnFunction" />
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Manage;