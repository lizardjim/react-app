import React, { useState } from 'react';

function API() {
  const [apiPostUrl,setApiPostUrl] = useState('')
  const [rows, setRows] = useState([{ origin: '', destination: '' }]);

  const handleAddRow = () => {
    setRows([...rows, { origin: '', destination: '' }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [name]: value };
    setRows(updatedRows);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };
  const handleSubmitOfPublish = () =>{
    const temp = {
      apiPostUrl:apiPostUrl,
      fields:rows
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(temp)
    };
    const response = fetch('https://powersandboxreact.w3spaces.com/api/data', requestOptions);

    console.log(response)
  }

  return (
    <form className="container">
      <div className="row">
        <div className="col-sm-8">
          <div className="form-group">
            <input
              type="text"
              name="apiUrl"
              placeholder="Add API Post URL"
              className="form-control"
              onChange={(e)=>{setApiPostUrl(e.target.value)}}
            />
          </div>
        </div>
        <div className="col-sm-2">
          <div className="form-group">
            <button type="button" onClick={handleAddRow} className="btn btn-primary w-100">Add Row</button>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="form-group">
            <button type="button" className="btn btn-success w-100" onClick={handleSubmitOfPublish}>Publish</button>
          </div>
        </div>
      </div>
      <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <hr />
            </div>
          </div>
        </div>
      {rows.map((row, index) => (
        <div key={index} className="row">
          <div className="col-sm-5">
            <div className="form-group">
              <input
                type="text"
                name="origin"
                placeholder="Origin field name"
                value={row.origin}
                onChange={(e) => handleInputChange(e, index)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-5">
            <div className="form-group">
              <input
                type="text"
                name="destination"
                placeholder="Destination field name"
                value={row.destination}
                onChange={(e) => handleInputChange(e, index)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <button onClick={() => handleRemoveRow(index)} className="btn btn-danger w-100">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </form>
  );
}

export default API;