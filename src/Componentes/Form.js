import React from 'react';

const handleSubmit = (submit,e)=> {
    submit(e);
    e.target.codigo.focus();
}

const handleChange =(dispatch,e) => dispatch({ key: 'input', Value: e.currentTarget.value, field: e.currentTarget.name });


const Form = ({ submit, state, dispatch }) => {
    return (
        <form className=' col-sm-3' onSubmit={handleSubmit.bind(this,submit)}>
            <div className='form-group row'>
                <input
                    name='codigo'
                    value={state.codigo}
                    onChange={ handleChange.bind(this,dispatch) }
                    className='form-control' type='text' placeholder='Codigo' />

            </div>
            <div className='form-group row'>
                <input
                    type='text'
                    value={state.descripcion}
                    name='descripcion'
                    placeholder='Descripcion'
                    onChange={handleChange.bind(this,dispatch)}
                    className='form-control' />

            </div>
            <input type='submit' className='btn btn-info btn-block' value='Enviar' />
        </form>
    );
}

export default Form;