import "./CustomInput.css"

export const CustomInput = ({disabled, design, type, pattern, name, placeholder, value, maxLength, functionProp, functionBlur, min, max}) => {
    return (
        <input 
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
         />
    )
}