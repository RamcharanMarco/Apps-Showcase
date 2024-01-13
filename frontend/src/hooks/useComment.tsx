import {useState} from 'react'

export const useComment = () =>{

    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<any>(false)

    const comment = async(name:string,body:string,id:string) =>{
        setLoading(true)
        setError(null)
        const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name, body})
        })

        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setLoading(false)
            window.location.reload()
        }
    }

    return {comment, loading, error}
}