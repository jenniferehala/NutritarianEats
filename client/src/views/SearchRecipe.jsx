import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchRecipe = (props) => {

    const [state, setState] = useState([])


    return (
        <div>
            <h1>Hello World</h1>
            <div>Search</div>
            <div className="container">
                <div className="container-xxl px-md-5 bg-white ">
                    <div className="row row-cols-2 row-cols-sm-6 g-2 g-lg-3 py-4">
                        {
                            state?.map((item) => {
                                return <div>
                                    <Link to={`/recipes/${item._id}`} className="col text-center category__link">

                                        <div className="category__img category__img--large shadow">
                                            <img src={`${item.imgUrl}`} alt="results recipe" />
                                        </div>
                                        {item.title}
                                    </Link>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchRecipe;