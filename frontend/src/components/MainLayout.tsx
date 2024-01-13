import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div className="mainLayout">
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout