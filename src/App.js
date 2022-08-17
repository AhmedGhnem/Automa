import React, {useEffect, useState} from 'react';
import './index.css';
import Header from "./components/Header";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./privateRoute/PrivateRoute";
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import ProjectPage from "./pages/ProjectPage";
import ProjectIdPage from "./pages/ProjectIdPage";
import TestPage from "./pages/TestPage";
import SettingPage from "./pages/SettingPage";
import AccountSuccess from "./components/AccountSuccess";
import AddProjectPage from "./pages/AddProjectPage";
import ScenarioIdPage from "./pages/ScenarioIdPage";
import TestIdPage from "./pages/TestIdPage";

function App() {
    const savedNotif = localStorage.getItem('notifications');
    const [notifications, updateNotifications] = useState(savedNotif ? JSON.parse(savedNotif) : [])
    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications))
    }, [notifications])

    return (
            <div className="grid-container">
                <Header className="row" notifications={notifications} updateNotifications={updateNotifications}/>
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/success" element={<AccountSuccess />} />
                        <Route exact path="/home" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
                        <Route exact path="/project" element={<PrivateRoute> <ProjectPage /> </PrivateRoute>} />
                        <Route exact path="/addproject" element={<PrivateRoute> <AddProjectPage /> </PrivateRoute>} />
                        <Route exact path="/project/:id" element={<PrivateRoute> <ProjectIdPage /> </PrivateRoute>} />
                        <Route exact path="/scenario/:id" element={<PrivateRoute> <ScenarioIdPage notifications={notifications} updateNotifications={updateNotifications}/> </PrivateRoute>} />
                        <Route exact path="/test" element={<PrivateRoute> <TestPage /> </PrivateRoute>} />
                        <Route exact path="/test/:id" element={<PrivateRoute> <TestIdPage /> </PrivateRoute>} />
                        <Route exact path="/setting" element={<PrivateRoute> <SettingPage /> </PrivateRoute>} />
                    </Routes>
            </div>
    );
}

export default App;
