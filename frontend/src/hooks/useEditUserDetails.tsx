import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


export const useEditUserDetails = () =>{
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState<any>(false)

    const {user} = useStore()
    const navigate = useNavigate()

    const editUserDetails = async(type:string,experience:number,location:string, website: string, repo:string, photo:string) =>{
            const body = {type, experience,location,website,repo,photo}
            try{
                setLoading(true)
                setError(null)
                const response = await axios.post(`http://localhost:5000/api/users/details/${user.userdetails._id}`,body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${user.token}`
                      },
                })
                const json = await response.data
                setError(false)
          }catch(error){
              console.log(error)
              setError(true)
          }
          finally{
              setLoading(false)
              window.location.reload()
          }
    }

    return {editUserDetails, loading, error}
}