import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './componentes/Layout';
import Lista from './componentes/Lista/Lista';
import Detalles from './componentes/Nueva/Detalles'
import Error404 from './componentes/compartidos/Error404/Error404';
import Modal from './componentes/compartidos/Modal/Modal'
import { useContext, useEffect } from 'react';
import { pedirMetas } from './componentes/servicios/Pedidos';
import { Contexto } from './componentes/servicios/Memoria';

function App() {

  const [estado, enviar] = useContext(Contexto); //Traemos las listas de metas del contexto

  //este codigo se ejecuta una vez se carge la pagina, hacemos el pedido de las metas y usamos.then para cuando la promesa se cumpla llamamos a enviar
  useEffect(()=>{
      const metas = pedirMetas().then(metas => {
          enviar({ tipo:'colocar', metas })
      });
  },[]);


  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Lista/>}/> {/*Esta propiedad index es para decir a donde ir en caso de que no se pase ninguna ruta*/}
        <Route path="/lista" element={<Lista/>}>
          <Route path="/lista/:id" element={
            <Modal>
              <Detalles/>
            </Modal>
          }/> {/* El id es el que cambia como parametro, este se puede ver en metas */}
        </Route>
        <Route path="/nueva" element={<Detalles/>}/>
        
      </Route>
      <Route path="*" element={<Error404/>}/>
    </Routes>
  );
}

export default App;
