import React, { useState } from 'react'
import { useEffect } from 'react'
import '../App.css'
import axios from 'axios';
import Cuisine from '../components/Cuisine'
import Recipes from '../components/Recipes';
import LatestRecipe from '../components/LatestRecipe';

const Main = (props) => {
    const [cuisine, setCuisine] = useState([])
    const [recipe, setRecipe] = useState([])
    const [latestRecipe, setLatestRecipe] = useState([])

    useEffect(() => {
        document.title = "NutritarianEats"
        axios.get("http://localhost:8000/api/recipes/cuisine/findCuisine")
            .then(res => {
                // console.log(res.data.results);
                setCuisine(res.data.results);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/recipes/latest")
            .then(res => {
                console.log(res.data.results);
                setLatestRecipe(res.data.results);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/recipes/findAll")
            .then(res => {
                console.log(res.data.results);
                setRecipe(res.data.results);
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <>

            {/* Beginning of Container */}
            <div className="container ">
                <div className="container-xxl px-md-5 bg-white ">
                    <div className="row flex-lg-row-reverse align-items-center py-4 mb-4 ">
                        <div className="col-12 col-lg-6">
                            <img src="/img/main.png" alt="photo" height="100" className="d-block mx-lg-auto img-fluid" Loading="lazy" />
                        </div>
                        <div className="col-12 col-lg-6">
                            <h1 className="display-5 fw-bold mb-3"> Delicious Nutritarian Recipes to support your optimal health.</h1>
                            <p className="lead">
                                Get ready to change your life. Explore our wide variety of nutritarian recipes including: Breakfast, Burgers, Desserts, Vegan Main Dishes, Non-Vegan Main Dishes, Dressings, Salads, Smoothies, Soups, and Stews
                            </p>
                            <div className="d-grid gap-2 d-md-flex justify content-md-start">
                                <a href="/explore" className="btn btn primary btn-dark btn-lg px-4 me-md-2">Explore Latest</a>
                                <a href="/random" className="btn btn primary btn-dark btn-lg px-4 me-md-2">Random</a>
                            </div>
                        </div>
                    </div>
                    {/* Card 1 Ends */}
                    {/* Categories Start */}
                    <div className="row row-cols-2 row-cols-sm-6 g-2 g-lg-3 py-4">


                        {
                            cuisine.map((item, i) => {
                                return <Cuisine key={i} cuisine={item} />
                            })
                        }


                        <a href="/recipes/cuisine/findAllCuisine" className="col text-center category__link">
                            <div className="category__img shadow">
                                <img src="/img/people_eating3.jpg" alt="People Eating" Loading="lazy" />
                            </div>
                            <div className="pt-1">
                                View All
                            </div>
                        </a>
                    </div>

                    {/* Categories End */}

                    {/* Latest Start */}

                    <section className="pb-4 pt-4">
                        <div className="d-flex mb-2 align-items-center">
                            <h2>Latest Recipes</h2>
                            <a href="/explore/latest" className="ms-auto">View More</a>
                        </div>
                        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 py-4">

                            {
                                latestRecipe.map((item, i) => {
                                    return <LatestRecipe key={i} recipe={item} />
                                })
                            }

                        </div>

                    </section>
                    {/* Latest End */}

                    {/* Thai Start */}

                    <section className="pb-4 pt-4">
                        <div className="d-flex mb-2 align-items-center">
                            <h2>Thai Recipes</h2>
                            <a href="/explore/latest" className="ms-auto">View More</a>
                        </div>
                        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 py-4">

                            {
                                recipe.filter(recipe => recipe.cuisine === 'Thai').slice(0, 5).map((item, i) => {
                                    return <Recipes key={i} recipe={item} />
                                })
                            }

                        </div>

                    </section>
                    {/* Thai End */}

                    {/* Indian Start */}

                    <section className="pb-4 pt-4">
                        <div className="d-flex mb-2 align-items-center">
                            <h2>American Recipes</h2>
                            <a href="/explore/latest" className="ms-auto">View More</a>
                        </div>
                        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 py-4">

                            {
                                recipe.filter(recipe => recipe.cuisine === "American").slice(0, 5).map((item, i) => {
                                    return <Recipes key={i} recipe={item} />
                                })
                            }

                        </div>

                    </section>
                    {/* Indian End */}


                    {/* Submit Start */}
                    <section className="px-4 py-5 my-5 text-center ">
                        <img className="d-block mx-auto mb-4 img-fluid" src="/img/bottom2.png" alt="Publish your recipe for FREE today" width="566" height="208" Loading="lazy" />
                        <h1 className="display-5 fw-bold">Publish your recipe for FREE today</h1>
                        <div className="col-lg-6 mx-auto">
                            <p className="lead mb-4">
                                Publish your recipe for and join our thriving healthy community!
                            </p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <a href="/recipes/create" className="btn btn-primary btn-dark btn-lg">Submit Recipe </a>
                            </div>
                        </div>
                    </section>
                    {/* Submit End */}


                </div>
            </div>
            {/* End of container */}


            <footer className="py-5">

            </footer>


        </>

    )
}

export default Main;