import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Rating from '../components/Rating';

const RandomRecipe = (props) => {

    const [random, setRandom] = useState([]);
    const history = useHistory();

    useEffect(() => {
        document.title = "NutritarianEats"
        axios.get(`http://localhost:8000/api/recipes/explore/random`)
            .then(res => {
                console.log(res.data.results[0]);
                setRandom(res.data.results[0]);
            })
            .catch(err => console.log(err))
    }, []);

    const onDeleteHandler = (_id) => {
        if (window.confirm(`Are you sure you want to delete ${random.title}?`)) {
            axios.delete(`http://localhost:8000/api/recipes/${random._id}/delete`)
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
                        <li className="breadcrumb-item active" aria-current="page">{random.title}</li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <img src={`${random.imgUrl}`} alt="random" className="img-fluid sticky-top " style={{ top: "20px", }} />
                    </div>
                    <div className="col-12 col-md-8">

                        <div className="row">
                            <div className="col-12"><h1>{random.title}</h1></div>
                            <div className="col-12 mb-2">
                                <i className="bi bi-tag mx-2"></i>
                                {random.cuisine}
                            </div>

                            <div className="mb-2">
                                {random?.tags?.map((value, i) => {
                                    if (value.isChecked === true) {
                                        return <div className="col-12 mb-2" value={value} key={i} >
                                            <i className="bi bi-tag mx-2"></i>
                                            {value.name}
                                        </div>
                                    }
                                })
                                }
                            </div>

                            <div className="col-12 my-4">
                                <h4>Description:</h4>
                                {random.description}</div>

                            <div className="col-12 mb-4" >
                                Source: <a href={random.source} target="_blank" rel="noreferrer">{random.source}</a>
                            </div>

                            <div className="col-12 mb-2">
                                <h5>GBOMBS:</h5>
                                <ul>
                                    {random?.gbombs?.map((value, i) => {
                                        if (value.isChecked === true) {
                                            return <div className="row" value={value} key={i}>· {value.name} </div>
                                        }
                                    })
                                    }
                                </ul>
                            </div>

                            <div className="col-12 mb-1">
                                <h5 className="mt-2 mb-3">Serving(s): {random.serving}</h5>
                            </div>
                            <div className="row pt-2">
                                <div className="col-12"><h4>Instructions:</h4> {random.instructions}</div>
                            </div>
                        </div>

                        <div className="row pt-4">
                            <div className="col-12">
                                <h4 className="mb-2">Ingredients:</h4>
                                <ul className="list-group list-group-flush mb-4">
                                    {random?.ingredientsList?.map((value, i) => {
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

                            <div className="col-12 mt-2 mb-4">
                                <div className="d-flex justify-content-left align-items-center">
                                    <h5 className="me-3 mt-2">Rating:</h5>
                                    <Rating maxRating={5} selectedRating={random.rating} />
                                </div>
                            </div>

                            {
                                random.comment ?
                                    <div className="card mb-4 mt-1">
                                        <div className="card-body">
                                            <p>Comment(s):</p>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex flex-row align-items-center">
                                                    <p className="small text-muted mb-0">{random.comment}</p>
                                                    <i className="far fa-thumbs-up mx-2 fa-xs text-black"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }

                            <div className="col-12 mt-3 mb-4"> Author: {random.author}</div>

                            <div className="mt-3">
                                <Link to={`/recipes/${random._id}/edit`} className="">
                                    <button className=" btn btn-success mx-2">Update</button>
                                </Link>
                                <button onClick={(e) => onDeleteHandler(random._id)} className="btn btn-danger mx-2" >Delete</button>
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

export default RandomRecipe;