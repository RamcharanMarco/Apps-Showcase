import {useEffect, useState, useCallback} from 'react'
import { useStore } from '../store/store';
import { Link,useParams } from 'react-router-dom';
import '../styles/userHome.css'

const UserHome = () => {

  const {id} = useParams()

  return (
    <div className='userHome'>
      <div className="projects">
        <h1>projects</h1>
        <Link to={`/user/${id}/projects`}>projects</Link>
      </div>
      <div className="createproject">
        <h1>create a project</h1>
        <Link to={`/user/${id}/projects/add`}>add project</Link>
      </div>
      <div className="feedback">
        <h1>appinfo</h1>
        <p>leave a comment</p>
        <Link to={`/user/${id}/appinfo`}>take a look</Link>
      </div>
    </div>
  )
}

export default UserHome