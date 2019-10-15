import React from 'react';
import About from './About';
import Home from './Home';
import Productos from './Productos';
import Cuentas from './Cuentas';
import { Switch, Route } from 'react-router-dom';



function Contenido({setState}) {
  
  return (
    
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/About' render={() => <About setState={setState} />} />
      <Route path='/Productos' component={Productos} />
      <Route path= '/Cuentas' component= {Cuentas} />
      <Route component={Error} />

    </Switch>
    
  )
}
const Error = () => <h1>ERROR 404</h1>

export default Contenido;