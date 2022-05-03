import logo from '../src/img/logo.svg';
import './App.css';
import { Switch, Route, Link, useHistory, } from 'react-router-dom';
import Main from './views/Main';
import Create from './views/Create';
import Edit from './views/Edit';
import SingleRecipe from './views/SingleRecipe';
import ExploreCuisine from './views/ExploreCuisine';
import SingleCuisine from './views/SingleCuisine';
import SearchRecipe from './views/SearchRecipe';
import LatestRecipes from './views/LatestRecipes';
import RandomRecipe from './views/RandomRecipe';
import About from './views/About';
import Contact from './views/Contact';
import SignIn from './components/SignIn';
import axios from 'axios';
import { useState } from 'react';


function App() {

  const [state, setState] = useState([]);
  const history = useHistory({});

  const logoutHandler = () => {
    console.log("this onclick works")
    axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
      .then(res => {
        console.log("this axios call works")
        history.push("/")
      })
      .catch(err => {
        console.log("logout error message: ", err)
      })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const searchTerm = event.target.getElementsByTagName("input")[0].value
    if (searchTerm !== "") {
      axios.get(encodeURI(`http://localhost:8000/api/recipes/searchRecipes/${searchTerm}`))
        .then(res => {
          history.push("/recipes/searchRecipes/:searchTerm");
          console.log(res.data.results);
          setState(res.data.results)
        })
        .catch(err => {
          console.log(err.response.data.err.errors);
        })
    };





  }
  return (

    <div className="App">

      <div className="container">
        <div className="container-xxl bg-white shadow-lg">
          {/* Beginning of Header */}
          <header className="d-flex flex-wrap align-items-center justify-content-md-between py-3 mb-0 border-bottom">
            <Link to="/dashboard" className="d-flex align-items-center justify-content-center  offset-md-0 col-md-2 mb-2 mb-md-0 text-dark text-decoration-none">
              <img src={logo} width="147" height="147" alt="Nutritarian EatsLogo" />
            </Link>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <Link className="nav-link px-2 link-secondary" to="/dashboard">Home</Link>
              <Link className="nav-link px-2 link-dark" to="/recipes/create">Create</Link>
              <Link to="/recipes/about" className="nav-link px-2 link-dark">About</Link>
              < Link to="/users/contact" className="nav-link px-2 link-dark" >Contact</Link>
            </ul>

            <div className="col-3">
              <form action="" onSubmit={onSubmitHandler}>
                <div className="form-group row">
                  <input type="search" name="searchTerm" className="form-control col-sm mx-2" placeholder="Search..." aria-label="Search" />
                  <input type="submit" className="btn btn-success col-sm-3 mx-2" value="Search" />
                </div>
              </form>
            </div>
            <div className="col-md-2 text-center">
              <Link to="/"><button className="btn btn-secondary mx-1">Login</button></Link>
              <button className="btn btn-secondary mx-1" onClick={logoutHandler}>Logout</button>
            </div>
          </header>
        </div>
      </div>
      {/* End of Header */}



      <Switch>
        <Route exact path="/dashboard" >
          <Main />
        </Route >

        <Route exact path="/">
          <SignIn></SignIn>
        </Route>

        <Route exact path="/recipes/searchRecipes/:searchTerm" >
          <SearchRecipe results={state} />
        </Route>


        <Route exact path="/recipes/create" >
          <Create />
        </Route>

        <Route exact path="/recipes/about" >
          <About />
        </Route>

        <Route exact path="/users/contact" >
          <Contact />
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

        <Route exact path="/recipes/explore/random" >
          <RandomRecipe />
        </Route>


      </Switch>
    </div >


  );
}

export default App;
