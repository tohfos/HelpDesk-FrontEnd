import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd }) => {

  return (
    <header className='header'>
      <h1>{title}</h1>
        <Button
          color='black'
          text='Generate Report'
          onClick={onAdd}
        />
      
    </header>
  )
}

// Header.defaultProps = {
//   title: 'Reports',
// }

Header.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Header