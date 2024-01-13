import {Outlet} from 'react-router-dom'
import UserNavbar from './UserNavbar'
import Footer from './Footer'

const UserLayout = () => {
  return (
    <div className="userLayout">
        <UserNavbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default UserLayout