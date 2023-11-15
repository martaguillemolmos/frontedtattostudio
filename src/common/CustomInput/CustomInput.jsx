import "./CustomInput.css"

export const CustomInput = ({disabled, design, type, name, placeholder, value, functionProp, functionBlur, min, max}) => {
    return (
        <input 
        disabled={disabled}
        className={design}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => functionProp(e)}
        onBlur={(e)=>functionBlur(e)}
        min={min}
        max={max}
         />
    )
}