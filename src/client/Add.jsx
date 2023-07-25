import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from "./LoadingSpinner";
import FormData from 'form-data';
import fs from 'fs';



export const Add = () => {
  const [formData, setFormData] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toolFormData = location?.state;

  useEffect(() => {
    if (toolFormData?.id) {
      setFormData({
        ...formData,
        country: toolFormData?.Country,
        plantId: toolFormData?.PlantId,
        region: toolFormData?.Region,
        plantName: toolFormData?.PlantName,
        plantAddress: toolFormData?.PlantAddressLine1,
        plantTown: toolFormData?.PlantTown,
        plantCountry: toolFormData?.PlantCountry,
        plantPostcode: toolFormData?.PlantPostCode,
        plantManagerName: toolFormData?.PlantManagerName,
        plantManagerPhone: toolFormData?.PlantManagerPhone,
        plantManagerEmail: toolFormData?.PlantManagerEmail,
        previousPlantName:localStorage.getItem("PlantName")
      })
    }
  }, [toolFormData])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const addData = async (e) => {
    e.preventDefault();
    if (toolFormData?.id) {
      const res = await fetch(`https://powersandboxreact.w3spaces.com/api/data-edit/${toolFormData?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then((response) => {
          setFormData({
            country: '',
            plantId: '',
            region: '',
            plantName: '',
            plantAddress: '',
            plantTown: '',
            plantCountry: '',
            plantPostcode: '',
            plantManagerName: '',
            plantManagerPhone: '',
            plantManagerEmail: ''
          })
          response.status === 200 && navigate("/Edit", {
            state: {
              countryData: toolFormData?.Country,
              regionData: toolFormData?.Region,
              plantData: toolFormData?.PlantId
            }
          });
        })
        .catch((error) => {
        });
    } else {
      const allData = { ...toolFormData, ...formData };
      const res = await fetch('https://powersandboxreact.w3spaces.com/api/data', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(allData)
      })
        .then((response) => {
          response.status === 200 && window.location.replace("https://powersandbox.com/uk-quote-form/uk-quote-thank-you.html");
        })
        .catch((error) => {
        });
    }

  }

  const pageTitle = toolFormData?.id ? 'Edit Location' : 'Add Location';

  return (
    <>
      {
        isLoading ? <LoadingSpinner /> : (
          <>
            <div className="container">
              <div className="row">
                <div className="col-xs-12 form-container">
                  <h1>{pageTitle}</h1>
                  <form id="formContact" onSubmit={addData}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input onChange={onChange} value={formData?.plantName} name="plantName" id="plantName" className="form-control" placeholder="Plant Name" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input onChange={onChange} value={formData?.plantAddress} name="plantAddress" id="plantAddress" className="form-control" placeholder="Plant Address Line 1" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input onChange={onChange} value={formData?.plantTown} name="plantTown" id="plantTown" className="form-control" placeholder="Plant Town" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input onChange={onChange} value={formData?.plantCountry} name="plantCountry" id="plantCountry" className="form-control" placeholder="Plant County" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input onChange={onChange} value={formData?.plantPostcode} name="plantPostcode" id="plantPostcode" className="form-control" placeholder="Post Code" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input onChange={onChange} value={formData?.plantManagerName} name="plantManagerName" id="plantManagerName" className="form-control" placeholder="Plant Manager Name" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input onChange={onChange} value={formData?.plantManagerPhone} name="plantManagerPhone" id="plantManagerPhone" className="form-control" placeholder="Plant Manager Phone" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input onChange={onChange} value={formData?.plantManagerEmail} name="plantManagerEmail" id="plantManagerEmail" className="form-control" placeholder="Plant Manager Email" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="submit" name="Submit" value="Submit" className="btn btn-primary" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}
export default Add