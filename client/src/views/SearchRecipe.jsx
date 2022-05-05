import React from 'react'
import { Link } from 'react-router-dom'

const SearchRecipe = (props) => {
    const { results } = props
    // console.log(props.results);

    return (
        <div>
            {/* Beginning of Container */}
            <div className="container ">
                <div className="container-xxl px-md-5 bg-white ">
                    <h1 className="py-4">Search Results</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Search Results</li>
                        </ol>
                    </nav>

                    <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mb-4">
                        {
                            results?.map((item, i) => {
                                return <div key={i}>
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