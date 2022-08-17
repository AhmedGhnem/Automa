import React from 'react'

import { Link } from 'react-router-dom'

import Table from '../components/Table'

import Badge from '../components/Badge'



const latestOrders = {
    header: [
        "scenario",
        "date",
        "status"
    ]
}

const orderStatus = {
    "pending": "primary",
    "success": "success",
    "failed": "danger"
}



function Dashboard (){
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
    const testsucc = tests.filter(v => v.TestResult == false);
    const testfail = tests.filter(v => v.TestResult == true);
    const testpend = tests.filter(v => v.TestResult == "pending");
    return (
            <div className="layout__content">
                <div className="layout__content-main">
                    <h2 className="page-header">Dashboard</h2>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                    <div className="col-3">
                                        <div className='status-card'>
                                            <div className="status-card__icon">
                                                <i className="bx bx-happy-heart-eyes"></i>
                                            </div>
                                            <div className="status-card__info">
                                                <h4>{tests.length}</h4>
                                                <span>Total Tests</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className='status-card'>
                                            <div className="status-card__icon">
                                                <i className="bx bx-happy-alt"></i>
                                            </div>
                                            <div className="status-card__info">
                                                <h4>{testsucc.length}</h4>
                                                <span>Total success</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className='status-card'>
                                            <div className="status-card__icon">
                                                <i className="bx bx-confused"></i>
                                            </div>
                                            <div className="status-card__info">
                                                <h4>{testfail.length}</h4>
                                                <span>Total failed</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className='status-card'>
                                            <div className="status-card__icon">
                                                <i className="bx bx-smile"></i>
                                            </div>
                                            <div className="status-card__info">
                                                <h4>{testpend.length}</h4>
                                                <span>Total pending</span>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="col-4">

                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card__header">
                                    <h3>latest tests</h3>
                                </div>
                                <div className="card__body">
                                    <Table
                                        headData={latestOrders.header}
                                        renderHead={(item, index) => renderOrderHead(item, index)}
                                        bodyData={tests}
                                        renderBody={(item, index) => renderOrderBody(item, index)}
                                    />
                                </div>
                                <div className="card__footer">
                                    <Link to='/project'>create new test</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Dashboard
