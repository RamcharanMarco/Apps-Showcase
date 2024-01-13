import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'


export const useLogout = () =>{

    const {logoutuser} = useStore()
    const navigate = useNavigate()

    const logout = () =>{
        //remove user form storage
        localStorage.removeItem('showcase')
        logoutuser()
        navigate('/')
    }

    return {logout}
}