import logo from './logo.svg';
import './App.css';
import { Switch, Route, } from 'react-router-dom'
import Main from './views/Main';
import Create from './views/Create';
import Edit from './views/Edit';
import SingleRecipe from './views/SingleRecipe';
import ExploreCuisine from './views/ExploreCuisine';
import SingleCuisine from './views/SingleCuisine';
import Search from './views/Search';


function App() {
  return (

    <div className="App">
      <div className="container">
        <div className="container-xxl px-md-5 bg-white shadow-lg">
          {/* Beginning of Header */}
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-0 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
              <img src="/img/logo.svg" width="147" height="147" alt="Nutritarian EatsLogo" Loading="lazy" />
            </a>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
              <li><a href="/recipes/create" className="nav-link px-2 link-dark">Create</a></li>
              <li><a href="/recipes/:_id/edit" className="nav-link px-2 link-dark">Update</a></li>
              <li><a href="/recipes/about" className="nav-link px-2 link-dark">About</a></li>
            </ul>
            <div className="col-md-3 text-end">
              <form action="/search">
                <input type="search" name="searchTerm" className="form-control" placeholder="Search" aria-label="Search" />
              </form>
            </div>
          </header>
        </div>
      </div>
      {/* End of Header */}
      <Switch>
        <Route exact path="/" >
          <Main />
        </Route >

        <Route exact path="/recipes/create" >
          <Create />
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

        <Route exact path="/recipes/cuisine/:_id" >
          <SingleCuisine />
        </Route>

        <Route exact path="/recipes/search" >
          <Search />
        </Route>

      </Switch>
    </div>


  );
}

export default App;
