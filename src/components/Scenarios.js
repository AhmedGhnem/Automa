import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteProject, getScenariosByProjectName} from "../API/actions";
import LoginPage from "../pages/LoginPage";

function Scenarios (){
    const { id } = useParams();
    /*
    const projects = JSON.parse(localStorage.getItem('projects'));
    const projectid = projects.filter(v => v.id == id);
    const scenarios = JSON.parse(localStorage.getItem('scenarios'));
    const scenarioId = scenarios.filter(v => v.projectName == projectid[0].projectName);
    */

    const [scenarios, setScenarios] = useState([])
    const history = useNavigate();

    useEffect(() => {
        getScenariosByProjectName(id).then(response => setScenarios(response))
    },[id]);

    const handleClick = async() => {
        await deleteProject(id)
        history("/project");
    }

    return (
        <div className="layout__content">
            <div className="layout__content-main">
                <h2 className="page-header">Scenarios</h2>
                <div className="row">
                <div className="col-12">
                    <div className="row">

                        {
                            scenarios.map((item, index) => (
                                item.testName.map((i,idx) => (
                                    <div className="col-3" key={index}>
                                        <Link to={`/scenario/${i}`} className='status-card'>
                                            <div className="status-card__info">
                                                <h5>{i}</h5>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ))
                        }

                        <div className="col-3">
                            <button className='status-card' onClick={handleClick}>
                                <div className="status-card__icon">
                                    <i className="bx bx-trash-alt"></i>
                                </div>
                                <div className="status-card__info">
                                    <h5>Delete project</h5>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Scenarios
