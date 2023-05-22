
const KToast = ({
    message,
    type,
    position='top-right',
    onClose
}) => {
  return (
    <div className={`fixed m-4 flex ${position} ${type} items-center gap-2 p-2 rounded-md bg-white shadow-md border`}>
        <div className="flex items-center justify-center">
            {
                type === 'success-pop' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414
                        0l-5-5a1 1 0 011.414-1.414L8 14.586l9.293-9.293a1 1 0
                        011.414 0z" clipRule="evenodd" />
                    </svg>
                )
            }
            {
                type === 'error-pop' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8
                        8 0 000 16zM9 9a1 1 0 112 0v4a1 1 0
                        11-2 0V9zm1-5a1 1 0 100-2 1 1 0 000
                        2z" clipRule="evenodd" />
                    </svg>
                )
            }
            {
                type === 'warn-pop' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8
                        8 0 000 16zM9 9a1 1 0 112 0v4a1 1 0
                        11-2 0V9zm1-5a1 1 0 100-2 1 1 0 000
                        2z" clipRule="evenodd" />
                    </svg>
                )
            }
        </div>
        <div className="flex-grow">
            <p className="text-sm">{message}</p>
        </div>
        <div className="flex items-center justify-center">
            <button onClick={onClose} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.707 10l4.147
                    4.146a.5.5 0 01-.708.708L10 10.707l-4.146
                    4.147a.5.5 0 01-.708-.708L9.293 10l-4.147-4.146a.5.5
                    0 01.708-.708L10 9.293l4.146-4.147a.5.5 0
                    .708.708L10.707 10z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
  )
}

export default KToast