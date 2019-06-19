import React from 'react';


const Tabla = (props) => {
    const Users = props.user;
  
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
                  return <th key = {i}>{key}</th>
                }
  
              )
            }
          </tr>
        </thead>
        <tbody className ='table-hover'>
          {
            Users.map((user,j) => {
              return <tr key ={j} className=' table-secondary'>
                {
                  Object.keys(user).map(
                    (key, i) => {
                      if (typeof user[key] === 'object') {
                        return null;
                      }
                      return <td key = {i}>{user[key]}</td>;
                    }
                  )
                }
              </tr>
  
            })
          }
        </tbody>
      </table>
      </div>
    );
  }

  export default Tabla;