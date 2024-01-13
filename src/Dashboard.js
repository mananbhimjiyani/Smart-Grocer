import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import {auth} from './firebase';
import "./App.css";

export default function Dashboard() {
    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        auth.signOut();
        document.body.classList.remove('logged-in');
        window.location.reload();
    };
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePic: ''
    });


    useEffect(() => {
        // Check if the user is already authenticated
        const user = localStorage.getItem('loggedIn');
        if (user) {
            setLoggedIn(true);
            setUserData({
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                profilePic: localStorage.getItem('profilePic')
            });
            document.body.classList.add('logged-in'); // Add the 'logged-in' class to the body
        } else {
            document.body.classList.remove('logged-in'); // Remove the 'logged-in' class from the body
        }
    }, []);
    return (
        <div className={"App"}>
            <div className="background-container">
                <div className={'overlay'}>
                    <Sidebar/>
                    <div className={'container'}>
                        <h1>Welcome {userData.name}!</h1>
                        <img src={userData.profilePic} alt="Profile"/>
                        <p>Email: {userData.email}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
