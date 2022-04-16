import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


const SingleCuisine = (props) => {

    const [cuisine, setCuisine] = useState([]);
    const { _id } = useParams({})

    useEffect(() => {
        document.title = "NutritarianEats"
        axios.get(`http://localhost:8000/api/recipes/cuisine/${_id}`)
            .then(res => {
                console.log(res.data.results);
                setCuisine(res.data.results);
            })
            .catch(err => console.log(err))
    }, [_id]);

    return (
        <div>
            <h1>hi</h1>
            {/* {
                cuisine?.map((value, i) => {
                    return <div value={value} key={i}>
                        {cuisine._id}
                    </div>
                })
            } */}
        </div>

    )
}

export default SingleCuisine