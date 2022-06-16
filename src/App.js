import React ,{useState, useEffect} from "react";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import Login from './Login';
import Nav from './Nav';
import Home from "./home";
import Register from "./Register";
import Chat from "./Chat";
import Profile from "./Profile";

function App() {
	const [name, setName] = useState('');
	
	
	useEffect( ()=>{
		(
			async()=>{
				const response = await fetch('http://localhost:8000/api/user',{
					header:{'ContentType':'application/json'},
					credentials:'include'
				
				});
				const content = await response.json();
				if(response.ok){
        setName(content.id);
        }
        else{
          setName('');
        }
	
        }
	)();

	});
	
  
  return (
    <div className="App">
      <BrowserRouter>
      <Nav name = {name} setName = {setName}/>
      
        <Routes>
        <Route path = "/" exact  element = {<Home />} />
        <Route path = "/login"  element = {<Login />}/>
        <Route path = "/register"  element = {<Register/>}/>
        <Route path = "/chat"  element = {<Chat/>}/>
        <Route path = "/profile"  element = {<Profile/>}/>
        </Routes>
 
      </BrowserRouter>

      

    </div>
  );
}

export default App;
