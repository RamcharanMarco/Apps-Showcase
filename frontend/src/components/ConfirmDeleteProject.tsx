import {FC} from 'react'
import '../styles/confirmdeleteallprojects.css'
import { useDeleteProject } from '../hooks/useDeleteProject';
import {useState} from 'react'
import {IoArrowBackCircleOutline} from 'react-icons/io5'

interface AppProps {
  toggleDeleteProject: (params: any) => any;
  id:string
}

const ConfirmDeleteProject: FC<AppProps> = ({toggleDeleteProject, id}) => {

  const {deleteProject} = useDeleteProject()
  const [val, setVal] = useState<string>('')


  return (
    <div className="confirmdeleteallprojects">
        <h1>delete project</h1>
        <p>please enter <i>delete all projects</i></p>
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)}/>
        <IoArrowBackCircleOutline className='cancel' onClick={toggleDeleteProject}/>
        <button disabled={val !== 'delete all projects'} onClick={() => deleteProject(id)}>delete project</button>
    </div>
  )
}

export default ConfirmDeleteProject