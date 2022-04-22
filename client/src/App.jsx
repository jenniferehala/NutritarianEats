import logo from '../src/img/logo.svg'
import './App.css';
import { Switch, Route, Link, useHistory, } from 'react-router-dom'
import Main from './views/Main';
import Create from './views/Create';
import Edit from './views/Edit';
import SingleRecipe from './views/SingleRecipe';
import ExploreCuisine from './views/ExploreCuisine';
import SingleCuisine from './views/SingleCuisine';
import SearchRecipe from './views/SearchRecipe';
import LatestRecipes from './views/LatestRecipes';
import About from './views/About';
import axios from 'axios';
import { useState } from 'react';


function App() {

  const [state, setState] = useState([])

  const history = useHistory({})

  const onSubmitHandler = (event) => {
    event.preventDefault()

    const searchTerm = event.target.getElementsByTagName("input")[0].value

    if (searchTerm !== "") {
      axios.get(encodeURI(`http://localhost:8000/api/recipes/searchRecipes/${searchTerm}`))
        .then(res => {
          history.push("/recipes/searchRecipes");
          console.log(res.data.results);
          setState(res.data.results)
        })
        .catch(err => {
          console.log(err.response.data.err.errors);
        });
    }


  }
  return (

    <div className="App">

      <div className="container">
        <div className="container-xxl bg-white shadow-lg">
          {/* Beginning of Header */}
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-0 border-bottom">
            <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
              <img src={logo} width="147" height="147" alt="Nutritarian EatsLogo" />
            </Link>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <Link className="nav-link px-2 link-secondary" to="/">Home</Link>
              <Link className="nav-link px-2 link-dark" to="/recipes/create">Create</Link>
              <Link to="/recipes/about" className="nav-link px-2 link-dark">ßAbßout</Link>
              < Link to="/recipes/contact" className="nav-link px-2 link-dark" >Contact</Link>
            </ul>
            <div className="col-md-3 text-end">

              <form action="" onSubmit={onSubmitHandler}>
                <div className="form-group row">
                  <input type="search" name="searchTerm" className="form-control col-sm mx-2" placeholder="Search..." aria-label="Search" />
                  <input type="submit" className="btn btn-success col-sm-3" value="Search" />
                </div>
              </form>

            </div>
          </header>
        </div>
      </div>
      {/* End of Header */}


      {/* Results Start */}
      {/* <div className="container">
        <div className="container-xxl px-md-5 bg-white ">
          <div className="row row-cols-2 row-cols-sm-6 g-2 g-lg-3 py-4">
            {
              state?.map((item, i) => {
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
      </div> */}
      {/* Results End */}


      <Switch>
        <Route exact path="/" >
          <Main />
        </Route >

        <Route exact path="/recipes/create" >
          <Create />
        </Route>

        <Route exact path="/recipes/about" >
          <About />
        </Route>

        <Route exact path="/recipes/searchRecipes" >
          <SearchRecipe />
        </Route>


        <Route exact path="/recipes/cuisine/findAllCuisine" >
          <ExploreCuisine />
        </Route>

        <Route exact path="/recipes/:_id/edit" >
          <Edit />
        </Route>

        <Route exact path="/recipes/:_id" >
          <SingleRecipe />
        </Route>

        <Route exact path="/recipes/cuisine/:name" >
          <SingleCuisine />
        </Route>



        <Route exact path="/recipes/explore/latest" >
          <LatestRecipes />
        </Route>

      </Switch>
    </div >


  );
}

export default App;
