import React from 'react';
import About from './About';
import Home from './Home';
import Productos from './Productos';
import { Switch, Route } from 'react-router-dom';


function Contenido(props) {
  const setState = props.setState;
  return (
    
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/About' render={() => <About setState={setState} />} />
      <Route path='/Productos' component={Productos} />
      <Route component={Error} />

    </Switch>
    
  )
}
const Error = () => <h1>ERROR 404</h1>

export default Contenido;