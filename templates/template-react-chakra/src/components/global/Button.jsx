
const KButton = ({
    content,
    onClick,
    ...rest
}) => {
  return (
    <button onClick={onClick} {...rest}>{content}</button>
  )
}

export default KButton