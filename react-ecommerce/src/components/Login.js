import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login } = authContext; // Extracting the login function from authContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.login(email, password);
      login(response.data); // Assuming response.data contains user information
      console.log(response.data);
      navigate('/add');
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
    }
  };

  return (
    
<div className="card">
              <div className="card-header">
              <h3 className='text-center'>Login
              </h3>
              </div>
              <div className='card-body'>

    <div>
      <form onSubmit={handleLogin}>
        <div>
          <div className="mb-3">
            <label className="form-data" htmlFor="email">Email: </label>
            <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div  className="mb-3">
            <label className="form-control" htmlFor="password">Password: </label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

            <div  className="mb-3" >
          <button className="btn btn-primary form-control" type="submit">Login</button>
          {successMessage && <div>{successMessage}</div>}
          </div>
        </div>
      </form>
    </div>
</div>
</div>
  );
};

export default Login;
