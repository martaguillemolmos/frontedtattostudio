import "./CustomInput.css"

export const CustomInput = ({design, type, name, placeholder, functionProp, functionBlur, min, max}) => {
    return (
        <input 
        className={design}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => functionProp(e)}
        onBlur={(e)=>functionBlur(e)}
        min={min}
        max={max}
         />
    )
}