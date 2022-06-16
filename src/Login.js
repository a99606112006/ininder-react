import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Login = ()=>{

  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const submit = async (e)=>{
      e.preventDefault();
      console.log({email,password});
      const response = await fetch ('http://localhost:8000/api/login',{
          method: 'POST',
          header: {
            'Accept': "application/json",
             'Content-Type': "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({
              
              email,
              password
          })
      });
      const content = await response.json();
      if(response.ok){
        setName(content.name);
        navigate('/');
        window.location.reload();
        }
        else{
        setName('');
        }

  }
    return(
      <form onSubmit={submit}>
      <h1 className = "fm-normal">Login</h1>

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

export default Login;