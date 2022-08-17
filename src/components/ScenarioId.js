import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Badge from "./Badge";
import play from '../assets/run.png'
import spinner from '../assets/spinner.png'
import axios from "axios";

import io from 'socket.io-client';
import {addProject, addTest} from "../API/actions";

const orderStatus = {
    "pending": "primary",
    "success": "success",
    "failed": "danger"
}

const socket = io('http://localhost:5000/', { transports: ['websocket'] });
function ScenarioId({ notifications, updateNotifications }) {
    const [pending,setPending] = useState(false)
    const [logs,setLogs] = useState([])
    const [logss,setLogss] = useState("")
    const { id } = useParams();
    const [tester,setTester] = useState([])
    const handleClick = async() => {
        setTester([])
        const today = new Date();
        const minute = String(today.getMinutes()).padStart(2, '0');
        const hour = String(today.getHours()).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();


        try {
            setPending(true)
            let tests=JSON.parse(localStorage.getItem('tests') || "[]")
            const scenarios = JSON.parse(localStorage.getItem('scenarios'));
            const scenarioId = scenarios.filter(v => v.TestName == id);
            const testname = scenarioId[0].TestName
            let test1={
                id:Object.keys(tests).length,
                TestName:testname,
                TestResult:"pending",
                TestDate:hour + ':' + minute + ' ' + dd + '/' + mm + '/' + yyyy
            }
            tests.push(test1)
            localStorage.setItem('tests',JSON.stringify(tests));

            const {data} = await axios.post('/', {name:testname})
            tests.pop()
            localStorage.setItem('tests',JSON.stringify(tests));

            let test={
                id:Object.keys(tests).length,
                TestName:testname,
                TestResult:data.error,
                TestDate:hour + ':' + minute + ' ' + dd + '/' + mm + '/' + yyyy
            }
            tests.push(test)
            localStorage.setItem('tests',JSON.stringify(tests));
            setPending(false)

            updateNotifications([...notifications, test])
            for (let i=0;i<data.logs.length;i++){
                console.log(data.logs[i])
                logs.push((data.logs[i]).replace("[35m","").replace("[39m","").replace("[37m",""))
                setLogss(data.logs[i])
            }
            await addTest({testResult:data.error,testName:testname })
            console.log(logs)
        }catch (e) {
            console.log(e)
        }
    }
    const scenarioss = JSON.parse(localStorage.getItem('scenarios'));
    const scenarioid = scenarioss.filter(v => v.TestName == id);
    const testname = scenarioid[0].TestName
    const tests = JSON.parse(localStorage.getItem('tests'));
    const testnames = tests.filter(v => v.TestName == testname);



    const socketFunction = async () => {
        await socket.on('connect', () => {
            console.log('Connected with ID : ', socket.id);
            socket.on('log-updater', (data) => {
                console.log('socket ====================',data.data);
                 setTester((te)=>[...te,data.data])

            });
        });

        socket.on('disconnect', () => {
            console.log('disconnected '); // undefined
        });

        socket.on('connect_error', (err) => {
            console.log('error connecting', err);
            socket.connect();
        });
    }


    const scenarios = JSON.parse(localStorage.getItem('scenarios'));
    const scenarioId = scenarios.filter(v => v.TestName == id);
    console.log(scenarioId)

    useEffect(() => {
        let element = document.getElementById("box");
        element.scrollTop = element.scrollHeight
    }, [tester]);

    useEffect(() => {
        socketFunction();
        console.log(tester)
    }, [logs]);
    return (
        <div className="layout__content">
            <div className="layout__content-main">
                <h2 className="page-header">Scenario</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                                    <div className="col-6">
                                        <div className='status-card2'>
                                            <div className="status-card__info1">
                                                {
                                                    scenarioId.map((item, index) => (
                                                        <div className="status-card__title" key={index}>
                                                            <h1>{item.TestName}</h1>
                                                            {pending==false ?
                                                            <button className="runBtn" onClick={handleClick}><img id="runImg" src={play}/></button>:
                                                            <button className="runBtn1" disabled><img id="runImg" src={spinner}/></button>
                                                            }
                                                        </div>
                                                    ))
                                                }

                                                <div className="card__body">
                                                    <div>
                                                        <div className="table-wrapper1">
                                                            <table>
                                                                <thead>
                                                                <tr>
                                                                    <th className="col">id</th>
                                                                    <th className="col">scenario</th>
                                                                    <th className="col">date</th>
                                                                    <th className="col">status</th>
                                                                </tr>
                                                                </thead>
                                                                {
                                                                    testnames.sort((a,b)=>{return b.id - a.id}).map((item, index) => (

                                                                    <tbody>
                                                                    <td>{item.id}</td>
                                                                    <Link to={`/test/${item.id}`}><td>{item.TestName}</td></Link>
                                                                        <td>{item.TestDate}</td>
                                                                        <td>{pending === true && item.TestResult.toString()=== 'pending' ? <Badge type={orderStatus["pending"]} content={"pending"}/> :
                                                                            pending === true && item.TestResult.toString()=== 'false' ? <Badge type={orderStatus["success"]} content={"success"}/> :
                                                                            pending === true && item.TestResult.toString()=== 'true' ? <Badge type={orderStatus["failed"]} content={"failed"}/> :
                                                                            pending === false && item.TestResult.toString()=== 'false' ? <Badge type={orderStatus["success"]} content={"success"}/> :
                                                                            pending === false && item.TestResult.toString()=== 'true' ?     <Badge type={orderStatus["failed"]} content={"failed"}/> :
                                                                            <Badge type={orderStatus["pending"]} content={"pending"}/>}
                                                                        </td>
                                                                    </tbody>

                                                                    ))
                                                                }
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div  className='status-card2'>
                                            <div className="status-card__info3">
                                                        <div className="status-card__title" >
                                                            <h1>Logs</h1>
                                                        </div>
                                                        <div className="status-card__title2" id='box' >
                                                                  {tester.map((item) => (
                                                                      <>
                                                                          {item.includes("POST /wd/hub/session") ?
                                                                              <p>{item.replace( //gi ,'').replace(/31m/g,'').replace(/32m/g,'').replace(/35m/g,'').replace(/37m/g,'').replace(/39m/g,'').replace(/90m/g,'').replace(/[[]/g,'').replace(/]/g,'')}</p>:
                                                                              <p><br/></p>
                                                                          }

                                                                      </>
                                                            ))}
                                                        </div>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScenarioId
