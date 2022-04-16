import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'


const Cuisine = (props) => {
    return (
        <div>
            <div className="category__img shadow">
                <Link to={`/recipes/cuisine/${props.cuisine.name}`} className="col text-center category__link">
                    <img src={`/img/${props.cuisine.image}`} alt="People Eating" Loading="lazy" />
                </Link>

            </div>
            <div className="pt-1">
                {props.cuisine.name}
            </div>



        </div >

    )
}

export default Cuisine;