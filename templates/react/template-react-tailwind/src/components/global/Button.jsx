
const KButton = ({
  content,
  onClick,
  variant,
  disabled=false,
  ...rest
}) => {
  return (
    <button 
      className={`py-2 px-4 rounded-sm text-white disabled:bg-gray-300 disabled:cursor-not-allowed ${variant}`}
      onClick={onClick}
      disabled={disabled} 
      {...rest}
    >
      {content}
    </button>
  )
}

export default KButton