import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Create = (props) => {

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


    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
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
        axios.post("http://localhost:8000/api/recipes/create", form)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors)
            });

    }


    useEffect(() => {
        document.title = "NutritarianEats - Create"
    }, [])

    return (
        <div className="App">
            <div className="container ">
                <div className="container-xxl px-md-5 bg-white p-4">
                    <h1 className="text-center pt-3"> Create a New Recipe</h1>
                    {/* **********  Form Start ********** */}
                    <form action="" className="mt-5 w-50 mx-auto" onSubmit={onSubmitHandler}>

                        <div className="form-group mb-3">
                            <input type="text" name="title" className="form-control" placeholder="title" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.title && errors.title.message}</span>

                        <select name="categories" className="form-select my-3" onChange={onChangeHandler}>
                            <option disabled selected value> -- Select a Category -- </option>

                            {
                                categories.map((category, i) => {
                                    return <option value={category} key={i}> {category} </option>

                                })
                            }
                        </select>
                        <span className="alert-danger">{errors.category && errors.category.message}</span>


                        <select name="cuisine" className="form-select my-3" onChange={onChangeHandler}>
                            <option disabled selected value> -- Select a Cuisine -- </option>

                            {
                                cuisine.map((cuisine, i) => {
                                    return <option value={cuisine} key={i}> {cuisine} </option>

                                })
                            }
                        </select>
                        <span className="alert-danger">{errors.category && errors.category.message}</span>


                        <div className="form-group mb-3" >
                            <input type="text" name="description" className="form-control my-3" placeholder="description" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.description && errors.description.message}</span>

                        <div className="form-group mb-3" >
                            <input type="text" name="instructions" className="form-control my-3" placeholder="instructions" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.instructions && errors.instructions.message}</span>

                        <div className="form-group mb-3" >
                            <input type="number" name="serving" className="form-control my-3" placeholder="serving" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.serving && errors.serving.message}</span>

                        <div className="form-group mb-3" >
                            <input type="text" name="email" className="form-control my-3" placeholder="email" onChange={onChangeHandler} />
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
                        <button className="btn btn-outline-primary mb-3" type="button" onClick={() => handleAddField()} >+ Ingredient</button>


                        {/* ********** Ingredients End ********** */}

                        <div className="form-group mb-3" >
                            <input type="text" name="imgUrl" className="form-control" placeholder="imgUrl" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.imgUrl && errors.imgUrl.message}</span>

                        <div className="form-group mb-3" >
                            <input type="number" name="rating" className="form-control" placeholder="rating" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.rating && errors.rating.message}</span>

                        <div className="form-group mb-5" >
                            <textarea type="textarea" name="comment" className="form-control" placeholder="comment" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.comment && errors.comment.message}</span>

                        <div className="form-group mb-5" >
                            <input type="input" name="source" className="form-control" placeholder="source" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.comment && errors.comment.message}</span>

                        <div className="form-group mb-5" >
                            <input type="input" name="author" className="form-control" placeholder="author" onChange={onChangeHandler} />
                        </div>
                        <span className="alert-danger">{errors.comment && errors.comment.message}</span>


                        {/* ******* Checkbox TAGS ******* */}

                        <div className="d-flex flex-row mb-5" >

                            {
                                form.tags.map((tag, i) => (
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
                        <div className="d-flex flex-row my-3" name="gbombs">

                            {
                                form.gbombs.map((gbomb, i) => (
                                    <div className="form-inline mx-3" key={i}>
                                        <label>{gbomb.name}</label>
                                        <input
                                            type="checkbox"
                                            value={gbomb.name}
                                            checked={gbomb.isChecked}
                                            onChange={(event) => handleCheckedGbombs(i)}
                                            key={i}
                                        />
                                    </div>))}
                        </div>
                        <input type="submit" className="btn btn-success my-3" />
                    </form>
                    {/* **********  Form End ********** */}
                </div>
            </div>
        </div>
    )
}

export default Create;