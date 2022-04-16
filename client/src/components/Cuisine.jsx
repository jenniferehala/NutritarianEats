import React from 'react'
import '../App.css'


const Cuisine = (props) => {
    return (
        <div>
            <a href={`/recipes/cuisine/${props.cuisine._id}`} className="col text-center category__link">
                <div className="category__img shadow">
                    <img src={`/img/${props.cuisine.image}`} alt="People Eating" Loading="lazy" />
                </div>
                <div className="pt-1">
                    {props.cuisine.name}
                </div>
            </a>


        </div>

    )
}

export default Cuisine;