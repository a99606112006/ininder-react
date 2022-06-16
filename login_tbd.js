import React, {useState} from "react";
import {Redirect} from 'react-router-dom';
 
const Login = () =>{

    const[email,setEmail] = useState();
    const[password,setPassword] = useState();

    const submit = async (e)=>{
        e.preventDefault();
        console.log({name,email,password});
        
        await fetch ('http://localhost:8000/api/login',{
            method: 'POST',
            header: {'Accept':'application/json','Content-Type': 'application/json'},
            credentials:'include',
			body: JSON.stringify({
				email,
				password,
            })
        });
		setRedirect(true);
    }
	if(redirect)
		return <Redirectto="/home" />;
	
	
return(
    <form onSubmit={submit}>

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





//login