import React from 'react'

function ScenarioCard (props) {
    return (
        <div className='status-card'>
            <div className="status-card__info">
                <h4>{props.title}</h4>
            </div>
        </div>
    )
}

export default ScenarioCard
