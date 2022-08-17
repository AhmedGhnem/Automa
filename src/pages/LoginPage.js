import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from "react-router-dom";
import HomeIllustration from '../assets/home-illustration.svg'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        let users =JSON.parse(localStorage.getItem('users') || "[]")
        const user = users.filter(v => v.username == username);
        if (user.length>0) {
            if(password==user[0].password){
                localStorage.setItem("LoggedIn", JSON.stringify(true));
                localStorage.setItem("username", JSON.stringify(username));
                history("/home");
            }else{
                alert('Incorrect password');
            }
        }else {
            alert('Incorrect username');
        }

        /*for(let i=0;i<=Object.keys(users).length+1;i++){
            if (password == users[i].password && username == users[i].username) {
                localStorage.setItem("LoggedIn", JSON.stringify(true));
                history("/home");
            }else{
                alert('Incorrect username or password');
            }
        }*/
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
                        <form onSubmit={handleLogin} className="form">
                            <div>
                                <h1 className="Title">Login</h1>
                            </div>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="form"
                                    placeholder="Enter name"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="form"
                                    placeholder="Enter password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label />
                                <button type="submit" className="styledLink">
                                    Login
                                </button>
                            </div>
                            <div>
                                <label />
                                <div>
                                    You don't have an account?{' '}
                                    <Link to="/register" className="styledLink1">Register</Link>
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

export default LoginPage
