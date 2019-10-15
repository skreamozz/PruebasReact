import React, { useState, useEffect } from 'react';
import Tabla from './Tabla';
import Loading from './Loading';



const About = ({ setState }) => {
  const [Users, setUsers] = useState(null);
  useEffect(() => {
    
     const fectchData = async () => {
      try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await resp.json();
        await setState(data.length);
        await setUsers(data);
      } catch (e) {
        console.log(e);
      }
    }

    fectchData();

  }, [setState]);

  if (typeof Users === 'undefined' || Users == null || Object.entries(Users).length === 0) {
    return <Loading />
  }
  return (
    <Tabla user={Users}></Tabla>
  );



}


export default About;