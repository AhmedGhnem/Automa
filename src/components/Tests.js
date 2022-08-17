import React from 'react'
import {Link} from "react-router-dom";
import Badge from "./Badge";
import TableScenario from "./TableScenario";



const latestOrders = {
    header: [
        "scenario",
        "date",
        "status"
    ],
    body: [
        {
            date: "17 Jun 2022",
            price: "login",
            status: "failed"
        },
    ]
}

const orderStatus = {
    "pending": "primary",
    "success": "success",
    "failed": "danger"
}

function Tests (){
    const renderOrderHead = (item, index) => (
        <th key={index}>{item}</th>
    )

    const renderOrderBody = (item, index) => (
        <tr key={index}>
            <td>{item.TestName}</td>
            <td>{item.TestDate}</td>
            <td>{item.TestResult.toString()=== 'false' ? <Badge type={orderStatus["success"]} content={"success"}/> :
                item.TestResult.toString()=== 'true' ? <Badge type={orderStatus["failed"]} content={"failed"}/>:
                    <Badge type={orderStatus["pending"]} content={"pending"}/>}
            </td>
        </tr>
    )
    const tests = JSON.parse(localStorage.getItem('tests'));

    return (
        <div className="layout__content">
            <div className="layout__content-main">
                <h2 className="page-header">Tests</h2>
                <div className="row">
                    <div className="col-12">
                    </div>
                    <div className="col-4">
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card__header">
                                <h3>latest tests</h3>
                            </div>
                            <div className="card__body">
                                <TableScenario
                                    headData={latestOrders.header}
                                    renderHead={(item, index) => renderOrderHead(item, index)}
                                    bodyData={tests}
                                    renderBody={(item, index) => renderOrderBody(item, index)}
                                />
                            </div>
                            <div className="card__footer">
                                <Link to='/scenario'>create new test</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tests
