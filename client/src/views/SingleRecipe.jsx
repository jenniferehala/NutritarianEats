import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
const SingleRecipe = (props) => {
    const history = useHistory({})
    const [recipe, setRecipe] = useState([]);
    const { _id } = useParams({})
    // const history = useHistory();

    useEffect(() => {
        document.title = "NutritarianEats"
        axios.get(`http://localhost:8000/api/recipes/${_id}`)
            .then(res => {
                console.log(res.data.results);
                setRecipe(res.data.results);
            })
            .catch(err => console.log(err))
    }, [_id]);

    const onDeleteHandler = (_id) => {
        // console.log(_id);
        // console.log(idx);
        if (window.confirm(`Are you sure you want to delete ${recipe.title}?`)) {
            axios.delete(`http://localhost:8000/api/recipes/${_id}/delete`)
                .then(res => {
                    console.log(res)
                    history.push("/dashboard")

                })
                .catch(err => console.log(err))
        }

    }

    return (


        <div className="container">
            <div className="container-xxl px-md-5 bg-white">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{recipe.title}</li>
                    </ol>
                </nav>

                <div className="row">

                    <div className="col-12 col-md-4">
                        <img src={`${recipe.imgUrl}`} alt="recipe" className="img-fluid sticky-top " style={{ top: "20px", }} />
                    </div>

                    <div className="col-12 col-md-8">
                        {/* first row */}
                        <div className="row">
                            <div className="col-12"><h1>{recipe.title}</h1></div>
                            <div className="col-12 mb-2">
                                <i className="bi bi-tag mx-2"></i>
                                {recipe.cuisine}
                            </div>
                            {recipe?.tags?.map((value, i) => {
                                if (value.isChecked === true) {
                                    return <div className="col-12 mb-2" value={value} key={i} >
                                        <i className="bi bi-tag mx-2"></i>
                                        {value.name}
                                    </div>

                                }

                            })
                            }

                            <div className="col-12 my-4"><h4>Description</h4> {recipe.description}</div>

                            <div className="col-12 mb-4" > Source: <a href={recipe.source} target="_blank" rel="noreferrer">{recipe.source}</a></div>
                            <div className="col-12 mb-2">
                                <h5>GBOMBS:</h5>
                                <ul>
                                    {recipe?.gbombs?.map((value, i) => {
                                        if (value.isChecked === true) {
                                            return <div className="row" value={value} key={i}>· {value.name} </div>
                                        }
                                    })
                                    }
                                </ul>
                            </div>



                            <div className="row pt-2">
                                <div className="col-12"><h4>Instructions</h4> {recipe.instructions}</div>
                            </div>

                        </div>
                        {/* first row end */}

                        {/* second row begin */}
                        <div className="row pt-4">
                            <div className="col-12">
                                <h4 className="mb-2">Ingredients</h4>
                                <ul className="list-group list-group-flush mb-4">

                                    {recipe?.ingredientsList?.map((value, i) => {
                                        if (value.unit === "none") {
                                            value.unit = "";
                                        }
                                        if (value.ingredient.includes("Optional")) {
                                            value.quantity = "";
                                        }
                                        return <li className="list-group-item" value={value} key={i}> {value.quantity} {value.unit} {value.ingredient}</li>
                                    })
                                    }

                                </ul>
                            </div>

                            <div className="col-12 mb-4">
                                <h5 className="">Serving: {recipe.serving}</h5>
                            </div>

                            <div className="col-12 mb-4"> Author: {recipe.author}</div>



                            <div className="">
                                <Link to={`/recipes/${_id}/edit`} className="">
                                    <button className=" btn btn-success mx-2">Update</button>
                                </Link>
                                <button onClick={(e) => onDeleteHandler(_id)} className="btn btn-danger mx-2" >Delete</button>
                            </div>

                        </div>
                    </div>
                </div>
                <footer className="py-5">
                    Build by: Jen E.
                </footer>
            </div>

        </div>



    )
}

export default SingleRecipe;