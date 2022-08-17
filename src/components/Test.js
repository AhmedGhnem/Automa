import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import Badge from "./Badge";
import clear from './screenshots/clear.png'

const orderStatus = {
    "pending": "primary",
    "success": "success",
    "failed": "danger"
}

function Test() {
    const [active,setActive] = useState("")
    const { id } = useParams();
    let tests=JSON.parse(localStorage.getItem('tests') || "[]")
    const testId = tests.filter(v => v.id == id);
    let operations=JSON.parse(localStorage.getItem('operations') || "[]")
    const operationId = operations.filter(v => v.TestName == testId[0].TestName);

    return (
        <div className="layout__content">
            <div className="layout__content-main">
                <h2 className="page-header">Test</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6">
                                <div className='status-card2'>
                                    <div className="status-card__info3">
                                        <div className="status-card__title" >
                                            <h1>#{testId[0].id} {testId[0].TestName}</h1>
                                            {testId[0].TestResult.toString()=== 'pending' ? <Badge type={orderStatus["pending"]} content={"pending"}/> :
                                                testId[0].TestResult.toString()=== 'false' ? <Badge type={orderStatus["success"]} content={"success"}/> :
                                             <Badge type={orderStatus["failed"]} content={"failed"}/>}
                                        </div>
                                        {testId[0].TestResult.toString()=== 'pending' ?
                                        <div className="cardBody">
                                            {
                                                operationId.map((item, index) => (
                                                    <button className="btnOp" >
                                                        <p className="index">{index}</p>
                                                        <p className="opname">{item.OperationName}</p>
                                                    </button>
                                                ))
                                            }
                                        </div> : testId[0].TestResult.toString()=== 'false' ?
                                        <div className="cardBody">
                                            {
                                                operationId.map((item, index) => (
                                                    <button className="btnOp1" onClick={() => setActive(item.OperationName)}>
                                                        <p className="index">{index}</p>
                                                        <p className="opname">{item.OperationName}</p>
                                                    </button>
                                                ))
                                            }
                                        </div> :
                                        <div className="cardBody">
                                            {
                                                operationId.map((item, index) => (
                                                     <button className="btnOp2">
                                                         <p className="index">{index}</p>
                                                         <p className="opname">{item.OperationName}</p>
                                                     </button>
                                                ))
                                            }
                                        </div>
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="col-6">
                                <div  className='status-card2'>
                                    <div className="status-card__info3">
                                        {
                                            operationId.map((item, index) => (
                                        <div className="status-card__title3" >
                                            {active == item.OperationName && <img className="screenshot" src={require(`${item.OperationImg}`)}/>}
                                        </div>))
                                        }
                                        <div >

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

export default Test
