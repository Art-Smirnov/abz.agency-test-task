import "./Button.sass"

const Button = ({className, children, onClick, ...props}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`
        button 
        ${className ? className : ""}
      `}>
      {children}
    </button>
  )
}

export default Button