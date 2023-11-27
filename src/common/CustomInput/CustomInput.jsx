import TextField from '@mui/material/TextField';

export const CustomInput = ({required, label, disabled,display, design, type, pattern, name, placeholder, value, maxLength, functionProp, functionBlur, min, max}) => {
    return (
        <div className='customInputDesing'>
        <TextField 
        required={required}
        id="outlined-start-adornment"
        label= {label}
        display={display}
        disabled={disabled}
        className={design}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || undefined }
        onChange={(e) => functionProp(e)}
        onBlur={(e)=>functionBlur(e)}
        maxLength = {maxLength}
        pattern={pattern}        
        min={min}
        max={max}
        sx={{
            '& .MuiInputLabel-root': {
                // Agrega tus estilos adicionales aquí
                display: 'flex',
                // ...otros estilos
              },
              '&.outlined-size-normal': {
                // Estilos específicos para el caso 'outlined-size-normal'
                // Puedes agregar estilos adicionales aquí
              },
        }}
         />
        </div>
    )
}