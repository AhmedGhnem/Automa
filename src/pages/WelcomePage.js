import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import HomeIllustration from '../assets/home-illustration.svg'

function WelcomePage() {
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('LoggedIn')) {
            history("/home");
        }
    }, []);
    return (
        <div className="HomeWrapper">
            <div className="HomerContainer">
                <div className="LeftCol">
                    <div className="Title1">
                        Welcome to Automa
                    </div>
                    <div className="Title2">
                        Automatically build, test, release, and monitor apps for every platform.
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

export default WelcomePage
