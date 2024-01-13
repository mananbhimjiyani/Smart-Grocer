// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faChartBar, faList, faLightbulb } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import './App.css';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="toggle-btn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={collapsed ? faBars : faArrowLeft} />
            </div>
            {collapsed? <div className="menu-heading"></div> :<h2>Menu</h2>}
            <ul>
                <li>
                    <Link to="/dashboard">
                        {collapsed ? <FontAwesomeIcon icon={faChartBar} /> : 'Dashboard'}
                    </Link>
                </li>
                <li>
                    <Link to="/inventory">
                        {collapsed ? <FontAwesomeIcon icon={faList} /> : 'Inventory Items'}
                    </Link>
                </li>
                <li>
                    <Link to="/predictions">
                        {collapsed ? <FontAwesomeIcon icon={faLightbulb} /> : 'Predictions'}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
