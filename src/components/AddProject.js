import React, {useState} from 'react'
import HomeIllustration from "../assets/home-illustration.svg";
import axios from "axios";
import {addProject, addScenario} from "../API/actions";
import {useNavigate} from "react-router-dom";



function AddProject (){
    const [projectName, setProjectName] = useState("");
    const [multipleFiles,setMultipleFiles] = useState("");
    const [fileName,setFileName] = useState([]);
    const history = useNavigate();
    const MultiFileUpload = async (e) => {
        await setMultipleFiles(e.target.files);
        for (let i = 0; i < e.target.files.length; i++) {
            setFileName([...fileName,e.target.files[i].name])
            fileName.push(e.target.files[i].name)
        }
    }
    const [slicedNames,setSlicedNames] = useState([]);

    const UploadMultipleFiles = async (e) => {
        e.preventDefault()
        try {
            /*let projects=JSON.parse(localStorage.getItem('projects') || "[]")
            let project={
                id:Object.keys(projects).length,
                projectName:projectName
            }
            for (let k=0;k<(Object.keys(projects).length);k++){
                if ((projects[k].projectName) == projectName){
                    occurrence1 = true;
                    break;
                }
            }
            if (occurrence1 == false){
                projects.push(project)
                localStorage.setItem('projects',JSON.stringify(projects));
            }*/

            for (let i = 0; i < multipleFiles.length; i++) {
                const formData = new FormData();
                formData.append('file', multipleFiles[i]);
                formData.append("fileName", multipleFiles[i].name);
                console.log(multipleFiles[i])
                const res = await axios.post("upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const  namesliced = multipleFiles[i].name.split('.')[0];
                slicedNames.push(namesliced)
                console.log('name sliced )=====',namesliced)

             /*   let scenarios=JSON.parse(localStorage.getItem('scenarios') || "[]")
                let scenario={
                    id:Object.keys(scenarios).length,
                    projectName:projectName,
                    TestName:namesliced
                }

                for (let j=0;j<(Object.keys(scenarios).length);j++){
                    if ((scenarios[j].TestName) == namesliced){
                        occurrence = true;
                        break;
                    }
                }
                if (occurrence == false){
                    scenarios.push(scenario)
                    localStorage.setItem('scenarios',JSON.stringify(scenarios));
                }*/
            }
            await  addProject({projectName})
            await addScenario({projectName,testName:slicedNames })
            history("/project");
        }catch (e) {
            console.log(e)
        }
    };


    return (
        <div className="layout__content">
            <div className="layout__content-main">
                <h2 className="page-header">Add new project</h2>
                <div className="HomeWrapper1">
                    <div className="HomerContainer1">
                        <div className="LeftCol">
                            <div>
                                <form className="form">
                                    <div>
                                        <h1 className="Title">Project Details</h1>
                                    </div>
                                    <div>
                                        <label htmlFor="name">Project Name</label>
                                        <input
                                            type="text"
                                            id="form"
                                            placeholder="Enter name"
                                            required
                                            onChange={(event) => setProjectName(event.target.value)}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="description">Upload your tests</label>
                                        <div className='status-card3'>
                                            <div className="status-card__info2">
                                                <h5>Choose your tests</h5>
                                                <input type="file" name="file" onChange={MultiFileUpload} accept=".java,.js,.py" multiple/>
                                            </div>
                                        </div>
                                        <textarea
                                            type="text"
                                            id="form"
                                            value={fileName.toString().replace(/,/g,"  ")}
                                            readOnly="true"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label />
                                        <button className="styledLink" onClick={UploadMultipleFiles}>
                                            Confirm
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>

                        <img id="Illustration" src={HomeIllustration} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject
