import "../styles/login.css";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

const Login = () => {
  const { login, error, loading } = useLogin();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClick = (e: any): void => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="login">
      <form>
        <h1>LOGIN</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button onClick={handleClick}>login</button>
        {loading ? <p className="creating">loging you in</p> : ""}
        {error ? <p>{error}</p> : ""}
      </form>
    </div>
  );
};

export default Login;
