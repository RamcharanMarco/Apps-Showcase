import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import '../styles/signup.css'
import { useSignupPhoto } from "../hooks/useSignupPhoto"
import {BsArrowLeftCircle,BsArrowRightCircle} from 'react-icons/bs'

const Signup = () => {

  const {signup,error,loading} = useSignup()
  const {signupPhoto} = useSignupPhoto()

  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [experience, setExperience] = useState<number>(1)
  const [type, setType] = useState<string>('fullstack')
  const [photo, setPhoto] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState();

  const handleClick = (e:any):void =>{
    e.preventDefault()
    if(photo){
      signupPhoto(photo,email,password,username,type,experience)
    }
    if(!photo){
      signup(email,password,username,type,experience)
    }
  }

    const next = (e:any) =>{
    e.preventDefault()
    setPage((prev) => prev +1)
  }

  const prev = (e:any) =>{
    e.preventDefault()
    setPage((prev) => prev -1)
  }

  return (
    <div className="signup">
      <h1 className="heading">SIGNUP</h1>
      <div className="container">
      {
        page === 1 ?
        <div className="box">
          <div className="content">
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='username'/>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="fullstack">fullstack</option>
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
          </select>
          <input value={experience} onChange={(e) => setExperience(e.target.value)} type="number" placeholder="experience"/>
          </div>
          <div className="navigation page1">
            {
              username && type && experience ?             <BsArrowRightCircle className="signup-button" onClick={next}/>
: null
            }
          </div>
        </div>
        :
        page === 2 ?
        <div className="box">
          <div className="content">
                      {
                selectedImage  && photo !== ''         ?    <img
                src={URL.createObjectURL(selectedImage)}
                height={200}
                width={200}
                alt="Thumb"
              />
              :
              ''
  }
            <h1>upload pic</h1>
            <label htmlFor="file-upload" className="custom-file-upload">
          <i className="fa fa-cloud-upload"></i>
          {selectedImage ? "change" : "choose"}
        </label>
            <input
          type="file"
          name="file"
          id="file-upload"

          className="photo"
          onChange={(e: any) => {setPhoto(e.target.files[0]);    setSelectedImage(e.target.files[0]);}}
        />
        {
          photo ?         <button onClick={(e) => {setPhoto('')}}>cancel</button>
:null
        }
            <p>optional</p>
          </div>
          <div className="navigation">
          <BsArrowLeftCircle className="signup-button" onClick={prev}/>
          <BsArrowRightCircle className="signup-button" onClick={next}/>
          </div>
        </div>
        :
        page === 3 ?
        <div className="box">
          <div className="content">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
            {
              loading ? <p className="creating">creating your account</p>: ''
            }
            {
              error ? <p>{error}</p>: ''
            }
          </div>
          <div className="navigation">
          <BsArrowLeftCircle className="signup-button" onClick={prev}/>
            <button onClick={handleClick}>create account</button>
          </div>
        </div>
        :
        ''
      }
      </div>
    </div>
  )
}

export default Signup