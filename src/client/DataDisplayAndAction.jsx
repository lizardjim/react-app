import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import './EditFileDataDisplay.css'
import LoadingSpinner from "./LoadingSpinner";

const DataDisplayAndAction = (props) => {
    const { toolFormData, actionType } = props
    const [editItemList, setEditItemList] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (toolFormData) {
            const params = new URLSearchParams(toolFormData).toString()
            reInitializationTable(`https://powersandboxreact.w3spaces.com/api/get-primary-data?${params}`)
        } else {
            reInitializationTable("https://powersandboxreact.w3spaces.com/api/data")
        }
    }, [toolFormData, actionType])

    const handleAction = async (item) => {
        if (actionType === "Edit") {
            localStorage.removeItem("PlantName")
            localStorage.setItem("PlantName",item?.PlantName)
            navigate('/Add', { state: item });
        } else if (actionType === "Delete") {
            setIsLoading(true);
            const data={
                     plantNames: item?.PlantName,
                     countryName: item?.Country
                }
            fetch(`/api/data/${item?.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })
                .then((response) => {
                    if (response.ok) {
                        reInitializationTable(`https://powersandboxreact.w3spaces.com/api/get-primary-data?${new URLSearchParams(toolFormData).toString()}`);

                    } else {
                        setIsLoading(false)
                        throw new Error('Error deleting item');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false)
                });
        } else {
            navigate('/View-more', { state: item })
        }
    }
    const reInitializationTable = async (url) => {
        setIsLoading(true);
        fetch(url)
            .then((respose) => respose.json())
            .then((data) => {
                setEditItemList(data)
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }
    return (
        <>
            <div className="table-wrapper">
                {
                    isLoading ? <LoadingSpinner /> :
                        <div className="table-container">
                            {
                                <div className="d-flex justify-content-center">
                                    {
                                        editItemList?.length !== 0 ?
                                            <table className="styled-table">
                                                <thead>
                                                    <tr>
                                                        <th>Country</th>
                                                        <th>Region</th>
                                                        <th>Plant Id</th>
                                                        <th>Plant Name</th>
                                                        <th>Plant PostCode</th>
                                                        <th>Plant Adress</th>
                                                        <th>Plant Town</th>
                                                        <th>Plant Country</th>
                                                        <th>Plant ManagerName</th>
                                                        <th>Plant ManagerPhone</th>
                                                        <th>Plant ManagerEmail</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        editItemList?.map((item, index) => {
                                                            return (
                                                                <tr key={item?.id} className={index % 2 !== 0 ? "active-row" : ""}>
                                                                    <td>{item?.Country}</td>
                                                                    <td>{item?.Region}</td>
                                                                    <td>{item?.PlantId}</td>
                                                                    <td>{item?.PlantName}</td>
                                                                    <td>{item?.PlantPostCode}</td>
                                                                    <td>{item?.PlantAddressLine1}</td>
                                                                    <td>{item?.PlantTown}</td>
                                                                    <td>{item?.Country}</td>
                                                                    <td>{item?.PlantManagerName}</td>
                                                                    <td>{item?.PlantManagerPhone}</td>
                                                                    <td>{item?.PlantManagerEmail}</td>
                                                                    <td className="d-flex justify-content-center">
                                                                        {
                                                                            actionType === "Edit" && <button onClick={() => { handleAction(item) }} className="action-btn"><i className="fa-solid fa-pen-to-square" />
                                                                            </button>
                                                                            || actionType === "Delete" &&
                                                                            <button onClick={() => { handleAction(item) }} className="action-btn"><i className="fa-sharp fa-solid fa-trash" /></button>
                                                                            || <button onClick={() => { handleAction(item) }} className="action-btn"><i className="fa-solid fa-eye" /></button>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table> : <h3>No Data Is Available</h3>

                                    }

                                </div>

                            }
                        </div>

                }
                <div className="button-container">
                    <Link to="/Home" class="btn btn-primary">Go to Home</Link>
                </div>
            </div>
        </>
    )
}

export default DataDisplayAndAction