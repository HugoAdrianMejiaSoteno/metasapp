
import './Modal.css'
import Detalles from "../../Nueva/Detalles";

// La idea del componente modal es que mos permita colocar diferentes componentes del tipo pop-up en pantalla, colocandolos con el fondo gris y sobreencimandolos
//En children va el componente que le estenmos pasando a Modal y se mostrara como popup
const Modal = ({children})=>{

    return (
        <div className="Modal-container">
            <div className="Modal">
                {children}
            </div>
        </div>
    )
}

export default Modal;