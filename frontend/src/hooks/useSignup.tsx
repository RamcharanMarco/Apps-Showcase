import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'

export const useSignup = () =>{

    const navigate = useNavigate()

    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<any>(false)

    const {loginuser,user} = useStore()

    const signup = async(email:string,password:string,username:string, type:string,experience:number) =>{
        setLoading(true)
        setError(null)
        const response = await fetch('http://localhost:5000/api/auth/create', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email, password, username,type,experience})
        })

        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save user to local storage
            loginuser(json)
            setLoading(false)
            navigate(`/user/${json.user._id}`)
        }
    }

    return {signup, loading, error}
}