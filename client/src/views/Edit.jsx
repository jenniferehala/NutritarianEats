import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Edit = (props) => {

    const { _id } = useParams({})
    const history = useHistory();
    const category = ['Breakfast', 'Burgers, Pizza, Wraps and Chips', 'Desserts', 'Main Dishes - Vegan', 'Non-Vegan', 'Dressings, Dips and Sauces', 'Salads', 'Smoothies, Blended Salads and Juices', 'Soups and Stews'];
    const cuisine = ['French', 'Indian', 'American', 'Thai', 'Mexican', 'Spanish', 'Chinese', 'Japanese', 'Italian', 'Greek', "Mediterranean", "Worldwide"];
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
        category: category[0],
        cuisine: cuisine[0],
        cuisineImg: "",
        imgUrl: "",
        rating: null,
        comment: "",
        source: "",
        author: "",
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
    }, [_id]);

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
        });
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

    const handleAddField = () => {
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
                    <div className="col-lg-7 mx-auto">
                        <h4 className="lead">Update form below.</h4>
                    </div>
                </div>
                {/* **********  Form Start ********** */}
                <div className="row justify-content-center">
                    <div className="col-9">
                        <form action="" className="" onSubmit={onSubmitHandler}>
                            <div className="row g-3">
                                <div className="col-12 mb-3">
                                    <label className="form-label">Title: </label>
                                    <input type="text" value={form.title} name="title" className="form-control" placeholder="title" onChange={onChangeHandler} />
                                    <span className="alert-danger">{errors.title && errors.title.message}</span>
                                </div>

                                {/*********** CATEGORIES ***********/}
                                <div className="form-group mb-3">
                                    <label className="form-label mb-0">Categories: </label>
                                    <select name="category" value={form.category} className="form-select mt-2" onChange={onChangeHandler}>
                                        {
                                            category.map((category, i) => {
                                                return <option value={category} key={i}> {category} </option>
                                            })
                                        }
                                    </select>
                                    <span className="alert-danger">{errors.category && errors.category.message}</span>
                                </div>

                                {/*********** CUISINE ***********/}
                                <div className="form-group mb-3">
                                    <label className="form-label mb-0">Cuisine: </label>
                                    <select name="cuisine" value={form.cuisine} className="form-select mt-2" onChange={(e) => onSelectHandler(e)}>
                                        {
                                            cuisine.map((cuisines, i) => {
                                                return <option value={cuisines} key={i}> {cuisines} </option>
                                            })
                                        }
                                    </select>
                                    <span className="alert-danger">{errors.cuisine && errors.cuisine.message}</span>
                                </div>

                                <div className="form-group mb-3" >
                                    <label className="form-label">Description: </label>
                                    <textarea type="text" value={form.description} name="description" className="form-control" placeholder="description" onChange={onChangeHandler} rows="3" />
                                    <span className="alert-danger">{errors.description && errors.description.message}</span>
                                </div>

                                <div className="form-group mb-3" >
                                    <label className="form-label">Instructions: </label>
                                    <textarea type="text" value={form.instructions} name="instructions" className="form-control" placeholder="instructions" onChange={onChangeHandler} rows="6" />
                                    <span className="alert-danger">{errors.instructions && errors.instructions.message}</span>
                                </div>

                                <div className="form-group mb-3" >
                                    <label className="form-label">Serving: </label>
                                    <input type="number" value={form.serving} name="serving" className="form-control" placeholder="serving" onChange={onChangeHandler} />
                                    <span className="alert-danger">{errors.serving && errors.serving.message}</span>
                                </div>

                                <div className="form-group mb-3" >
                                    <label className="form-label">Email: </label>
                                    <input type="text" value={form.email} name="email" className="form-control" placeholder="email" onChange={onChangeHandler} />
                                    <span className="alert-danger">{errors.email && errors.email.message}</span>
                                </div>

                                {/*********** INGREDIENTS START ***********/}
                                <div className="row form-group">
                                    <label className="form-label my-2">Ingredients:</label>
                                    {
                                        form.ingredientsList.map((value, i) => (
                                            <div className="" key={i}>
                                                <label className="mx-1">Quantity:</label>
                                                <input
                                                    className="col-sm-1"
                                                    type="number"
                                                    value={value.quantity}
                                                    name="quantity"
                                                    onChange={(event) => handleAddQuantity(event, i)}
                                                />
                                                <label className="mx-1">Unit:</label>
                                                <select name="unit" value={value.unit} className="col-sm-1" onChange={(event) => handleAddUnit(event, i)}>
                                                    {
                                                        units.map((unit, i) => {
                                                            return <option value={unit} key={i}> {unit} </option>
                                                        })
                                                    }
                                                </select>
                                                <label className="mx-2">Ingredient:</label>
                                                <input
                                                    className="col-sm-3"
                                                    type="text"
                                                    key={i}
                                                    value={value.ingredient}
                                                    name="ingredients"
                                                    onChange={event => handleAddIngredient(event, i)}
                                                />
                                                <button className="col btn btn-outline-primary mx-2 my-1" type="button" onClick={() => handleAddField()} >+Ingredient</button>
                                                {i ? <button type="button" className="col btn btn-outline-danger mx-1" onClick={() => handleRemoveField(i)}>Remove</button>
                                                    : null
                                                }
                                            </div>))}
                                </div>
                                {/*********** INGREDIENTS END ***********/}

                                <div className="form-group mb-3 mt-4" >
                                    <label className="form-label">Recipe Image URL: </label>
                                    <input type="text" name="imgUrl" value={form.imgUrl} className="form-control" placeholder="imgUrl" onChange={onChangeHandler} />
                                    <span className="alert-danger">{errors.imgUrl && errors.imgUrl.message}</span>
                                </div>
                                <div className="form-group mb-3" >
                                    <label className="form-label">Rating: </label>
                                    <input type="number" value={form.rating} name="rating" className="form-control" placeholder="rating" onChange={onChangeHandler} />
                                    <span className="alert-danger">{errors.rating && errors.rating.message}</span>
                                </div>
                                <div className="form-group mb-3" >
                                    <label className="form-label">Comment: </label>
                                    <textarea type="textarea" value={form.comment} name="comment" className="form-control" placeholder="comment" onChange={onChangeHandler} />
                                    <span className="alert-danger">{errors.comment && errors.comment.message}</span>
                                </div>
                                <div className="form-group mb-3" >
                                    <label className="form-label">Source Website: </label>
                                    <input type="input" value={form.source} name="source" className="form-control" placeholder="source website" onChange={onChangeHandler} />
                                    <span className="alert-danger">{errors.source && errors.source.message}</span>
                                </div>
                                <div className="form-group mb-3" >
                                    <label className="form-label">Author: </label>
                                    <input type="input" value={form.author} name="author" className="form-control" placeholder="author" onChange={onChangeHandler} />
                                </div>
                                <span className="alert-danger">{errors.author && errors.author.message}</span>

                                {/* ******* Checkbox TAGS ******* */}
                                <div className="d-flex flex-row my-3 text-center" >
                                    {
                                        form.tags?.map((tag, i) => (
                                            <div className="form-inline mx-3" key={i}>
                                                <label>{tag.name}</label>
                                                <input
                                                    type="checkbox"
                                                    value={tag.name}
                                                    checked={tag.isChecked}
                                                    onChange={(event) => handleCheckedTags(i)}
                                                    key={i}
                                                />
                                            </div>
                                        ))}
                                </div>

                                {/* ******* Checkbox GBOMBS ******* */}
                                <div className="d-flex flex-row my-3 justify-content-center" name="gbombs">
                                    {
                                        form.gbombs?.map((gbomb, i) => (
                                            <div className="form-inline mx-3 " key={i}>
                                                <label>{gbomb.name}</label>
                                                <input
                                                    type="checkbox"
                                                    value={gbomb.name}
                                                    checked={gbomb.isChecked}
                                                    onChange={(event) => handleCheckedGbombs(i)}
                                                    key={i}
                                                    className="mx-2"

                                                />
                                            </div>))}
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <input type="submit" value='Submit' className="btn btn-success my-3 mx-2 align-center" />
                                    <Link to={`/recipes/${_id}`}><button className="btn btn-primary my-3 align-center mx-2">Back</button></Link>
                                </div>
                            </div>
                        </form>
                        {/* **********  Form End ********** */}
                    </div>
                </div>
            </div >
            <footer className="py-5">
                Build by Jen E.
            </footer>
        </div >
    )
}

export default Edit;