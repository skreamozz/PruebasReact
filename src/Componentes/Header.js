import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';

const Header = (props) => {
    const state = props.state;
    return (
      <header className="navbar navbar-expand-lg navbar-dark bg-primary col-sm-12">
        <img src={logo} className="App-logo" alt="logo" />
        <Link className='nav-link' to='/'>Inicio <span className="badge badge-info badge-pill">{state}</span></Link>
        <Link className='nav-link' to='/About'>Contacto</Link>
        <Link className= 'nav-link' to= '/Productos'>Productos</Link>
      </header>
    );
  }



export default Header;