// write in App.jsx

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from './Login';
import Nav from './Nav';
import Home from "./home";
import Register from "./Register";


function App() {
	const [name, setName] = useState();
		useEffect( ()=>{
		(
			async()=>{
				const response = await fetch('http://localhost:8000/api/user',{
					header:{'Content0Type':'application/json'},
					credentials:'include'
				
				}};
				const content = await content.json();
				setName(content.name);
	
	
	)();

	});
	
	
	
	
  return (
    <div className="App">
		<BrowserRouter>
			<Nav/>
			
			<main>
				<Route path = '/' component = {()=> <Home name={name}/>} />
				<Route path = '/login' component = {Login}/>
				<Route path = '/register' component = {Register}/>
			</main>
		</BrowserRouter>


    </div>
  );
}

export default App;
