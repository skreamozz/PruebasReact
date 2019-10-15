import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Store from './Store/Store';
import Context from './Store/Context';

import './App.css';

import Contenido from './Componentes/Contenido';
import Header from './Componentes/Header';

function App() {
  const [state, setState] = useState(0);
  const[estado,despachador] = Store();
  return (
    <Context.Provider value = {[estado,despachador]}>
      <div className="continer">

        <div className='column text-center'>
          <Router>
            <Header state={state} />
            <Contenido setState={setState} />
            <Foother />
          </Router>
        </div>
      </div>
    </Context.Provider>
  );
}








const Foother = () => <h6>Hecho Por maxi - Copyright</h6>

export default App;
