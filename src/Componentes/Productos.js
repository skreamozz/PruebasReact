import React, { useReducer } from 'react';
import Form from './Form';
import Tabla from './Tabla';

const ProductosReducer = (state, action) => {
    switch (action.key) {
        case 'input': {
            
            return {
                ...state,
                [action.field]: action.Value,
            }
        }
        case 'Modificar':
            if(!state.codigo & !state.descripcion){
                return state;
            }else if(!state.codigo){
                let cambio = state.Items;
                cambio[action.id] = { codigo: state.Items[action.id].codigo,descripcion:state.descripcion};
                return {codigo:'',descripcion:'', Items:[...cambio]};
            }else if(!state.descripcion){
                let cambio = state.Items;
                cambio[action.id] = { codigo: state.codigo,descripcion:state.Items[action.id].descripcion};
                return {codigo:'',descripcion:'', Items:[...cambio]};
            }

            let cambio = state.Items;
            cambio[action.id] = { codigo: state.codigo,descripcion:state.descripcion};
            return {...state, Items:[...cambio]};

        case 'Add': {
            if(!state.codigo || !state.descripcion){
                return state;
            }
            if (!state.Items[0].codigo | !state.Items[0].descripcion) {
                return { codigo:'',descripcion:'', Items:[{ codigo: state.codigo, descripcion: state.descripcion }]};
            } else {
                return { Items: [...state.Items, { codigo: state.codigo, descripcion: state.descripcion }], codigo: '', descripcion: '' };
            }
        }
        case 'Eliminar':
            {
                let cambio = state.Items;
                cambio.splice(action.payload, 1);

                if (cambio.length === 0) {
                    return {
                        ...state,
                        Items: [{ codigo: '', descripcion: '' }]
                    }
                } else {
                    return { ...state, Items: [...cambio] }
                }
            }
        default:
            {
                return state;
            }
    }

}



const Productos = () => {
    const [state, dispatch] = useReducer(ProductosReducer, { Items: [{ codigo: '', descripcion: '' }], codigo: '', descripcion: '' });
    const submit =(e) => {
        e.preventDefault();
        dispatch({ key: 'Add' });
    }

    return (
        <>
            <div className='jumbotron d-flex justify-content-center'>
                <Form submit={submit} state={state} dispatch={dispatch} />
            </div>
            <div>{ state.Items[0].codigo ? <Tabla user={state.Items} Abm={true} Eliminar={dispatch} />: null}</div>
            
        </>


    );
}


export default Productos;