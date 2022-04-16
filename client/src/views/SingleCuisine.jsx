import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


const SingleCuisine = (props) => {

    const [recipe, setRecipe] = useState([]);
    const { name } = useParams({})

    useEffect(() => {
        document.title = "NutritarianEats"
        console.log(name)
        axios.get(`http://localhost:8000/api/recipes/cuisine/${name}`)
            .then(res => {
                console.log(res.data.results);
                setRecipe(res.data.results);
            })
            .catch(err => console.log(err))
    }, [name]);

    return (
        <div>
            <h1>Hello World</h1>
            {
                recipe?.map((value) => {
                    return <div value={value} key={value._id}>
                        {value.cuisine}
                        {value.imgUrl}

                    </div>
                })
            }
        </div>

    )
}

export default SingleCuisine