import React from "react";
import './home.styles.scss';
import { Outlet } from 'react-router-dom';
import Directory from "../../components/directory/directory.component";

const HomePage = () => {
    return(
        <div className = "homepage">
            <Outlet/>
            <Directory/>
        </div>
    );
}

export default HomePage;