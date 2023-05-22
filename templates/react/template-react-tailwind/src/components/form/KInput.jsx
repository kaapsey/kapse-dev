
const KInput = ({ 
  label, 
  name, 
  value, 
  type='text', 
  placeholder='', 
  required=true, 
  disabled=false,
  error=null,
  onChange, 
  ...rest
}) => {
  return (
    <div className="p-4">
      <label htmlFor={name}>{label}</label>
      <input 
        className={`border ${error?'border-red-500':'border-gray-300'} rounded-sm block w-full px-2 py-1 mt-1 outline-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}    
        {...rest}
      />
      {
        error && (
          <p className="text-red-600 text-sm">{error}</p>
        )
      }
    </div>
  )
}

export default KInput