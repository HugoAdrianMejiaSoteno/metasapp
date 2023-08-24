import './Meta.css'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

const Meta = ({ id, icono, eventos, periodo, detalles, completado, meta })=>{
    const valor = (completado/meta)*100;
    return (
        <Link to={`/lista/${id}`} className='meta'>
            <div className='meta-seccion1'>
                <div className='meta-icono'>{icono}</div>
                <p className='seccion1-tiempo'>{eventos} <sub className='sub'>/ {periodo}</sub></p>
                <p className='seccion1-detalles'>{detalles}</p>
            </div>
            <div className='meta-seccion2'>
                <div className='meta-completado'>
                    <p className='completado-texto'>{completado} de {meta}</p>
                    <div className='linea-progreso'>
                        <LinearProgress variant="determinate" value={valor} />
                    </div>
                </div>
                <Button variant="contained" size='medium' className='seccion2-btn'>Completado</Button>
            </div>
        </Link>
    );
}

export default Meta;