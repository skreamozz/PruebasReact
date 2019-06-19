import React, {useState} from 'react';



const submit = (e,setSt)=>{
    e.preventDefault();
    const {input} = e.target;
    setSt(input.value);

}

const Productos = () => {
    const [st,setSt] = useState('');

    
    return (
        <div>
            <div className='jumbotron'>
                <p>{st}</p>
                <form className='d-flex justify-content-center col-lg-12' onSubmit={(e) =>{ submit(e,setSt)} }>
                <div className= 'form-group'>
                    <input name ='input' className='form-control' type ='text' placeholder='Codigo' />
                </div>
                <div className='form-group'>
                    <input type='submit' className='btn btn-info btn-block' value='Enviar'/>
                </div>
            </form>
            </div>
        </div>

    );
}


export default Productos;