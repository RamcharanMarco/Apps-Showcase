import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'

export const useLogin = () =>{

    const navigate = useNavigate()

    const [error, setError] = useState<string | null>()
    const [loading, setLoading] = useState<boolean>(false)

    const {loginuser} = useStore()

    const login = async(username:string, password:string) =>{
        setLoading(true)
        setError(null)
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({password, username})
        })

        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            loginuser(json)
            setLoading(false)
            navigate(`/user/${json.user._id}`)
        }
    }

    return {login, loading, error}
}