import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="mainav">
        <h1>SHOWASE</h1>
        <div className="links">
            <Link to='/signup'>signup</Link>
            <Link to='/login'>login</Link>
            <Link to='/projects'>projects</Link>
        </div>
    </nav>
  )
}

export default Navbar