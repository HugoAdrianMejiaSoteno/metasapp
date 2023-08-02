import "./Principal.css";
//Esto es todo el contenido principal, el proyecto inicialmente lo dividimos en tres partes, l;a parte de arriba que es el encabezao, la parte principal que contendra la navegacion izquierda y el contenido y por ultimo el footer

//Como el contenido prinicpl incluye la navegacion izquierda y el contenido y lo que va a cambiar de forma dinamica a lo que querramos mostrar va a ser contenido por eso lo pasamos como children para que de acuerdo a diferentes acciones este pueda in renderizando diferentes componentes en la pagina

function Principal({children}) {
    return (
      <div className="principal">
        <aside>
          <a href="/lista">Lista</a>
          <a href="/Crear">Crear</a>
        </aside>
        <main>
          {children}
        </main>
      </div>
    );
  }
  
  export default Principal;