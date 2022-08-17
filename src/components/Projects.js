import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {getProjects} from "../API/actions";


function Projects (){
    //const projects = JSON.parse(localStorage.getItem('projects'));
    const [projects, setProjects] = useState([])
    useEffect(() => {
        getProjects().then(response => setProjects(response))

    },[]);

    return (
        <div className="layout__content">
            <div className="layout__content-main">
                <h2 className="page-header">Projects</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            {
                                projects.map((item, index) => (
                                    <div className="col-3" key={index}>
                                        <Link to={`/project/${item.projectName}`} className='status-card'>
                                            <div className="status-card__info">
                                                <h5>{item.projectName}</h5>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                            <div className="col-3">
                                <Link to={'/addproject'}>
                                <div className='status-card1'>
                                    <div className="status-card__icon1">
                                        <i className="bx bx-folder-plus"></i>
                                    </div>
                                    <div className="status-card__info">
                                        <h5>New project</h5>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
