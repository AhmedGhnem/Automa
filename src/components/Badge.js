import React from 'react'

function Badge (props) {
    return (
        <div className={`badge badge-${props.type}`}>
            {props.content}
        </div>
    )
}

export default Badge
