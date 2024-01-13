import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


export const useAddProject = () =>{
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState<any>(false)

    const {user} = useStore()
    const navigate = useNavigate()

    const addProject = async(
        photo:string,name:string,description:string,repo:string,
        demo:string, technologies:string[],type:string,
        ) =>{
            const body = {photo,name,description,repo,demo,type, technologies}
            console.log(body)
            try{
                setLoading(true)
                setError(null)
                const response = await axios.post('http://localhost:5000/api/projects',body, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization' : `Bearer ${user.token}`
                      },
                })
                const json = await response.data
                setError(false)
                navigate(`/user/${user.user._id}/projects`)
          }catch(error){
              console.log(error)
              setError(true)
          }
          finally{
              setLoading(false)
          }
    }

    return {addProject, loading, error}
}