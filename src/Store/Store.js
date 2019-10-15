import {useReducer} from 'react';

const Reducer = (state , action) =>{
    switch(action.type){
        case 'changeRefresh':
            return {
                ...state,
                refresh:action.value
            }
        case 'refresh':
            return {
                ...state,
                data: action.value,
            };
        case 'refreshConCargaDesdeAca':
            let datos = [{}];
            const refresh = async ()=>{
                try{
                    const resp = await fetch('http://localhost:5000/api/values');
                    const data = await resp.json();
                    return data;
                }catch{
    
                }
            }

            refresh().then((resp) => {
                datos = resp;
            })
            return {...state,data:datos};
            case 'setIdSeleccionado':
                return {...state,idSeleccionado:action.value};
        default:
            return state;
    }
}

let InicialState = {
    data: [{}],
    idSeleccionado:null,
    refresh:false,
}


const Store = () =>{
   return useReducer(Reducer,InicialState);
}


export default Store;