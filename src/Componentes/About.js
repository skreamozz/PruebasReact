import React, {useState,useEffect} from 'react';
import Tabla from './Tabla';
import Loading from './Loading';



const About = (props) =>{
    const [Users, setUsers] = useState(null);
    const setState = props.setState;
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch('https://jsonplaceholder.typicode.com/users', { signal })
      .then((resp) => { return resp.json(); }).then((data) =>{setState(data.length); setUsers(data)});

    return () => abortController.abort();
  });

  if (typeof Users === 'undefined' || Users == null || Object.entries(Users).length === 0) {
    return <Loading />
  }
  return (
    <Tabla user={Users}></Tabla>
  );



}


export default About;