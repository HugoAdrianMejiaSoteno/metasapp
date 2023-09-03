import { useContext, useEffect } from "react";
import Meta from "./Meta";
import { Contexto } from "../servicios/Memoria";
import { Outlet } from "react-router-dom";
import { pedirMetas } from "../servicios/Pedidos";



const Lista = () =>{
    //Esto lo traemos del contexto, traemos el estado con las metas o bien el orden y objetos y la funcion enviar
    const [estado, enviar] = useContext(Contexto); //Traemos las listas de metas del contexto


    return (
        //pasamos id pq estado.orden viene con las id
        <>
            {estado.orden.map((id)=><Meta {...estado.objetos[id]} key={id}/>)} {/*Aqui recorremos la lista creando un componente por cada registro de la lista, ademas pasamos todos las propiedades del objeto de cada lista como props utilizando el ooperador spread {...x}*/}
            <Outlet/> {/*Este outlet es para que podamos mostrar el pop-out de editar meta sobre encimado jaja*/}
        </>

    );
}

export default Lista;