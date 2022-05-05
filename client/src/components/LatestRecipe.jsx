import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';

const LatestRecipe = (props) => {
    return (
        <div>
            <Link to={`/recipes/${props.recipe._id}`} className="col text-center category__link">
                <div className="category__img category__img--large shadow">
                    <img src={`${props.recipe.imgUrl}`} alt="latest recipe" />
                </div>
                <div className="pt-1">
                    {props.recipe.title}
                </div>
            </Link>
        </div>
    )
}

export default LatestRecipe;