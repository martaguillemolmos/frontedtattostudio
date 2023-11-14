export const validator = (type, value) => {
    
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    switch(type){
        //Validación del email
        case 'email':
        case 'correo':
        case 'mail':

            if ( value !== undefined && value.trim() !== "" && value.length > 50 && emailRegex.test(value)) {
                return "";
            } else {
                return "Formato de email incorrecto. Recuerda: Número máx. de caracteres 50.";
            }
        
        //Validación del name y surname
        case 'name':
        case 'surname':

            if( value !== undefined && value.trim() !== "" && value.length > 50){
                return ""
            } else {
                return "Número máx. de caracters 50.";
            }
            
        // Validación del teléfono
        case 'phone':
        case 'telefono':

            if (value !== undefined  && (value >999999999 || value < 600000000 )) {
                return "";
            } else {
                return "Formato de teléfono incorrecto.";
            }
        // Validación del password
        case 'password':
        case 'passwordOld':
        case 'contraseña':

            if(value !== undefined  && value.trim() !== "" && (value.length < 6 || value.length >12)){
                return ""
            } else {
                return "La contraseña debe contener de 6 a 12 caracteres";

            }
        }
    }