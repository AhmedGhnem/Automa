import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import HomeIllustration from '../assets/home-illustration.svg'
import {addUser} from "../API/actions";

function RegisterPage() {

    const [username, setUserame] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (username && email && password) {
            let users =JSON.parse(localStorage.getItem('users') || "[]")
            let user={
                id:Object.keys(users).length,
                username:username,
                email:email,
                password:password
            }
            users.push(user)
            localStorage.setItem('users',JSON.stringify(users));
            await  addUser({username,password,email})
            history("/success");
        }
    }
    useEffect(() => {
        if (localStorage.getItem('LoggedIn')) {
            history("/home");
        }
    }, []);

    return (
        <div className="HomeWrapper">
            <div className="HomerContainer">
                <div className="LeftCol">

                    <div>
                        <form className="form" onSubmit={handleFormSubmit}>
                            <div>
                                <h1 className="Title">Register</h1>
                            </div>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="form"
                                    placeholder="Enter name"
                                    required
                                    onChange={(event) => setUserame(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    id="form"
                                    placeholder="Enter email"
                                    required
                                    onChange={(event) => setEmail(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="form"
                                    placeholder="Enter password"
                                    required
                                    onChange={(event) => setPassword(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label />
                                <button type="submit" className="styledLink">
                                    Register
                                </button>
                            </div>
                            <div>
                                <label />
                                <div>
                                    Already have an account?{' '}
                                    <Link to="/login" className="styledLink1">Sign-In</Link>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

                <img id="Illustration" src={HomeIllustration} />
            </div>
        </div>
    )
}

export default RegisterPage
