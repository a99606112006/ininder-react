import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Register = () =>{
    const[name,setName] = useState();
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    const navigate = useNavigate();

    const submit = async (e)=>{
        e.preventDefault();
        console.log({name,email,password});
        
        await fetch ('http://localhost:8000/api/register',{
            method: 'POST',
            header: {'Accept':'application/json','Content-Type': 'application/json'},
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: password

            })
           
        }).then(navigate('/login'));


    }
return(
    <form onSubmit={submit}>
    <h1 className = "fm-normal">Register</h1>
    <input type="name" id="inputName" className = "form-control" placeholder="Name" required
        onChange = {e => setName(e.target.value)}
    />
    <input type="email" id="inputEmail" className = "form-control" placeholder="Email" required
        onChange = {e => setEmail(e.target.value)}
    />
    <input type="password" id="inputPassword" className="form-control" placeholder="password" required
        onChange = {e => setPassword(e.target.value)}
    />

    <button className = "btn btn-lg bt-primary" type="submit">submit </button>

  </form>
);

};

export default Register;