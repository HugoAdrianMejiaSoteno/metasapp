import { Outlet, Route, Routes } from 'react-router-dom'; 
// import Lista from './Lista/Lista';
// import Detalles from './Nueva/Detalles';
import Principal from './compartidos/Principal/Principal';
import Encabezamiento from './compartidos/Encabezamiento/Encabezamiento';
import Pie from './compartidos/Pie/Pie';
const Layout = ()=>{

  //Outlet es un componente para montar componentes, es decir podemos pasar algun componente dentro de layout y este se va a montar dentro de outled, es como los componentes que van a ir cambiando dentro de otro componente, podemos montarlos cuando queramos
  return(
    <>
        <Encabezamiento/>
        <Principal>
          <Outlet> 
            {/*Aqui dentro rendrizamos enlas rutas a  <Lista/> o
            <Detalles/> o el modal*/} 
          </Outlet>
        </Principal>
        <Pie/>
      </>
  )
}

export default Layout;