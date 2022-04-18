import React, { useState } from 'react'
import { useEffect } from 'react'
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
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Explore Cuisine</li>
                        </ol>
                    </nav>

                    <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mb-4">

                        {
                            recipe?.map((item, i) => {

                                return (
                                    <div>
                                        <div className="category__img shadow" key={i}>
                                            <a href={`/cuisine/${item.name}`} className="col text-center category__link">
                                                <img src={require(`../img/${item.image}`)} alt="People Eating" Loading="lazy" />

                                            </a>

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

            </footer>


        </>

    )
}

export default ExploreCuisine;