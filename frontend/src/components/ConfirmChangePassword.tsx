import { FC, useState } from "react";
import "../styles/confirmchangepassword.css";
import { useChangePassword } from "../hooks/useChangePassword";
import { useCheckPassword } from "../hooks/useCheckpassword";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface AppProps {
  toggleChangePassword: (params: any) => any;
}

const ConfirmChangePassword: FC<AppProps> = ({ toggleChangePassword }) => {
  const { changePassword } = useChangePassword();
  const { checkPassword, checked, error } = useCheckPassword();

  const [current, setCurrent] = useState("");
  const [newp, setNewp] = useState("");
  const [newp2, setNewp2] = useState("");

  const handleCheckPassword = (e: any) => {
    e.preventDefault();
    checkPassword(current);
  };

  const handleChangePassword = (e: any) => {
    e.preventDefault();
    if(newp !== newp2 && newp || newp2 === ''){
      alert('bad shit hapenign')
      return
    }
    changePassword(newp)
  };

  return (
    <div className="confirmchangepassword">
      <h1>change password</h1>

      {checked ? (
        <div className="changepassword">
          <input
            value={newp}
            onChange={(e) => setNewp(e.target.value)}
            type="text"
            placeholder="new"
          />
          <input
            value={newp2}
            onChange={(e) => setNewp2(e.target.value)}
            type="text"
            placeholder="confirm new"
          />
          <button onClick={handleChangePassword}>
            change password
          </button>
        </div>
      ) : (
        <div className="checkpassword">
          <p>please enter current password</p>
          <input
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            type="text"
            placeholder="current password"
          />
          <button onClick={handleCheckPassword}>confirm</button>
          <p>{error ? error : null}</p>
        </div>
      )}

      <IoArrowBackCircleOutline
        className="cancel"
        onClick={toggleChangePassword}
      />
    </div>
  );
};

export default ConfirmChangePassword;
