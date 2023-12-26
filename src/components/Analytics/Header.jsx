import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd }) => {

  return (
    <header className='header'>
      <h1>{title}</h1>
        <Button
          text='Generate Analysis'
          onClick={onAdd}
        />
      
    </header>
  )
}




export default Header