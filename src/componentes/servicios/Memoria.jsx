import { createContext, useReducer } from "react";

//Creamos el contexto que va a tener el valor incial de nulo
export const Contexto = createContext(null);

//Lista de datos simulando una base de datos
// const listaMock = [
//     {
//         "id": "1",
//         "detalles": "Correr por 30 minutos",
//         "periodo": "dia",
//         "eventos": 1,
//         "icono": "🏃",
//         "meta": 365,
//         "plazo": "2030-01-01",
//         "completado": 5
//     },
//     {
//         "id": "2",
//         "detalles": "Viajar por el mundo",
//         "periodo": "mes",
//         "eventos": 2,
//         "icono": "✈️",
//         "meta": 5,
//         "plazo": "2030-08-11",
//         "completado": 3
//     },
//     {
//         "id": "3",
//         "detalles": "Escuchar The Weeknd",
//         "periodo": "dia",
//         "eventos": 5,
//         "icono": "🎸",
//         "meta": 12,
//         "plazo": "2030-05-17",
//         "completado": 10
//     },
// ];

//Normalizacion de memoria, la normalizacion de meoria nos ayuda a que no tengamos que estar creando funciones si queremos modificar la lista, y nos ayuda a ahorrar memoria mas eficientemente, aqui lo hacemos como en el ejemplo de abajo, pasamos en un lado las ientificaciones y en otro lado los demas lados del onnjeto que se va a modificar, esto es un conceptoo avanzado y no es unico de react, es algo que se puede implementar en los demas framewokrs 


//Comentamos esto para implementar lo de local storage
// const estadoInicial = {
//     orden: [],
//     objetos: {}
// }

//Creamos el estado memoria que va a ser el estado que se va a guardar en localstorage, este va a acceder a la info mediante la clave metas
const memoria = localStorage.getItem('metas');

//el estado inicial de la pagina sera la memoria en caso de haberla y sino sera el objeto vacio
//Con esto en caso de que la pagina se cargue por primera vez y no haya datos en memoria va a mostrar el estadoInicial vacio, en caso de hacer alguna accion del crud el setItekm nos va a permitir actualizar el estado y vamos a poder mostrar la memoria que sera ahora el nuevo estado

//el estado sera el contenido guardado en memoria de localStorage, en caso de no haber se muestra el estado vacio
//transformamos a memoria en entero pq en localstorage lo estamos guardando en texto, osea lo mandamos en texto nosotoros y se guarda asi y ya para ocupar y mostrarlo lo volvemos a traer pero en numero pq se opera en numero
const estadoInicial = memoria ? JSON.parse(memoria) : { 
    orden: [],
    objetos: {}
 }

//En la funcion reductor es donde vamos a decir que operacion del crud hacer, esta actualiza el estadoInicial modificando el objeto, tiene dos parametros, el estado y la accion que vamos a realizar
const reductor = (estado, accion)=>{ //En el reductor el primer argumento es el estado general
    // eslint-disable-next-line default-case
    switch(accion.tipo){
        case 'colocar' : {
            const metas = accion.metas; //Sacamos la lista de metas
            const nuevoEstado = { //creamos un nuevo estado con su propiedad orden y objetos
                orden: metas.map(meta => meta.id), //en orden vamos a mapear las metas creando un nuevo arreglo con solo las id de todas las metas
                objetos: metas.reduce((objeto, meta)=>({...objeto, [meta.id]: meta}), {}) //aqui en objetos vamos a tener el objeto con las propiedades de cada meta, pero con la nueva propiedad de id asignada a cada uno de los objetos que vienen de metas, este metodo es mas que nada para agregar una propiedad a cada objeto del arrray de metas, pasamos como primer parametro el objeto o bien lo que sera el objeto inicial vacio y a ese se le van a meter las metas ya que es metas.reduce y el seguno argumento es lo que le vamos a asignar de nuevo, lo podemosber en meta.id: meta, en este caso lo nuevo que le metimos o combinamos fue el arreglo de las identificaciones, podemos ver esto mas claramente imprimienolo en la consola
            };
            //Llamamos a set item de local storage, ese coloca el estado en localstorage, recibe dos argumentos, la clave en este caso 'metas'  donde va a guardar la info y el estado pero localstorage solo  maneja texto por lo cual tenemos que transformar esa informacion a texto ya que hay partes numericas del estado
            localStorage.setItem('metas', JSON.stringify(nuevoEstado));
            return nuevoEstado;
        };
        case 'crear' : {
            const id = Math.random(); //Simulamos un id al azar que es el id automatico que crearia la abse de datos
            //console.log(id);
            const nuevoEstado = {
                orden: [...estado.orden, id], //Tomamo el estado anterior del arreglo de las indentificaciones y anadimos la nueva id
                objetos: { ...estado.objetos, [id]: {...accion.meta, id} } //Aqui actualizamos el estado de los objetos anteriores anadiendo el nuevo objeto el cual se anade con su nueva id y su meta que viene de accion.meta
            };
            //console.log(nuevoEstado);
            localStorage.setItem('metas', JSON.stringify(nuevoEstado)); //Lo colocamos en cada caso para que tmb se actualice el local storage
            return nuevoEstado;
        };

        case 'actualizar' : {
            const id = accion.meta.id;
            estado.objetos[id] = {
                ...estado.objetos[id],
                ...accion.meta
            }
            /*Esto se hace para actualizar la meta arreglo tomando la infomraicon actual con la nueva informacion y juntarlas pero al juntarse solo cambia lo que este diferente, lo hacemos para que el codigo sea mas reusable en caso futuro de q queramos como cambiar solo algo de la meta y ya no tener que mandarla completa, se lo contrario simplemente podriamos actualizar la meta completa de esta forma 
            estado.objetos[id] = accion.meta
            */
           //Esto solo es para decirle a react que el estado ha cambiado y actualice los componentes que lo estan ocupando en caso de que haya mas dependiendo de este estado
            const nuevoEstado = {...estado};
            localStorage.setItem('metas', JSON.stringify(nuevoEstado));
            return nuevoEstado;
        };

        case 'borrar' : {
            const id = accion.id;
            const nuevoOrden = estado.orden.filter( item => item != id); //Esto va a crear un nuevo arreglo de orden donde no este el elemento que se va a eliminar y sino esta en orden tmb se actualiza el de objetos, solo coloque un = pq el id es de tipo tetxo y el orden es de tipo numero jaaj // La solución real debería ser asegurarnos que id tenga el mismo tipo en toda la app para que sea consistente pero esta es una tarea más larga. Esto se soluciona al usar Typescript
            delete estado.objetos[id]; //borramos el objeto con su id
            const nuevoEstado = {
                orden: nuevoOrden, objetos: estado.objetos
            };
            localStorage.setItem('metas', JSON.stringify(nuevoEstado));
            return nuevoEstado
        };
        //En caso de que no se pase la accion indicada vamos a tirar el errror
        default: 
            throw new Error();
    }
}
//Podemos ver lo que hace el reductor de forma clara imprimineodlo en la consola
//console.log(reductor(estadoInicial, { tipo: 'colocar', metas: listaMock }));

//Esto es para colocar el estado en la pagina osea el contenido, o bien pra crear por primera vez el arreglo de orden y objetos
//const metas = reductor(estadoInicial, { tipo: 'colocar', metas: listaMock });

//reductor(estadoInicial, { tipo: 'colocar', metas: listaMock });

//Este componente nos va a permitir envolver a toda la aplicaciones y que la aplicacion puede tener acceso al contexto global que queramos pasar
const Memoria = ({children})=>{
    /*La mejor forma de modificar una lista es utilizando el gancho useReducer en vez de actualizar la lista con mas funciones de cada componente, ya que si modificamos la lista con um gancho este actualiza el componente y es mejor ya que nunca va a haber perdida de memoria y todo se va a renderizar de mejor manera */

    //useReducer lleva dos parametros dentro, el reductor o funcion reductor y el estado inicial, tmb lleva una funcion estado y enviar que son las que se compartiran conn los demas componentes [estado, enviar]
    
    //Ponemos a estado inical en el useReducer y yno a metas pq en los casos reales vamos a obtener las metas de una sola base de datos, en este vso de local storage
    const [estado, enviar] = useReducer(reductor, estadoInicial);
    //estado, funcion        useReducer(funcion, funcion con los datos echos inicialmente)
    //Usamos el nombre del contexto que creamos con createContext
    return (
        <Contexto.Provider value={[estado, enviar]}> {/* Pasamos la lista de metas al contexto global de la aplicaicon*/}
            {children}
        </Contexto.Provider>
    );
}

export default Memoria;