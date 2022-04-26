import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'


const Cuisine = (props) => {

    return (
        <div>
            <div className="category__img shadow">
                <Link to={`/recipes/cuisine/${props.value.name}`} className="col text-center category__link">
                    <img src={require(`../../../backend/uploads/${props.value.image}`)} alt="food pic" />
                </Link>

            </div>
            <div className="pt-1">
                {props.value.name}
            </div>



        </div >

    )
}

export default Cuisine;