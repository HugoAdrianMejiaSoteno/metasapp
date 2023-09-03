import './Meta.css'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Meta = ({ id, icono, eventos, periodo, detalles, completado, meta })=>{
    let valor = (completado/meta)*100;

    const [color, setColor] = useState(false);
    const completarMeta = ()=>{
        setColor(!color);
    }

    return (
        <div className={color ? "meta completada" : "meta"}>
            <Link to={`/lista/${id}`} className='meta-1'>
                <div className='meta-seccion1'>
                    <div className='meta-icono'>{icono}</div>
                    <p className='seccion1-tiempo'>{eventos} <sub className='sub'>/ {periodo}</sub></p>
                    <p className='seccion1-detalles'>{detalles}</p>
                </div>
                <div className='meta-seccion2'>
                    <div className='meta-completado'>
                        <p className='completado-texto'>{ color ? meta : completado} de {meta}</p>
                        <div className='linea-progreso'>
                            <LinearProgress variant="determinate" value={color ? 100 : valor} />
                        </div>
                    </div>
                </div>
            </Link>
            <div className='meta-btn'>
                {color ? <Button variant="contained" size='small' className='seccion2-btn' color='error'onClick={completarMeta}>No completado</Button> : <Button variant="contained" size='small' className='seccion2-btn'  onClick={completarMeta}>Completado</Button>}
            </div>
        </div>
    );
}

export default Meta;