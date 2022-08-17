import React, {useState} from 'react'

import {useNavigate} from 'react-router-dom'
import HomeIllustration from "../assets/home-illustration.svg";



function Setting (){
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const history = useNavigate();

    let userName=JSON.parse(localStorage.getItem('username'))
    let users=JSON.parse(localStorage.getItem('users') || "[]")
    let userId=users.filter(v => v.username == userName);

    function handleFormSubmit(e) {
        e.preventDefault();

        if ((oldPassword===userId[0].password.replace(/"/g, ""))&& newPassword) {
            let user={
                id:Object.keys(users).length,
                username:userId[0].username,
                email:userId[0].email,
                password:newPassword
            }
            users.push(user)
            localStorage.setItem('users',JSON.stringify(users));
            alert('Your password has been successfully changed');
            history("/home");
        } else {
            alert('Your old password is incorrect');
        }
    }
    return (
        <div className="layout__content">
            <div className="layout__content-main">
                <h2 className="page-header">Settings</h2>
        <div className="HomeWrapper1">
            <div className="HomerContainer1">
                <div className="LeftCol">
                    <div>
                        <form className="form" onSubmit={handleFormSubmit}>
                            <div>
                                <h1 className="Title">Account Details</h1>
                            </div>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="form"
                                    value={userId[0].username.replace(/"/g, "")}
                                    readonly="true"
                                    required
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    id="form"
                                    value={userId[0].email.replace(/"/g, "")}
                                    readonly="true"
                                    required
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="password">Old Password</label>
                                <input
                                    type="password"
                                    id="form"
                                    placeholder="Enter old password"
                                    required
                                    onChange={(event) => setOldPassword(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="password">New Password</label>
                                <input
                                    type="password"
                                    id="form"
                                    placeholder="Enter new password"
                                    required
                                    onChange={(event) => setNewPassword(event.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label />
                                <button type="submit" className="styledLink">
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                <img id="Illustration" src={HomeIllustration} />
            </div>
        </div>
        </div>
        </div>
    )
}

export default Setting
