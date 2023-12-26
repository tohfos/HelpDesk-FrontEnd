
const Button = ({ color, text, onClick }) => {
    return (
      <button
          onClick={onClick}
          // style={{ backgroundColor: color }}
          className='btn btn-primary'  
      >
        {text}
      </button>
    )
  }
  
  
  export default Button