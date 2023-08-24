import './Vinculo.css';
import {Link} from 'react-router-dom';
const Vinculo = ({children, texto, href})=>{
    return (
        <Link to={href} className="Vinculo">
            {children}
            <span className='Vinculo-texto'>{texto}</span>
        </Link>
    );
}

export default Vinculo;