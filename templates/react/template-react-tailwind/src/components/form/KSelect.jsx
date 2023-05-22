
const KSelect = ({ 
    label, 
    name, 
    value,
    placeholder='', 
    options=[],
    required=true, 
    disabled=false,
    error=null,
    onChange, 
    ...rest
  }) => {
    return (
      <div className="p-4">
        <label htmlFor={name}>{label}</label>
        <select 
            className={`
                block w-full rounded-md border ${error?'border-red-500':'border-gray-300'} p-2 outline-blue-500 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed
            `}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            id={name}
            {...rest}
        >
            {
                placeholder !== '' && (
                    <option value="">{placeholder}</option>
                )
            }
            {
                options.map((option, index) => (
                    <option 
                        key={index} 
                        value={option.value}
                        disabled={option.disabled||false}
                        className="disabled:bg-gray-200 disabled:text-gray-400"
                    >{option.text}</option>
                ))
            }
        </select>
        {
          error && (
            <p className="text-red-600 text-sm">{error}</p>
          )
        }
      </div>
    )
  }
  
  export default KSelect