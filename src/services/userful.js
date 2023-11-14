export const validator = (type, value) => {
    
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    switch(type){
        //Validación del email
        case 'email':
        case 'correo':
        case 'mail':

            if ( value !== undefined && value.trim() !== "" && value.length > 50 && emailRegex.test(value)) {
                return "Formato de email incorrecto. Recuerda: Número máx. de caracteres 50.";
            } else {
                return "";
            }
        
        //Validación del name y surname
        case 'name':
        case 'surname':

            if( value !== undefined && value.trim() !== "" && value.length > 50){
                return "Número máx. de caracters 50."
            } else {
                return "";
            }
            
        // Validación del teléfono
        case 'phone':
        case 'telefono':

            if (value !== undefined  && (value >999999999 || value < 600000000 )) {
                return "Formato de teléfono incorrecto.";
            } else {
                return "";
            }
        // Validación del password
        case 'password':
        case 'passwordOld':
        case 'contraseña':

            if(value !== undefined  && value.trim() !== "" && (value.length < 6 || value.length >12)){
                return "La contraseña debe contener de 6 a 12 caracteres"
            } else {
                return "";

            }
        }
    }