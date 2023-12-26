import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd }) => {

  return (
    <header className='header'>
      <h1>{title}</h1>
        <Button
          color='black'
          text='Generate Analysis'
          onClick={onAdd}
        />
      
    </header>
  )
}

Header.defaultProps = {
  title: 'Analytics',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Header