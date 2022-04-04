import React from "react";
import {BackgroundImage, Body, DirectoryItemContainer} from'./directory-item.styles.jsx';
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ title, imageUrl, route }) => {
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage
                className="backgroundImage"
                imageUrl = {imageUrl}
            />
            <Body>
                <h1>{title}</h1>
                <p>SHOP NOW</p>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;