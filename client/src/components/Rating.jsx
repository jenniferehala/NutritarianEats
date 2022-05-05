import React from 'react'
import Star from './Star';

const Rating = ({
    maxRating,
    selectedRating
}) => {

    const renderStar = () => {
        const starsToRender = [];
        for (let i = 0; i < maxRating; i++) {
            starsToRender.push(<Star color={i < selectedRating ? "#FDDA0D" : ""} />)
        }
        return starsToRender;
    }

    return (
        <>
            {renderStar()}
        </>
    );
};

export default Rating;