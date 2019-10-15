import React from 'react';


const Tabla = ({ user, Abm ,Modificar,Eliminar,onTableClick}) => {
  const Users = user;
  return (
    <div className=' table-responsive'>
      <table className='table'>
        <thead>
          <tr className='table-primary'>
            {
              Object.keys(Users[0]).map(
                (key, i) => {
                  if (typeof Users[0][key] === 'object') {
                    return null;
                  }
                  return <th key={i}>{key}</th>
                }
              )
              
              }
              <Th Abm={Abm}></Th>
          </tr>
        </thead>
        <tbody className='table-hover'>
          {
            Users.map((user, j) => {
              return <tr onClick={()=>onTableClick ? onTableClick(j): null} key={j} className=' table-secondary'>
                {
                  
                  Object.keys(user).map(
                    (key, i) => {
                      if (typeof user[key] === 'object') {
                        return null;
                      }
                      if(typeof user[key] === 'boolean'){
                        return <td key = {i}>{ user[key] ? 'true' : 'false' }</td>
                      }
                      return <td key={i}>{user[key]}</td>;
                    }
                  )
                }
                <Td Abm={Abm} id = {j} Eliminar ={Eliminar}></Td>
              </tr>

            })
          }
        </tbody>
      </table>
    </div>
  );
}

const Th = ({Abm}) =>{
  if(Abm)
  {
    return (
      <>
    <th>Eliminar</th>
    <th>Modificar</th>
    </>
    );
  }
  return null;
}

const Td = ({Abm, Eliminar,id})=>{
  if(Abm) {
    return (
    <>
    <td><button className='btn btn-danger btn-sm' onClick={()=>Eliminar({key:'Eliminar',payload:id})}>Eliminar</button></td>
    <td><button className = 'btn btn-info btn-sm' onClick={()=> {Eliminar({key:'Modificar',id})}}>Modificar</button></td>
    </>
    )
  }
  return null;
}

export default Tabla;