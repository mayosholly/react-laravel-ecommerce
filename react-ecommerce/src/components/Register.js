import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
   const [name, setName] = useState('') 
   const [email, setEmail] = useState('') 
   const [password, setPassword] = useState('') 
   const [successMessage, setSuccessMessage] = useState('');
   const navigate = useNavigate();

   const handleRegister = async (event) => {
    event.preventDefault();
    try {
        await authService.register(name, email, password);
        setSuccessMessage("Registered Successfully")
        setTimeout(() => {
            navigate('/add')
        }, 2000);
    } catch (error) {
        console.error(error);
        setSuccessMessage('')
    }
   }

   return (
    
<div className="card">
              <div className="card-header">
              <h3 className='text-center'>Register
              </h3>
              </div>
              <div className='card-body'>

    <div>
        <form onSubmit={handleRegister}>
            <div>
                <div className="mb-3">
                <label className="form-control" htmlFor="name">Name: </label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3">
                <label htmlFor="email" className="form-control"> Email: </label>
                <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                <label className="form-control" htmlFor="password">Password: </label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="mb-3">
                <button type="submit" className="form-control btn btn-primary" >Register</button>
                {successMessage && <div>{successMessage }</div>}
                </div>
            </div>
        </form>
    </div>
    </div>
    </div>
   )
}

export default Register;
