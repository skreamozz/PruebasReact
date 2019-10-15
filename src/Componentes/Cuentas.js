import React, { useEffect, useContext, useState } from 'react';
import Context from '../Store/Context';
import Tabla from './Tabla';





const Cuentas = (props) => {
    const [state, dispatch] = useContext(Context);
    const PedirData = async () => {
        try {
            const resp = await fetch('http://localhost:5000/api/values');
            const data = await resp.json();
            return data;
        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        PedirData().then((data) => {
            dispatch({ type: 'refresh', value: data });
            dispatch({ type: 'changeRefresh', value: true });
        });
    }, [state.refresh, dispatch]);
    const onTableClick = (e) => {
        dispatch({ type: 'setIdSeleccionado', value: e });
        window.scrollTo(0,0);
    }
    return (<>
        <Formulario TableId={state.idSeleccionado} />
        <Tabla user={state.data} onTableClick={onTableClick}></Tabla>

    </>);
}


const Formulario = ({ TableId }) => {
    const [state, dispatch] = useContext(Context);
    const [formState, setFormState] = useState({
        cuenta: '',
        descripcion: '',
        inactivo: false,
        imputable: false,
        nivel: 0,
        TableId,
    });
    const id_tabla = () => {
        setFormState({
            ...formState,
            cuenta: state.data[TableId].Cuenta,
            descripcion: state.data[TableId].Descripcion,
            inactivo: state.data[TableId].Inactivo,
            imputable: state.data[TableId].Imputable,
            nivel: state.data[TableId].Nivel
        });


    }
    useEffect(() => {
        if (TableId != null) {
            id_tabla();
        }
    }, [TableId])
    const checkChange = e => setFormState({ ...formState, [e.currentTarget.name]: e.currentTarget.checked });
    const formInputChange = e => setFormState({ ...formState, [e.currentTarget.name]: e.currentTarget.value });
    const formSubmit = e => {
        e.preventDefault();
        if (state.idSeleccionado === null) {
            const enviar = async () => {
                try {
                    const resp = await fetch('http://localhost:5000/api/values', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=utf-8 '
                        },

                        body: JSON.stringify({
                            Cuenta: formState.cuenta,
                            Descripcion: formState.descripcion,
                            Inactivo: formState.inactivo,
                            Imputable: formState.imputable,
                            Nivel: formState.nivel
                        })
                    });
                    return resp;
                } catch (err) {
                    console.log(err);
                }
            }

            enviar().then(() => {
                setFormState({ cuenta: '', descripcion: '', inactivo: false, imputable: false, nivel: 0 });
                dispatch({ type: 'changeRefresh', value: !state.refresh });

            });
        } else {
            const Modificar = async () => {
                try {
                    const resp = await fetch('http://localhost:5000/api/values/' + formState.cuenta, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=utf-8 '
                        },
                        body: JSON.stringify({
                            Cuenta: formState.cuenta,
                            Descripcion: formState.descripcion,
                            Inactivo: formState.inactivo,
                            Imputable: formState.imputable,
                            Nivel: formState.nivel
                        })

                    });
                    return resp;
                } catch (err) {
                    console.log(err);
                }
            }
            Modificar().then(resp => {
                console.log(resp);
                dispatch({ type: 'setIdSeleccionado', value: null });
                dispatch({ type: 'changeRefresh', value: !state.refresh });
                setFormState({ ...formState, cuenta: '', descripcion: '', inactivo: false, imputable: false, nivel: 0 });
            });

        }
    }

    const EliminarClick = (e) => {
        e.preventDefault();
        const Eliminar = async () => {
            try {
                const resp = await fetch('http://localhost:5000/api/values/' + formState.cuenta,{
                    method:'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8 '
                    }
                });
                return resp;
            }catch(err){
                console.log(err);
            }
        }

        Eliminar().then((resp) =>{

            dispatch({ type: 'setIdSeleccionado', value: null });
            dispatch({ type: 'changeRefresh', value: !state.refresh });
            setFormState({ ...formState, cuenta: '', descripcion: '', inactivo: false, imputable: false, nivel: 0 });
        
        });

    }
    const CerrarClick = (e) => {
        e.preventDefault();
        dispatch({ type: 'setIdSeleccionado', value: null });
        setFormState({ ...formState, cuenta: '', descripcion: '', inactivo: false, imputable: false, nivel: 0 });
    }

    return (
        <div className='row d-flex justify-content-center'>
            <form className='col-sm-3 mt-2' onSubmit={formSubmit}>
                <div className='form-group'>
                    <input onChange={formInputChange} name='cuenta' placeholder='Cuenta...' className='form-control' type='number' value={formState.cuenta} />
                </div>
                <div className='form-group'>
                    <input onChange={formInputChange} name='descripcion' placeholder='Descripcion...' className='form-control' type='text' value={formState.descripcion} />
                </div>
                <div className='form-group'>
                    <div className='custom-control custom-switch custom-control-inline'>
                        <input onChange={checkChange} id='inactivo' name='inactivo' className='custom-control-input' type='checkbox' checked={formState.inactivo} />
                        <label htmlFor='inactivo' className='custom-control-label'>inactivo</label>
                    </div>
                    <div className='custom-control custom-switch custom-control-inline'>
                        <input onChange={checkChange} id='imputable' name='imputable' className='custom-control-input' type='checkbox' checked={formState.imputable} />
                        <label htmlFor='imputable' className='custom-control-label'>imputable</label>
                    </div>
                </div>
                <div className='form-group'>
                    <input name='nivel' onChange={formInputChange} placeholder='Nivel...' className='form-control' type='number' value={formState.nivel} />
                </div>
                <div className='form-group col'>
                    <Botones TableId={TableId} EliminarClick={EliminarClick} CerrarClick ={CerrarClick} />
                </div>
            </form>
        </div>


    );
}

const Botones = ({ TableId, EliminarClick , CerrarClick }) => {

    if (TableId != null) {
        return (<>
            <input className='btn btn-primary' type='submit' value='Modificar' />

            <input onClick={EliminarClick} className='ml-2 mr-2 btn btn-danger ' type='submit' value='eliminar' />
            <input onClick={CerrarClick} className='btn btn-primary' type='submit' value='X' />
        </>);

    } else {
        return <input className='btn btn-primary btn-block' type='submit' value='enviar' />;
    }
}


export default Cuentas;