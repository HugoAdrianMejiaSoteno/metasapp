export const validarDetalles = (valor)=>{
    const length = valor.length;
    if (length>=2){
        return true;
    } else {
        return false;
    }
}