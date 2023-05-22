
const KCheckInput = ({ 
    label, 
    name, 
    type='radio',
    inputs=[],
    layout='inline',
    required=true, 
    disabled=false,
    error=null,
    onChange, 
    ...rest
  }) => {
    return (
      <div className="p-4">
        <span>{label}</span>
        <div className={`${layout==='inline'?'flex items-center gap-2':'block'}`}>
            {
                inputs.map((input, index) => (
                    <div key={index} className="flex gap-1 items-center">
                        <input 
                            className={`${error?'border-red-500':'border-gray-300'} outline-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                            type={type}
                            name={name}
                            value={input.value}
                            onChange={onChange}
                            required={required}
                            disabled={disabled}    
                            id={input.value}
                            {...rest}
                        />
                        <label htmlFor={input.value}>{input.label}</label>
                    </div>
                ))
            }
        </div>
        {
          error && (
            <p className="text-red-600 text-sm">{error}</p>
          )
        }
      </div>
    )
  }
  
  export default KCheckInput