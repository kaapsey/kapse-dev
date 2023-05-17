
const KInput = ({ 
    label, 
    name, 
    value, 
    type='text', 
    placeholder='', 
    required=true, 
    disabled=false,
    onChange, 
    ...rest
}) => {
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}    
            {...rest}
        />
    </div>
  )
}

export default KInput