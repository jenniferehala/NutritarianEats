import logo from '../src/img/logo.svg'
import './App.css';
import { Switch, Route, Link, } from 'react-router-dom'
import Main from './views/Main';
import Create from './views/Create';
import Edit from './views/Edit';
import SingleRecipe from './views/SingleRecipe';
import ExploreCuisine from './views/ExploreCuisine';
import SingleCuisine from './views/SingleCuisine';
import SearchRecipe from './views/SearchRecipe';
import LatestRecipes from './views/LatestRecipes';
import About from './views/About';

function App() {

  const onSubmitHandler = ({})
  const handleSearch = ({})

  return (

    <div className="App">

      <div className="container">
        <div className="container-xxl px-md-5 bg-white shadow-lg">
          {/* Beginning of Header */}
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-0 border-bottom">
            <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
              <img src={logo} width="147" height="147" alt="Nutritarian EatsLogo" />
            </Link>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <Link className="nav-link px-2 link-secondary" to="/">Home</Link>
              <Link className="nav-link px-2 link-dark" to="/recipes/create">Create</Link>
              <Link to="/recipes/searchRecipes" className="nav-link px-2 link-dark">Search</Link>
              <Link to="/recipes/contact" className="nav-link px-2 link-dark" >Contact</Link>
            </ul>
            <div className="col-md-3 text-end">
              <form onSubmit={onSubmitHandler} >
                <input
                  type="text"
                  onChange={handleSearch}
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search" />
              </form>
            </div>
          </header>
        </div>
      </div>z
      {/* End of Header */}
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
    </div>


  );
}

export default App;
