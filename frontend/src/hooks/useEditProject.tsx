import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'


export const useEditProject = () =>{
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState<any>(false)

    const {user} = useStore()
    const navigate = useNavigate()

    const {projectid} = useParams()

    const editProject = async(name:string,description:string,repo:string,
        demo:string,type:string,technologies:string[]
        ) =>{
            const body = JSON.stringify({arr:['gw','wrqrwr','wrtrw'],name,description,repo,demo,type,technologies})
            try{
                setLoading(true)
                setError(null)
                const response = await axios.put(`http://localhost:5000/api/projects/${projectid}`,body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${user.token}`
                      },
                })
                const json = await response.data
                setError(false)
                console.log(json)
                navigate(`/user/${user.user._id}/projects`)
          }catch(error){
              console.log(error)
              setError(true)
          }
          finally{
              setLoading(false)
          }
    }

    return {editProject, loading, error}
}