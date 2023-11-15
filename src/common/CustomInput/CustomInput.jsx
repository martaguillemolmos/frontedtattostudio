import "./CustomInput.css"

export const CustomInput = ({design, type, name, placeholder, value, functionProp, functionBlur, min, max}) => {
    return (
        <input 
        className={design}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || undefined}
        onChange={(e) => functionProp(e)}
        onBlur={(e)=>functionBlur(e)}
        min={min}
        max={max}
         />
    )
}