import React,{useState, useEffect} from 'react';
import Profilelist from './Profilelist';

const Home = () => {
	
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
	
	
	return(
		<div className="row">

	  {name? <Profilelist name = {name} setName = {setName}/> : 'Log in first to view posts '}
		</div>
	);
	
	
};

export default Home;