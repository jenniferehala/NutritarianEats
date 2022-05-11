import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestRecipes = (props) => {

    const [latestRecipes, setLatestRecipes] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/recipes/explore/latestRecipes")
            .then(res => {
                console.log(res.data.results);
                setLatestRecipes(res.data.results);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {/* Beginning of Container */}
            <div className="container ">
                <div className="container-xxl px-md-5 bg-white ">
                    <h1 className="py-4">Explore Latest Cuisine</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Explore Latest Cuisine</li>
                        </ol>
                    </nav>

                    <section className="pb-4 pt-4">
                        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 py-4">
                            {
                                latestRecipes.map((value, i) => {
                                    return <>
                                        <div key={i}>
                                            <Link to={`/recipes/${value._id}`} className="col text-center category__link">
                                                <div className="category__img category__img--large shadow">
                                                    <img src={value.imgUrl} alt="food pic" />
                                                </div>
                                            </Link>
                                            <div className="pt-1" >
                                                {value.title}
                                            </div>
                                        </div >
                                    </>
                                })
                            }
                        </div>
                    </section>
                </div>
            </div>
            {/* End of container */}
            <footer className="py-5">
                Build by Jen E.
            </footer>
        </>
    )
}

export default LatestRecipes;