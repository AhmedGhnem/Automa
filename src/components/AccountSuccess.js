import React from 'react';
import {Link } from "react-router-dom";
import HomeIllustration from '../assets/home-illustration.svg'

function AccountSuccess() {
    return (
        <div className="HomeWrapper">
            <div className="HomerContainer">
                <div className="LeftCol">
                    <div className="Title3">
                        Your account has been successfully created
                    </div>

                    <Link to="/login" className="styledLink" >
                        Login
                    </Link>
                </div>

                <img id="Illustration" src={HomeIllustration} />
            </div>
        </div>
    )
}

export default AccountSuccess
