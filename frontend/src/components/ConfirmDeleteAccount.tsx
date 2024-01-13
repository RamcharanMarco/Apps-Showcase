import {FC,useState} from 'react'
import '../styles/confirmdeleteaccount.css'
import { useDeleteAccount } from '../hooks/useDeleteAccount';
import {IoArrowBackCircleOutline} from 'react-icons/io5'
interface AppProps {
  toggleDeleteAccount: (params: any) => any;
}

const ConfirmDeleteAccount: FC<AppProps> = ({toggleDeleteAccount}) => {

  const [val, setVal] = useState<string>('')
  const {deleteAccount} = useDeleteAccount() 

  return (
    <div className="confirmdeleteaccount">
        <h1>delete acount</h1>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        <p>please enter <i>delete my account</i></p>
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)}/>
        <IoArrowBackCircleOutline className='cancel' onClick={toggleDeleteAccount}/>
        <button disabled={val !== 'delete my account'} style={val !== 'delete my account' ? {backgroundColor:'red'}: {backgroundColor:'black'}} onClick={deleteAccount}>delete</button>
    </div>
  )
}

export default ConfirmDeleteAccount