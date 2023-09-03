
//La funcion de pedir metas al backend va a ser uns funcion asyncrons 

//Vamos a hacer las peticiones a /api/metas, podriamos hacerlo directamente a localhost pero en aplicaciones reales el backend y el front va a estar situado en el mismo puerto, pero ahorita para simular eso vamos a utilizar un proxy, lo colocamos en el packgae .json el proximo es como un vinculo que redirecciona una direccion a otra direccion "proxy": "http://localhost:3000"
export async function pedirMetas() {
    const response = await fetch('https://metasapp-backend.onrender.com/api/metas'); //fetch lleva el await pq fetch es una funcion asyncrona
    const metas = await response.json(); //await tmb va porque .json es un webapi de fetch que convierte la respuesta en json y lo hace de forma asincrona
    return metas;
} 

//Esta funcion no la estamos usando en este momento pero puede funcionar en un futuro
export async function pedirMeta(id) {
    const response = await fetch(`https://metasapp-backend.onrender.com/api/metas/${id}`); 
    const meta = await response.json();
    return meta;
} 

export async function crearMeta(meta) {
    const response = await fetch('https://metasapp-backend.onrender.com/api/metas', {
        method: 'POST', //mandamos mas informacion acerca de la solicitud q vamos a hacer
        body: JSON.stringify(meta), //La meta llega en fomra de objeto de js por eso hay que pasarla a texto json para mandarla al backend,
        headers: {
            'content-type': 'application/json; charset=UTF-8'
        }
    }); 
    const metaCreada = await response.json(); 
    console.log('meta creada', metaCreada);
    return metaCreada;
} 

export async function actualizarMeta(meta) {
    const response = await fetch(`https://metasapp-backend.onrender.com/api/metas/${meta.id}`, {
        method: 'PUT', //mandamos mas informacion acerca de la solicitud q vamos a hacer
        body: JSON.stringify(meta), //La meta llega en fomra de objeto de js por eso hay que pasarla a texto json para mandarla al backend,
        headers: {
            'content-type': 'application/json; charset=UTF-8'
        }
    }); //Estos archivos son creados en la carpeta public para simular el pedido
    const metaActualizada = await response.json(); 
    console.log('meta Actualizada', metaActualizada);
    return metaActualizada;
} 

export async function borrarMeta(id) {
    await fetch(`https://metasapp-backend.onrender.com/api/metas/${id}`, {
        method: 'DELETE'
    });
    console.log('meta borrada', id)
} 