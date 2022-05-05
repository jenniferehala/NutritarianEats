import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const ExploreCuisine = (props) => {
    const [recipe, setRecipe] = useState([])

    useEffect(() => {
        document.title = "NutritarianEats"
        axios.get("http://localhost:8000/api/recipes/cuisine/findAllCuisine")
            .then(res => {
                console.log(res.data.results);
                setRecipe(res.data.results);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {/* Beginning of Container */}
            <div className="container ">
                <div className="container-xxl px-md-5 bg-white ">
                    <h1 className="py-4">Explore Cuisine</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Explore Cuisine</li>
                        </ol>
                    </nav>

                    <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mb-4">
                        {
                            recipe?.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <div className="category__img shadow">
                                            <Link to={`/recipes/cuisine/${item.name}`} className="col text-center category__link">
                                                <img src={require(`../img/${item.image}`)} alt="People Eating" />
                                            </Link>
                                        </div>
                                        <div className="pt-1">
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div>
            {/* End of container */}

            <footer className="py-5">
                Build by Jen E.
            </footer>
        </>
    )
}

export default ExploreCuisine;