// App.js
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';

import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import SignInPage from './SignInPage';
import InventoryItems from "./InventoryItems";
import Predictions from "./Prediction";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is already authenticated
        const user = localStorage.getItem('loggedIn');
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={loggedIn ? <Navigate to="/dashboard"/> : <SignInPage/>}
                />
                <Route
                    path="/dashboard"
                    element={
                        loggedIn ? (
                            <div>
                                <Dashboard/>
                            </div>
                        ) : (
                            <Navigate to="/"/>
                        )
                    }
                />
                <Route
                    path="/inventory"
                    element={
                        loggedIn ? (
                            <div className={"App"}>
                                <div className="background-container">
                                    <Sidebar/>
                                    <div className="overlay">
                                        <InventoryItems/>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/"/>
                        )
                    }
                />
                <Route
                    path="/predictions"
                    element={
                        loggedIn ? (
                            <div className="background-container">
                                <Sidebar/>
                                <div className="overlay">
                                    <Predictions/>
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/"/>
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
