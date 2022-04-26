import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Edit = (props) => {

    const { _id } = useParams({})
    const history = useHistory();
    const categories = ['Breakfast', 'Burgers, Pizza, Wraps and Chips', 'Desserts', 'Main Dishes - Vegan', 'Non-Vegan', 'Dressings, Dips and Sauces', 'Salads', 'Smoothies, Blended Salads and Juices', 'Soups and Stews'];
    const cuisine = ['Indian', 'American', 'Thai', 'Mexican', 'Spanish', 'Chinese'];
    const units = ["none", "block(s)", "bushel(s)", "clove(s)", "can(s)", "drop(s)", "smidgen", "pinch", "dash", "teaspoon(s)", "tablespoon(s)", "fl oz(s)", "ounce(s)", "cup(s)", "pint(s)", "quart(s)", "gallon(s)", "pound(s)", "milliliter(s)", "liter(s)"]
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        title: "",
        description: "",
        instructions: "",
        serving: null,
        email: "",
        ingredientsList: [
            { ingredient: "", quantity: 0, unit: units[0] },
        ],
        category: categories[0],
        cuisine: cuisine[0],
        cuisineImg: "",
        imgUrl: "",
        rating: null,
        comment: "",
        tags: [
            { name: "Athletic/Higher caloric", isChecked: false },
            { name: "Aggressive Weight Loss", isChecked: false },
            { name: "Kid-Friendly", isChecked: false },
            { name: "Non-Vegan", isChecked: false },
            { name: "Diabetes reversal", isChecked: false },
            { name: "Quick and Easy", isChecked: false },
        ],
        gbombs: [
            { name: "Greens", isChecked: false },
            { name: "Beans", isChecked: false },
            { name: "Onions", isChecked: false },
            { name: "Mushrooms", isChecked: false },
            { name: "Berries", isChecked: false },
            { name: "Seeds", isChecked: false }
        ]
    })

    // tags = {
    //     'kids': {isChecked: true, name: 'Kid-Friendly'},
    //     'weightloss': {isChecked: true, name: 'Aggressive Weight Loss'}
    // }

    useEffect(() => {
        document.title = "NutritarianEats - Edit"
        axios.get(`http://localhost:8000/api/recipes/${_id}`)
            .then(res => {
                console.log(res.data.results)
                const updatedTags = [...form.tags];
                const updatedGbombs = [...form.gbombs];
                const result = res.data.results;

                result.tags.map((tag, i) => {
                    updatedTags.map((existingTag) => {
                        if (existingTag.name === tag.name) {
                            existingTag.isChecked = tag.isChecked
                        }
                    })

                })

                result.gbombs.map((gbomb, i) => {
                    updatedGbombs.map((existingGbomb) => {
                        if (existingGbomb.name === gbomb.name) {
                            existingGbomb.isChecked = gbomb.isChecked
                        }
                    })
                })
                setForm({ ...result, tags: updatedTags, gbombs: updatedGbombs });

            })
            .catch(err => {
                console.log(err)
                setErrors(err)
            })
    }, [_id])




    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSelectHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            cuisineImg: `${e.target.value}_food.jpg`
        })

    }

    const handleAddCuisineField = () => {
        setForm(prev => ({
            ...prev, cuisine: ""
        }))
    }

    const handleAddIngredient = (e, index) => {
        form.ingredientsList[index].ingredient = e.target.value;
        setForm({ ...form })
    }

    const handleAddQuantity = (e, index) => {
        form.ingredientsList[index].quantity = e.target.value;
        setForm({ ...form })
    }

    const handleAddUnit = (e, index) => {
        form.ingredientsList[index].unit = e.target.value;
        setForm({ ...form })
    }


    const handleAddIngredientField = () => {
        setForm(prev => ({
            ...prev, ingredientsList: [...prev.ingredientsList, { ingredient: "", quantity: 0, unit: units[0] }]

        }))
    }


    const handleRemoveField = (i) => {
        form.ingredientsList.splice(i, 1);
        setForm({ ...form });
    }

    const handleCheckedTags = (index) => {
        setForm(prev => ({
            ...prev,
            tags: [
                ...prev?.tags?.map(
                    ({ isChecked, ...rest }, idx) => (
                        idx === index ?
                            { ...rest, isChecked: !isChecked } :
                            { ...rest, isChecked })
                )]
        }));
    }



    const handleCheckedGbombs = (index) => {
        setForm(prev => ({
            ...prev,
            gbombs: [
                ...prev?.gbombs?.map(
                    ({ isChecked, ...rest }, idx) => (
                        idx === index ?
                            { ...rest, isChecked: !isChecked } :
                            { ...rest, isChecked })
                )]
        }));

    }



    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(form)
        axios.patch(`http://localhost:8000/api/recipes/${_id}/edit`, form)
            .then(res => {
                console.log(res);
                history.push(`/recipes/${_id}`);
            })
            .catch(err => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors)
            });

    }




    return (
        <div className="container ">
            <div className="container-xxl px-md-5 bg-white p-4">
                <div className="px-4 py-5 text-center">
                    <h1 className="display-5 fw-bold"> Edit Your Recipe</h1>
                    <div className="col-lg-6 mx-auto mb-5">
                        <h4 className="lead">Update form below.</h4>
                    </div>
                    {/* **********  Form Start ********** */}
                    <form action="" className="mt-5 w-50 mx-auto" onSubmit={onSubmitHandler}>
                        <div className="form-group mb-3">
                            <label className="form-label">Title: </label>
                            <input type="text" value={form.title} name="title" className="form-control" placeholder="title" onChange={onChangeHandler} />
                        </div>

                        <span className="alert-danger">{errors.title && errors.title.message}</span>
                        {/* CATEGORIES */}
                        <div className="form-group mb-3">
                            <label className="">Categories: </label>
                            <select name="categories" value={form.category} className="" onChange={onChangeHandler}>
                                {
                                    categories.map((category, i) => {
                                        return <option value={category} key={i}> {category} </option>
                                    })
                                }
                            </select>
                            <span className="alert-danger">{errors.category && errors.category.message}</span>
                        </div>
                        {/* CUISINE*/}
                        <div className="form-group mb-3">
                            <label className="">Cuisine: </label>
                            <select name="cuisine" value={form.cuisine} className="col-md-3" onChange={(e) => onSelectHandler(e)}>
                                {
                                    cuisine.map((cuisine, i) => {
                                        return <option value={cuisine} key={i}> {cuisine} </option>
                                    })
                                }
                            </select>
                            <p>hi</p>
                            <button className="btn btn-outline-primary mb-3" type="button" onClick={() => handleAddCuisineField()} >+ Cuisine</button>


                            <span className="alert-danger">{errors.category && errors.category.message}</span>


                        </div>
                        <label className="mt-3">Description: </label>
                        <div className="form-group mb-3" >
                            <textarea type="text" value={form.description} name="description" className="form-control my-3" placeholder="description" onChange={onChangeHandler} rows="3" />
                        </div>
                        <span className="alert-danger">{errors.description && errors.description.message}</span>
                        <label className="mt-3">Instructions: </label>
                        <div className="form-group mb-3" >
                            <textarea type="text" value={form.instructions} name="instructions" className="form-control my-3" placeholder="instructions" onChange={onChangeHandler} rows="6" />
                        </div>
                        <span className="alert-danger">{errors.instructions && errors.instructions.message}</span>
                        <div className="form-group mb-3" >
                            <label className="col-sm-1 my-3">Serving: </label>
                            <input type="number" value={form.serving} name="serving" className="col-sm-2 my-3" placeholder="serving" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.serving && errors.serving.message}</span>
                        <div className="form-group mb-3" >
                            <label className="col-sm-1 my-3">Email: </label>
                            <input type="text" value={form.email} name="email" className="col-sm-3 my-3" placeholder="email" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.email && errors.email.message}</span>
                        {/* ********** Ingredients Start ********** */}
                        <div className="form-group mb-3 mx-3">
                            {
                                form.ingredientsList.map((value, i) => (
                                    <div className="form-group" key={i}>
                                        <label className="mx-1">Quantity:</label>
                                        <input
                                            className="form-group col-sm-1 m-1"
                                            type="text"
                                            value={value.quantity}
                                            name="quantity"
                                            onChange={(event) => handleAddQuantity(event, i)}
                                        />
                                        <label className="mx-2">Unit:</label>
                                        <select name="categories" className="form-group col-md-2" onChange={(event) => handleAddUnit(event, i)}>
                                            {
                                                units.map((unit, i) => {
                                                    return <option value={unit} key={i}> {unit} </option>
                                                })
                                            }
                                        </select>
                                        <label className="mx-2">Ingredient:</label>
                                        <input
                                            className="form-group col-sm-3 m-2"
                                            type="text"
                                            key={i}
                                            value={value.ingredient}
                                            name="ingredients"
                                            onChange={event => handleAddIngredient(event, i)}
                                        />
                                        {i ? <button type="button" className="btn btn-outline-danger m-3" onClick={() => handleRemoveField(i)}>Remove</button>
                                            : null
                                        }
                                    </div>))}
                        </div>
                        <button className="btn btn-outline-primary mb-3" type="button" onClick={() => handleAddIngredientField()} >+ Ingredient</button>
                        {/* ********** Ingredients End ********** */}
                        <div className="form-group mb-3" >
                            <label className="col-sm-1 my-3">Serving: </label>
                            <input type="text" value={form.imgUrl} name="imgUrl" className="col-sm-9" placeholder="imgUrl" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.imgUrl && errors.imgUrl.message}</span>
                        <div className="form-group mb-3" >
                            <label className="col-sm-1 my-3">Rating: </label>
                            <input type="number" value={form.rating} name="rating" className="col-sm-1" placeholder="rating" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.rating && errors.rating.message}</span>
                        <div className="form-group" >
                            <label className="col-sm-1 my-3">Comment: </label>
                            <textarea type="textarea" value={form.comment} name="comment" className="col-sm-9" placeholder="comment" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.comment && errors.comment.message}</span>
                        <div className="form-group mb-3" >
                            <label className="col-sm-1 my-3">Source: </label>
                            <input type="input" value={form.source} name="source" className="col-sm-9" placeholder="source website" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.comment && errors.comment.message}</span>
                        <div className="form-group" >
                            <label className="col-sm-1 my-3">Author: </label>
                            <input type="input" value={form.author} name="author name" className="col-sm-3" placeholder="author" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.comment && errors.comment.message}</span>
                        {/* ******* Checkbox TAGS ******* */}
                        <div className="d-flex flex-row my-5" >
                            {
                                form.tags.map((tag, i) => (
                                    <div className="form-inline mx-3" key={i}>
                                        <label className="mx-2">{tag.name}</label>
                                        <input
                                            type="checkbox"
                                            checked={tag.isChecked}
                                            onChange={(event) => handleCheckedTags(i)}
                                            key={i}
                                        />
                                    </div>
                                ))}
                        </div>
                        {/* ******* Checkbox GBOMBS ******* */}
                        <div className="d-flex flex-row my-3" name="gbombs">
                            {
                                form.gbombs.map((gbomb, i) => (
                                    <div className="form-inline mx-3" key={i}>
                                        <label className="mx-2">{gbomb.name}</label>
                                        <input
                                            type="checkbox"
                                            value={gbomb.name}
                                            checked={gbomb.isChecked}
                                            onChange={(event) => handleCheckedGbombs(i)}
                                            key={i}
                                        />
                                    </div>))}
                        </div>
                        <div className="d-flex justify-content-md-center align-items-center">
                            <input type="submit" className="btn btn-success mx-2 mt-4" />
                            <Link to={`/recipes/${_id}`}><button className="btn btn-primary mx-2 mt-4">Back</button></Link>
                        </div>
                    </form>

                    {/* **********  Form End ********** */}

                    <footer className="py-5">

                    </footer>

                </div>
            </div >
        </div >
    )
}

export default Edit;