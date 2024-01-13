import { BrowserRouter,Routes,Route } from "react-router-dom"

import MainLayout from "../components/MainLayout"
import HomePage from "../pages/Home"
import LoginPage from "../pages/Login"
import SignupPage from "../pages/Signup"
import ProjectsPage from "../pages/Projects"
import UserLayout from "../components/UserLayout"
import UserHomePage from "../pages/UserHome"
import UserProjectsPage from "../pages/UserProjects"
import UserProjectPage from "../pages/UserProject"
import UserAddProjectPage from "../pages/UserAddProject"
import ProjectPage from "../pages/Project"
import UserSettingsPage from "../pages/UserSettings"
import Projects from '../pages/Projects'
import Project from "../pages/Project"

import ProjectsLayout from "../components/ProjectsLayout"
import UserInfo from "../pages/UserInfo"
import Portfolio from "../pages/Portfolio"
import AppInfo from "../pages/AppInfo"


const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<HomePage/>}></Route>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='signup' element={<SignupPage/>}/>
                <Route path='appinfo' element={<AppInfo/>}/>

                <Route path='projects' element={<ProjectsPage/>}/>
                <Route path='projects/:id' element={<ProjectPage/>}/>
            </Route>
            <Route path='/user/:id/' element={<UserLayout/>}>
                <Route index element={<UserHomePage/>}></Route>
                <Route path='projects' element={<UserProjectsPage/>}/>
                <Route path='appinfo' element={<AppInfo/>}/>
                <Route path='projects/:projectid' element={<UserProjectPage/>}/>
                <Route path='projects/add' element={<UserAddProjectPage/>}/>
                <Route path='settings' element={<UserSettingsPage/>}/>
                <Route path='info' element={<UserInfo/>}/>

            </Route>

            <Route path='/projects/' element={<ProjectsLayout/>}>
                <Route index element={<Projects/>} />
                <Route path=':id2' element={<Project/>}/>
            </Route>

            <Route path='/profile/:id' element={<ProjectsLayout/>}>
                <Route index element={<Portfolio/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router