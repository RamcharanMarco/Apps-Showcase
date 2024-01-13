import {FC} from 'react'
import '../styles/confirmdeleteallprojects.css'
import { useDeleteAllProjects } from '../hooks/useDeleteAllProjects';
import { useState } from 'react';
import {IoArrowBackCircleOutline} from 'react-icons/io5'

interface AppProps {
  toggleDeleteAllProjects: (params: any) => any;
}

const ConfirmDeleteAllProjects: FC<AppProps> = ({toggleDeleteAllProjects}) => {

  const {deleteAllProjects} = useDeleteAllProjects()
  const [val, setVal] = useState<string>('')


  return (
    <div className="confirmdeleteallprojects">
        <h1>delete all projects</h1>
        <p>Once you delete all projects, there is no going back. Please be certain.</p>
        <p>please enter <i>delete all projects</i></p>
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)}/>
        <IoArrowBackCircleOutline className='cancel' onClick={toggleDeleteAllProjects}/>
        <button disabled={val !== 'delete all projects'} onClick={deleteAllProjects}>delete all projects</button>
    </div>
  )
}

export default ConfirmDeleteAllProjects