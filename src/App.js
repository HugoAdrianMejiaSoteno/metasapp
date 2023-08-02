import './App.css';
import Encabezamiento from './componentes/compartidos/Encabezamiento/Encabezamiento';
import Pie from './componentes/compartidos/Pie/Pie';
import Principal from './componentes/compartidos/Principal/Principal';

function App() {
  return (
    <div className="App">
      <Encabezamiento/>
      <Principal/>
      <Pie/>
    </div>
  );
}

export default App;
