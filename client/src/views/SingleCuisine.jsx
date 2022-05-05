import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


const SingleCuisine = (props) => {

    const [recipe, setRecipe] = useState([]);
    const { name } = useParams({})

    useEffect(() => {
        document.title = (`NutritarianEats - ${name}`)
        axios.get(`http://localhost:8000/api/recipes/cuisine/${name}`)
            .then(res => {
                console.log(res.data.results);
                setRecipe(res.data.results);
            })
            .catch(err => console.log(err))
    }, [name]);



    return (
        <div >
            <div className="container ">
                <div className="container-xxl px-md-5 bg-white ">
                    <h1 className="py-4">{name} Cuisine</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{name} Cuisine</li>
                        </ol>
                    </nav>

                    <section className="pb-4 pt-4">
                        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 py-4">
                            {
                                recipe.map((value, i) => {
                                    return <>
                                        <div key={i}>
                                            <Link to={`/recipes/${value._id}`} className="col text-center category__link">
                                                <div className="category__img category__img--large shadow">
                                                    <img src={value.imgUrl} alt="food pic" />
                                                </div>
                                            </Link>

                                            <div className="pt-1">
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
        </div>
    )
}

export default SingleCuisine