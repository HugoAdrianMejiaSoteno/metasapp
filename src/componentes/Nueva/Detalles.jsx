import { useEffect, useState, useContext } from "react";
import "./Detalles.css"
import {TextField, MenuItem, Button} from '@mui/material';
import { Contexto } from "../servicios/Memoria"; //Importamos el contexto
import { useNavigate, useParams } from "react-router-dom";
const Detalles = ()=>{

  //Estado del formulario
  const [form, setForm] = useState(
    {
      "detalles": "",
      "eventos": 1,
      "periodo": "semana",
      "icono": "🏃",
      "meta": 52,
      "plazo": "2030-01-01",
      "completado": 0
    }
  );
  const { detalles, eventos, periodo, icono, meta, plazo, completado } = form;

  //Funcion onChange del formulario de sus inputs
  const onChange = (e, prop) =>{
    //Esta funcion actualiza el estado del formulario, creando una copia del estado inicial del form y actualizando solo al propiedad que cambio, estado en setform hace referencia alo que ya se tenia previo en estado

    //Estado se refiere al form iniical, esta creando una copia del mismo y solo actualizando la propiedad prop con el valor del inpiut
    setForm((estado)=>({...estado, [prop]:e.target.value}));
  }
  const navegar = useNavigate();
  const { id } = useParams();
  //console.log(id);

  const [estado, enviar] = useContext(Contexto); //Traemos las listas de metas del contexto y la funcion que nos va a permitir hacer el crud, esta funcion viene de memoria

  //Este codigo va a correr cuando cambie el id, en este caso el id lo estamos obteniendo de useParams osea de los parametros del link y cuando cambie vamos a obtner la meta que corresponda a ese id, este codigo es pal asunto de actualizar ya que estamos ocupando detalles tanto para lo de actualizar como para crear las metas
  // es para mostrar en el fomrulario los datos que queramos ver de cada meta
  useEffect(
    ()=>{
      const metaMemoria = estado.objetos[id];
      if (!id){
        return; //Esto es para que cuando cambie el parametro de id en caso de que este sea indefinido, es decir cuando estemos en la parte de crear meta ahi aun no hay id entonces nos tira error la pagina, por lo que si estamos ahi no vamos a ocupar este useEffect ya que no vamos a actualizar nada que ya este
      }
      if (!metaMemoria){ //Verificamos si el id de la meta existe de acuero al parametro sino esta pasamos 404, de lo contrario la mostramos
        return navegar('/404');
      }
      setForm(estado.objetos[id]);
    },[id]
  );

  const opcionesFrecuencia = ["dia", "semana","mes","ano"];
  const iconos = ["🏃","✈️","🎸", "💻","⚽"];


  

  const crear = ()=>{
    enviar({ tipo: 'crear', meta: form }); //Llamamos a la funcion enviar  y le mandamos el tipo de operacion y en meta mandamos el estado actual del formulario
    navegar('/lista');
  }

  const cancelar = ()=>{
    navegar('/lista');
  }

  const actualizar = () =>{
    enviar({ tipo: 'actualizar', meta: form });
    navegar('/lista');
  }

  const borrar = ()=>{
    enviar({ tipo: 'borrar', id: id })
    navegar('/lista');
  }

  return (
    <div className="Detalles-container">
      <form action="" className="formulario-container">
        <label htmlFor="" className="detalles-label-container">
          <p className="detalles-texto">Describe tu meta</p>
          <TextField id="outlined-basic" variant="outlined" placeholder="ej. 52 caminatas" type="text" size="small"  className="detalles-input" margin="none" value={detalles} onChange={e=> onChange(e, "detalles")}/>
        </label>
        <label htmlFor="" className="detalles-label-container">
          <p className="detalles-texto"> Con que frecuencia deseas cumplir tu meta?</p>
          <div className="detalles-input-juntos">
            <TextField id="outlined-basic" variant="outlined" placeholder="5" type="number"  size="small"  className="detalles-input espacio" margin="none" value={eventos} onChange={e=> onChange(e, "eventos")}/>
            <TextField id="outlined-select-currency" select defaultValue={opcionesFrecuencia[0]} size="small"  className="detalles-input espacio" margin="none" value={periodo} onChange={e=> onChange(e, "periodo")}>
              {opcionesFrecuencia.map((opcion, i)=><MenuItem value={opcion} key={i}>{opcion}</MenuItem>)}
            </TextField>
          </div>
        </label>
        <label htmlFor="" className="detalles-label-container">
          <p className="detalles-texto">Cuantas veces deseas completar esta meta?</p>
          
          <TextField id="outlined-basic" variant="outlined" placeholder="1" type="number" size="small"  className="detalles-input" margin="none" value={meta} onChange={e=> onChange(e, "meta")}/>
        </label>
        <label htmlFor="" className="detalles-label-container">
        <p className="detalles-texto">Tienes una fecha limite?</p>
          
          <TextField id="outlined-basic" variant="outlined" placeholder="5" type="date" size="small"  className="detalles-input" margin="none" value={plazo} onChange={e=> onChange(e, "plazo")}/>
        </label>
        <label htmlFor="" className="detalles-label-container">
        <p className="detalles-texto">Cuantas veces haz completado esta meta?</p>
          
          <TextField id="outlined-basic" variant="outlined" placeholder="5" type="number" size="small"  className="detalles-input" margin="none" value={completado} onChange={e=> onChange(e, "completado")}/>
        </label>
        <label htmlFor="" className="detalles-label-container">
        <p className="detalles-texto">Escoge el icono para la meta</p>
          
          <TextField id="outlined-select-currency" select defaultValue={iconos[0]} size="small"  className="detalles-input" margin="none" value={icono} onChange={e=> onChange(e, "icono")}>
          {iconos.map((icono, i) => <MenuItem key={i} value={icono}>{icono}</MenuItem>)}
          </TextField>
        </label>
      </form>
      <div className="detalles-botones-container">
        {/*Esto de la condicion es que omo estamos usando el mismo componente pero queremos que en un lao diga editar y llame a su funcion y otro diga crear y llamae a su funcion, pero los vamos a mostra de acuerdo a si existe en esa ruta un id, en caso de que exiata es pq estamos editandola y no creandola */}
        {!id ? <Button variant="contained" size="large" onClick={crear}>Crear</Button> : <Button variant="contained" size="large" onClick={actualizar}>Actualizar</Button>}
        {id && <Button  size="large" onClick={borrar} color="error">Borrar</Button>}
        <Button variant="outlined"  size="large" onClick={cancelar}>Cancelar</Button>
      </div>
    </div>
  );
}

export default Detalles;