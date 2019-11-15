import React from 'react';

import './App.css';
import {Router,Link} from 'react-router'
import {Route,Switch} from 'react-router-dom';
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/home'
import Details from './Components/Details'
import Todolist from './Components/Todolist'
import Addnewtodo from './Components/Addnewtodo'
class App extends React.Component {

  render(){
    return(
      <div className="App">
      <header className="App-header">
      <Switch>
       <Route exact path="/" component={Home}/>
       <Route exact path="/login" component={Login}/>
       <Route exact path="/todolist/:id" component={Todolist}/>
       <Route exact path="/Details/:id" component={Details}/>
       <Route exact path="/signup" component={Signup}/>
       <Route exact path="/addnewtodo/:id" component={Addnewtodo}/>

      </Switch>
      </header>
      </div>
    )
  }
}

export default App;
