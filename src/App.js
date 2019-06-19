import React,{useState} from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';

import Contenido from './Componentes/Contenido';
import Header from './Componentes/Header';

function App() {
  const [state, setState] = useState(0);

  return (
    <div className="continer">

      <div className='column text-center'>
        <Router>
          <Header state ={state}/>
          <Contenido setState ={setState} />
          <Foother />
        </Router>
      </div>
    </div>
  );
}








const Foother = () => <h6>Hecho Por maxi - Copyright</h6>

export default App;
